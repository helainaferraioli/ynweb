import { defineField, defineType } from "sanity";

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({ name: "stripe_payment_id", title: "Stripe Payment ID", type: "string", validation: (r) => r.required() }),
    defineField({ name: "product_id",        title: "Product ID",        type: "string", validation: (r) => r.required() }),
    defineField({ name: "product_title",     title: "Product Title",     type: "string" }),
    defineField({ name: "quantity",          title: "Quantity",          type: "number", initialValue: 1 }),
    defineField({ name: "price_paid",        title: "Price Paid (USD)",  type: "number" }),
    defineField({ name: "buyer_name",        title: "Buyer Name",        type: "string" }),
    defineField({ name: "buyer_email",       title: "Buyer Email",       type: "string" }),
    defineField({ name: "buyer_phone",       title: "Buyer Phone",       type: "string" }),
    defineField({
      name: "payment_status",
      title: "Payment Status",
      type: "string",
      options: { list: ["pending","paid","refunded"].map(v => ({ title: v, value: v })), layout: "radio" },
      initialValue: "paid",
    }),
    defineField({
      name: "pickup_type",
      title: "Pickup Type",
      type: "string",
      options: { list: [{ title: "Scheduled", value: "scheduled" }, { title: "Flexible (anytime this week)", value: "flexible" }], layout: "radio" },
    }),
    defineField({ name: "pickup_date",     title: "Pickup Date",     type: "date" }),
    defineField({ name: "pickup_slot",     title: "Pickup Slot",     type: "string", description: 'e.g. "10:00" or "14:30"' }),
    defineField({ name: "pickup_deadline", title: "Pickup Deadline", type: "datetime" }),
    defineField({
      name: "pickup_status",
      title: "Pickup Status",
      type: "string",
      options: { list: [{ title: "Upcoming", value: "upcoming" }, { title: "Picked Up", value: "picked_up" }, { title: "Forfeited", value: "forfeited" }], layout: "radio" },
      initialValue: "upcoming",
    }),
    defineField({ name: "purchased_at",  title: "Purchased At",  type: "datetime" }),
    defineField({ name: "contacted_at",  title: "Contacted At",  type: "datetime", description: "Set when you reach out about a no-show" }),
  ],
  preview: {
    select: { title: "buyer_name", subtitle: "product_title", status: "pickup_status" },
    prepare({ title, subtitle, status }) {
      return { title: title ?? "Unknown buyer", subtitle: `${subtitle ?? "Unknown product"} — ${status}` };
    },
  },
  orderings: [
    { title: "Newest First", name: "purchasedAtDesc", by: [{ field: "purchased_at", direction: "desc" }] },
  ],
});
