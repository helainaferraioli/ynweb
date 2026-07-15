import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { sanityClient } from "@/lib/sanity";

export async function POST(req: NextRequest) {
  try {
    const { productId, quantity = 1 } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: "productId required" }, { status: 400 });
    }

    const product = await sanityClient.fetch(
      `*[_type == "product" && _id == $id][0] {
        price, title, quantity_available, status
      }`,
      { id: productId }
    );

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    if (product.status !== "live") {
      return NextResponse.json({ error: "Product not available" }, { status: 400 });
    }
    if (quantity > product.quantity_available) {
      return NextResponse.json({ error: "Not enough stock available" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(product.price * quantity * 100),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        productId,
        quantity: String(quantity),
        productTitle: product.title,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("[create-payment-intent]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
