import { notFound, redirect } from "next/navigation";
import Footer from "@/components/Footer";
import { sanityClient } from "@/lib/sanity";
import { stripe } from "@/lib/stripe";
import ScheduleClient from "@/components/ScheduleClient";

export const dynamic = "force-dynamic";

type Product = { _id: string; title: string; price: number };

async function getProduct(id: string): Promise<Product | null> {
  return sanityClient.fetch(
    `*[_type == "product" && _id == $id][0] { _id, title, price }`,
    { id }
  );
}

export default async function SchedulePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment_intent?: string; qty?: string }>;
}) {
  const { id } = await params;
  const { payment_intent, qty: qtyParam } = await searchParams;

  if (!payment_intent) redirect(`/shop/${id}`);

  // Verify payment succeeded before showing scheduling
  const pi = await stripe.paymentIntents.retrieve(payment_intent);
  if (pi.status !== "succeeded") redirect(`/shop/${id}/checkout`);

  const product = await getProduct(id);
  if (!product) notFound();

  const qty = Math.max(1, parseInt(qtyParam ?? "1", 10) || 1);

  return (
    <main style={{ backgroundColor: "#f6e6c9", marginTop: "130px" }}>
      <section className="px-8 md:px-14 py-14">
        <span
          className="text-xs font-bold tracking-[0.2em] uppercase"
          style={{ color: "#971B2E" }}
        >
          Step 2 of 2
        </span>
        <h1
          className="font-serif text-3xl md:text-4xl leading-tight mt-3 mb-2"
          style={{ color: "#1a0a0e" }}
        >
          Payment received.
        </h1>
        <p
          className="font-serif text-lg mb-10"
          style={{ color: "#3a2010" }}
        >
          Now choose when you&apos;ll pick up <em>{product.title}</em>.
        </p>

        <ScheduleClient
          productId={id}
          productTitle={product.title}
          price={product.price}
          qty={qty}
          paymentIntentId={payment_intent}
        />
      </section>
      <Footer />
    </main>
  );
}
