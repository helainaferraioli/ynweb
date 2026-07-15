# YN Site — Pickup shop spec

Pickup-only shop. No shipping capability. Target cadence: 5-10 higher-end items posted per week.

## Pages

1. **Shop grid** (`/shop`) — grid of product cards. Each card shows image, title, price, stock state, and a "Reserve and pay" button (or "Sold out", disabled).
2. **Product detail** (`/shop/[product-id]`) — image gallery, price, quantity selector (only shown if `quantity_available > 1`), description, details table (dimensions/materials/condition), "Reserve and pay" CTA, pickup-only notice.
3. **Checkout** — payment (no shipping address fields, ever) followed immediately by pickup scheduling: choose a day + half-hour slot, or select "anytime this week."
4. **Confirmation** — order summary, pickup details, reminder of pickup hours/location.
5. **Admin** (internal) — order list with pickup status, and a flagged view for orders past their forfeit date.

## Data model

### Product
- `id`
- `title`, `description`
- `price`
- `photos[]`
- `dimensions`, `materials`, `condition`
- `quantity_total`, `quantity_available`
- `status`: `draft` | `scheduled` | `live` | `sold_out` | `archived`
- `posted_at` — drives the "New" badge

### Order
- `id`
- `product_id`, `quantity`
- `buyer_name`, `buyer_email`, `buyer_phone`
- `payment_status`: `pending` | `paid` | `refunded`
- `stripe_payment_id`
- `pickup_type`: `scheduled` | `flexible`
- `pickup_date`, `pickup_slot` — scheduled orders only
- `pickup_deadline` — the scheduled slot, or end of that calendar week for flexible orders
- `pickup_status`: `upcoming` | `picked_up` | `forfeited`
- `purchased_at`
- `contacted_at` — nullable, set when you reach out about a no-show

## Business logic

### Inventory
- Decrement `quantity_available` on the Stripe webhook confirming payment — not when checkout starts. Abandoned carts shouldn't lock up stock.
- Hold the unit for ~10 minutes during an active checkout session so two buyers can't both claim the last one.
- Badge logic:
  - **New** — `posted_at` within the last ~7 days (confirm window)
  - **Last one** — `quantity_available === 1`
  - **Sold out** — `quantity_available === 0`, button disabled

### Pickup hours
- Tue–Fri: 10:00am–5:30pm
- Sat–Sun: 9:45am–5:15pm
- Monday: closed
- Slots: 30-minute increments within open hours
- No cap on concurrent bookings per slot
- Buyers can choose a specific slot, or "anytime this week" (flexible, no slot assigned)

### No-show / forfeiture policy
- No refunds for no-shows, under any circumstance.
- `pickup_deadline` = the scheduled slot (scheduled orders) or end of that week (flexible orders)
- `forfeit_date` = `pickup_deadline` + 14 days
- Once `forfeit_date` passes: contact the buyer manually (stored email/phone), then relist — `quantity_available` goes back up, `pickup_status` → `forfeited`

## Open decisions to confirm before/while building
- "New" badge window — 7 days as a placeholder, confirm if you want a different window

## Build notes
- Payment: Stripe Checkout or Payment Element, fulfillment driven by webhook (not client-side success redirect alone)
- Scheduling: either the custom slot picker described above, or embed Calendly if it saves build time tonight
- No shipping address field anywhere in the checkout flow
