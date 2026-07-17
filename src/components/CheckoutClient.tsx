"use client";

import { useState, useEffect } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type { Appearance } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { stripePromise } from "@/lib/stripe-client";

type Product = {
  _id: string;
  title: string;
  price: number;
  photoUrl: string | null;
};

// ── Inner form — must live inside <Elements> ──────────────────────────────────

function CheckoutForm({ product, qty }: { product: Product; qty: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = product.price * qty;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    // Persist buyer info across the potential Stripe redirect (same-origin)
    sessionStorage.setItem(
      `buyer_${product._id}`,
      JSON.stringify({ name, email, phone, qty })
    );

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/shop/${product._id}/schedule`,
      },
      redirect: "if_required",
    });

    if (result.error) {
      setError(result.error.message ?? "Payment failed. Please try again.");
      setLoading(false);
    } else if (result.paymentIntent?.status === "succeeded") {
      router.push(
        `/shop/${product._id}/schedule?payment_intent=${result.paymentIntent.id}&qty=${qty}`
      );
    }
  };

  const inputClass =
    "w-full px-4 py-3 font-serif text-sm outline-none border bg-white";
  const inputStyle = { borderColor: "#c4a882", color: "#1a0a0e" };

  const paymentElementOptions = {};

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">

      {/* Contact info */}
      <div className="flex flex-col gap-4">
        <h2
          className="text-xs font-bold tracking-[0.2em] uppercase"
          style={{ color: "#971B2E" }}
        >
          Your info
        </h2>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={inputClass}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputClass}
          style={inputStyle}
        />
        <input
          type="tel"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className={inputClass}
          style={inputStyle}
        />
      </div>

      {/* Payment */}
      <div className="flex flex-col gap-4">
        <h2
          className="text-xs font-bold tracking-[0.2em] uppercase"
          style={{ color: "#971B2E" }}
        >
          Payment
        </h2>
        <PaymentElement options={paymentElementOptions} />
      </div>

      {/* Error */}
      {error && (
        <p className="font-serif text-sm" style={{ color: "#971B2E" }}>
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !stripe || !elements}
        className="w-full py-4 font-serif font-bold text-sm tracking-widest uppercase transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#971B2E", color: "#fff" }}
      >
        {loading ? "Processing…" : `Reserve & Pay $${total.toLocaleString()}`}
      </button>

      <p
        className="font-serif text-xs leading-relaxed text-center"
        style={{ color: "#3a2010" }}
      >
        Pickup only · Carroll Gardens · Tue–Fri 10am–5:45pm · Sat–Sun 9:30am–5:30pm
      </p>

    </form>
  );
}

// ── Outer wrapper — fetches PaymentIntent, mounts Elements ───────────────────

export default function CheckoutClient({
  product,
  qty,
}: {
  product: Product;
  qty: number;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/shop/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product._id, quantity: qty }),
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setFetchError(data.error);
        else setClientSecret(data.clientSecret);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setFetchError("Something went wrong. Please try refreshing.");
      });

    return () => controller.abort();
  }, [product._id, qty]);

  const total = product.price * qty;

  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#971B2E",
      colorBackground: "#ffffff",
      colorText: "#1a0a0e",
      colorDanger: "#971B2E",
      fontFamily: 'Georgia, "Times New Roman", serif',
      borderRadius: "0px",
      spacingUnit: "4px",
    },
    rules: {
      ".Input": { border: "1px solid #c4a882", padding: "12px 16px" },
      ".Input:focus": { borderColor: "#971B2E", boxShadow: "none" },
      ".Label": {
        fontSize: "11px",
        fontWeight: "700",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "#3a2010",
        marginBottom: "6px",
      },
    },
  };

  return (
    <section className="px-8 md:px-14 py-14">
      <Link
        href={`/shop/${product._id}`}
        className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-10 hover:opacity-60 transition-opacity"
        style={{ color: "#971B2E" }}
      >
        ← Back
      </Link>

      <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 max-w-5xl">

        {/* Left — form */}
        <div className="flex flex-col gap-2 lg:w-3/5">
          <span
            className="text-xs font-bold tracking-[0.2em] uppercase"
            style={{ color: "#971B2E" }}
          >
            Checkout
          </span>
          <h1
            className="font-serif text-3xl leading-tight mb-8"
            style={{ color: "#1a0a0e" }}
          >
            Complete your reservation.
          </h1>

          {fetchError ? (
            <p className="font-serif text-base" style={{ color: "#971B2E" }}>
              {fetchError}
            </p>
          ) : !clientSecret ? (
            <div className="flex flex-col gap-4 animate-pulse">
              {[48, 48, 48, 160].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}px`, backgroundColor: "#e8d9be" }}
                />
              ))}
            </div>
          ) : (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
              <CheckoutForm product={product} qty={qty} />
            </Elements>
          )}
        </div>

        {/* Right — order summary */}
        <div className="lg:w-2/5">
          <div
            className="lg:sticky lg:top-40 flex flex-col gap-6 p-6"
            style={{ backgroundColor: "#eddcb8" }}
          >
            <span
              className="text-xs font-bold tracking-[0.2em] uppercase"
              style={{ color: "#971B2E" }}
            >
              Your order
            </span>

            <div className="flex gap-5 items-start">
              {product.photoUrl && (
                <div
                  className="relative flex-none overflow-hidden"
                  style={{ width: "88px", aspectRatio: "4/5" }}
                >
                  <Image
                    src={product.photoUrl}
                    alt={product.title}
                    fill
                    className="object-cover"
                    sizes="88px"
                  />
                </div>
              )}
              <div className="flex flex-col gap-1 pt-1">
                <p
                  className="font-serif text-sm leading-snug"
                  style={{ color: "#1a0a0e" }}
                >
                  {product.title}
                </p>
                {qty > 1 && (
                  <p className="font-serif text-xs" style={{ color: "#3a2010" }}>
                    Qty: {qty}
                  </p>
                )}
                <p className="font-serif text-sm" style={{ color: "#971B2E" }}>
                  ${product.price.toLocaleString()}
                </p>
              </div>
            </div>

            <div
              className="flex justify-between items-baseline border-t pt-4"
              style={{ borderColor: "#c4a882" }}
            >
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#3a2010" }}
              >
                Total
              </span>
              <span className="font-serif text-xl" style={{ color: "#1a0a0e" }}>
                ${total.toLocaleString()}
              </span>
            </div>

            <div
              className="border-l-4 px-4 py-3"
              style={{ borderColor: "#FFB81C", backgroundColor: "#f6e6c9" }}
            >
              <p
                className="text-xs font-bold tracking-widest uppercase mb-1"
                style={{ color: "#971B2E" }}
              >
                Pickup only
              </p>
              <p
                className="font-serif text-xs leading-relaxed"
                style={{ color: "#3a2010" }}
              >
                Carroll Gardens, Brooklyn
                <br />
                Tue–Fri 10am–5:45pm
                <br />
                Sat–Sun 9:30am–5:30pm
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
