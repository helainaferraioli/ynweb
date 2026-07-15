import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { sanityWriteClient } from "@/lib/sanity";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("[webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as Stripe.PaymentIntent;
    const productId = pi.metadata?.productId;
    const quantity = parseInt(pi.metadata?.quantity ?? "1", 10);

    if (!productId) {
      console.error("[webhook] No productId in PaymentIntent metadata", pi.id);
      return NextResponse.json({ error: "No productId" }, { status: 400 });
    }

    try {
      const updated = await sanityWriteClient
        .patch(productId)
        .dec({ quantity_available: quantity })
        .commit();

      if ((updated.quantity_available as number) <= 0) {
        await sanityWriteClient
          .patch(productId)
          .set({ status: "sold_out", quantity_available: 0 })
          .commit();
      }

      console.log(`[webhook] Decremented stock for ${productId} by ${quantity}`);
    } catch (err) {
      console.error("[webhook] Sanity patch failed:", err);
      return NextResponse.json({ error: "Stock update failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
