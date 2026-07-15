import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { stripe } from "@/lib/stripe";
import { sanityWriteClient } from "@/lib/sanity";

const resend = new Resend(process.env.RESEND_API_KEY);

function getWeekendDeadline(): string {
  const d = new Date();
  const daysUntilSunday = d.getDay() === 0 ? 7 : 7 - d.getDay();
  d.setDate(d.getDate() + daysUntilSunday);
  d.setHours(17, 15, 0, 0);
  return d.toISOString();
}

function formatSlot(slot: string): string {
  const [h, m] = slot.split(":").map(Number);
  const period = h < 12 ? "AM" : "PM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

function formatDate(dateStr: string): string {
  const [y, mo, d] = dateStr.split("-").map(Number);
  const date = new Date(y, mo - 1, d);
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

function formatDeadline(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

function buyerEmailHtml({
  buyerName,
  productTitle,
  quantity,
  pricePaid,
  pickupType,
  pickupDate,
  pickupSlot,
  pickupDeadline,
  orderId,
}: {
  buyerName: string;
  productTitle: string;
  quantity: number;
  pricePaid: number;
  pickupType: string;
  pickupDate?: string;
  pickupSlot?: string;
  pickupDeadline: string;
  orderId: string;
}): string {
  const pickupLine =
    pickupType === "scheduled" && pickupDate && pickupSlot
      ? `${formatDate(pickupDate)} at ${formatSlot(pickupSlot)}`
      : `Anytime through ${formatDeadline(pickupDeadline)}`;

  const firstName = buyerName.split(" ")[0];

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f6e6c9;font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f6e6c9;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

        <!-- Header -->
        <tr><td style="padding-bottom:32px;">
          <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#971B2E;">Yesterday's News</p>
        </td></tr>

        <!-- Heading -->
        <tr><td style="padding-bottom:24px;border-bottom:1px solid #c4a882;">
          <h1 style="margin:0 0 8px;font-size:32px;line-height:1.2;color:#1a0a0e;">Thanks, ${firstName}.</h1>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#3a2010;">Your payment was received and <strong>${productTitle}</strong> is reserved for you.</p>
        </td></tr>

        <!-- Order summary -->
        <tr><td style="padding:24px 0;border-bottom:1px solid #c4a882;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#971B2E;padding-bottom:12px;" colspan="2">Your order</td>
            </tr>
            <tr>
              <td style="font-size:14px;color:#1a0a0e;padding-bottom:8px;">${productTitle}${quantity > 1 ? ` × ${quantity}` : ""}</td>
              <td align="right" style="font-size:14px;color:#1a0a0e;padding-bottom:8px;">$${pricePaid.toLocaleString()}</td>
            </tr>
            <tr>
              <td style="font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#3a2010;padding-top:8px;border-top:1px solid #c4a882;">Total paid</td>
              <td align="right" style="font-size:16px;font-weight:700;color:#1a0a0e;padding-top:8px;border-top:1px solid #c4a882;">$${pricePaid.toLocaleString()}</td>
            </tr>
          </table>
        </td></tr>

        <!-- Pickup -->
        <tr><td style="padding:24px 0 32px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-left:4px solid #FFB81C;background:#eddcb8;">
            <tr><td style="padding:20px 20px 4px;">
              <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#971B2E;">${pickupType === "scheduled" ? "Your pickup time" : "Your pickup window"}</p>
              <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#1a0a0e;">${pickupLine}</p>
              <p style="margin:0;font-size:13px;color:#3a2010;">441 Court Street, Brooklyn, NY 11231</p>
            </td></tr>
            <tr><td style="padding:0 20px 20px;">
              <p style="margin:8px 0 0;font-size:12px;color:#3a2010;line-height:1.6;">Mon closed &nbsp;·&nbsp; Tue–Fri 10am–5:30pm &nbsp;·&nbsp; Sat–Sun 9:45am–5:15pm</p>
            </td></tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="border-top:1px solid #c4a882;padding-top:24px;">
          <p style="margin:0 0 4px;font-size:12px;color:#3a2010;">Questions? Reply to this email or call us.</p>
          <p style="margin:0;font-size:11px;color:#3a2010;opacity:0.6;">Order ref: ${orderId}</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const {
      paymentIntentId,
      productId,
      productTitle,
      quantity,
      pricePaid,
      buyerName,
      buyerEmail,
      buyerPhone,
      pickupType,
      pickupDate,
      pickupSlot,
    } = await req.json();

    if (!paymentIntentId || !productId || !pickupType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (pi.status !== "succeeded") {
      return NextResponse.json({ error: "Payment not confirmed" }, { status: 400 });
    }

    let pickupDeadline: string;
    if (pickupType === "scheduled" && pickupDate && pickupSlot) {
      const [h, m] = pickupSlot.split(":").map(Number);
      const d = new Date(`${pickupDate}T00:00:00`);
      d.setHours(h, m + 30, 0, 0);
      pickupDeadline = d.toISOString();
    } else {
      pickupDeadline = getWeekendDeadline();
    }

    const doc = await sanityWriteClient.create({
      _type: "order",
      stripe_payment_id: paymentIntentId,
      product_id: productId,
      product_title: productTitle ?? "",
      quantity: quantity ?? 1,
      price_paid: pricePaid ?? null,
      buyer_name: buyerName ?? "",
      buyer_email: buyerEmail ?? "",
      buyer_phone: buyerPhone ?? "",
      payment_status: "paid",
      pickup_type: pickupType,
      pickup_date: pickupDate ?? null,
      pickup_slot: pickupSlot ?? null,
      pickup_deadline: pickupDeadline,
      pickup_status: "upcoming",
      purchased_at: new Date().toISOString(),
      contacted_at: null,
    });

    // Send emails — don't let failures block the order confirmation
    const emailPromises = [];

    if (buyerEmail) {
      emailPromises.push(
        resend.emails.send({
          from: "orders@yesterdaysnewsbk.com",
          to: buyerEmail,
          subject: `Your reservation at Yesterday's News — ${productTitle}`,
          html: buyerEmailHtml({
            buyerName: buyerName ?? "there",
            productTitle: productTitle ?? "",
            quantity: quantity ?? 1,
            pricePaid: pricePaid ?? 0,
            pickupType,
            pickupDate,
            pickupSlot,
            pickupDeadline,
            orderId: doc._id,
          }),
        })
      );
    }

    const pickupLine =
      pickupType === "scheduled" && pickupDate && pickupSlot
        ? `${formatDate(pickupDate)} at ${formatSlot(pickupSlot)}`
        : `Flexible — anytime through ${formatDeadline(pickupDeadline)}`;

    emailPromises.push(
      resend.emails.send({
        from: "orders@yesterdaysnewsbk.com",
        to: "yesterdaysnews1@gmail.com",
        subject: `New order — ${productTitle}`,
        text: `New order at Yesterday's News\n\nItem: ${productTitle}\nQty: ${quantity ?? 1}\nPrice: $${pricePaid?.toLocaleString()}\n\nBuyer: ${buyerName}\nEmail: ${buyerEmail}\nPhone: ${buyerPhone}\n\nPickup: ${pickupLine}\n\nOrder ID: ${doc._id}\nStripe PI: ${paymentIntentId}`,
      })
    );

    const emailResults = await Promise.allSettled(emailPromises);
    emailResults.forEach((result, i) => {
      if (result.status === "rejected") {
        console.error(`[save-order] Email ${i} failed:`, result.reason);
      } else {
        console.log(`[save-order] Email ${i} sent:`, result.value);
      }
    });

    return NextResponse.json({ orderId: doc._id });
  } catch (err) {
    console.error("[save-order]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
