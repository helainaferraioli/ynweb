"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Product = {
  _id: string;
  title: string;
  description?: string;
  price: number;
  dimensions?: string;
  materials?: string;
  condition?: "excellent" | "good" | "fair";
  quantity_available: number;
  status: string;
};

const CONDITION_LABEL: Record<string, string> = {
  excellent: "Excellent",
  good: "Good",
  fair: "Fair",
};

export default function ProductDetail({
  product,
  photos,
}: {
  product: Product;
  photos: string[];
}) {
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);

  const soldOut = product.quantity_available === 0;
  const multiQty = product.quantity_available > 1;
  const hasDetails = product.dimensions || product.materials || product.condition;

  return (
    <section className="px-10 md:px-14 py-14 md:py-20">

      {/* Back link */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-10 hover:opacity-60 transition-opacity"
        style={{ color: "#971B2E" }}
      >
        ← Back to shop
      </Link>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

        {/* ── Gallery ── */}
        <div className="flex flex-col gap-4 lg:w-3/5">
          {/* Main image */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/5" }}>
            {photos[active] ? (
              <Image
                src={photos[active]}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            ) : (
              <div className="w-full h-full" style={{ backgroundColor: "#e8d9be" }} />
            )}
          </div>

          {/* Thumbnails */}
          {photos.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {photos.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="flex-none relative overflow-hidden transition-opacity"
                  style={{
                    width: "80px",
                    aspectRatio: "4/5",
                    outline: i === active ? "2px solid #971B2E" : "2px solid transparent",
                    outlineOffset: "2px",
                    opacity: i === active ? 1 : 0.55,
                  }}
                >
                  <Image
                    src={src}
                    alt={`${product.title} photo ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Purchase panel ── */}
        <div className="flex flex-col gap-7 lg:w-2/5 lg:pt-4">

          {/* Title + price */}
          <div className="flex flex-col gap-2">
            <h1
              className="font-serif text-3xl md:text-4xl leading-tight"
              style={{ color: "#1a0a0e" }}
            >
              {product.title}
            </h1>
            <p className="font-serif text-2xl" style={{ color: "#971B2E" }}>
              ${product.price.toLocaleString()}
            </p>
          </div>

          {/* Description */}
          {product.description && (
            <p
              className="font-serif text-base leading-relaxed"
              style={{ color: "#3a2010" }}
            >
              {product.description}
            </p>
          )}

          {/* Details table */}
          {hasDetails && (
            <div
              className="flex flex-col divide-y divide-[#d4b896]"
              style={{ borderTop: "1px solid #d4b896", borderBottom: "1px solid #d4b896" }}
            >
              {product.dimensions && (
                <div className="flex justify-between py-3">
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: "#971B2E" }}
                  >
                    Dimensions
                  </span>
                  <span className="font-serif text-sm" style={{ color: "#1a0a0e" }}>
                    {product.dimensions}
                  </span>
                </div>
              )}
              {product.materials && (
                <div className="flex justify-between py-3">
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: "#971B2E" }}
                  >
                    Materials
                  </span>
                  <span className="font-serif text-sm" style={{ color: "#1a0a0e" }}>
                    {product.materials}
                  </span>
                </div>
              )}
              {product.condition && (
                <div className="flex justify-between py-3">
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: "#971B2E" }}
                  >
                    Condition
                  </span>
                  <span className="font-serif text-sm" style={{ color: "#1a0a0e" }}>
                    {CONDITION_LABEL[product.condition] ?? product.condition}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Quantity selector — only if more than 1 available */}
          {multiQty && !soldOut && (
            <div className="flex items-center gap-4">
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#1a0a0e" }}
              >
                Qty
              </span>
              <div className="flex items-center border" style={{ borderColor: "#c4a882" }}>
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 font-serif text-lg flex items-center justify-center hover:opacity-60 transition-opacity"
                  style={{ color: "#1a0a0e" }}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span
                  className="w-10 text-center font-serif text-base"
                  style={{ color: "#1a0a0e" }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(product.quantity_available, q + 1))}
                  className="w-10 h-10 font-serif text-lg flex items-center justify-center hover:opacity-60 transition-opacity"
                  style={{ color: "#1a0a0e" }}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* CTA */}
          {soldOut ? (
            <button
              disabled
              className="w-full py-4 font-serif text-sm font-bold tracking-widest uppercase opacity-40 cursor-not-allowed"
              style={{ backgroundColor: "#c4a882", color: "#fff" }}
            >
              Sold Out
            </button>
          ) : (
            <Link
              href={`/shop/${product._id}/checkout${qty > 1 ? `?qty=${qty}` : ""}`}
              className="block w-full py-4 text-center font-serif text-sm font-bold tracking-widest uppercase transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#971B2E", color: "#fff" }}
            >
              Reserve & Pay
            </Link>
          )}

          {/* Pickup-only notice */}
          <div
            className="flex flex-col gap-1 px-5 py-4 border-l-4"
            style={{ borderColor: "#FFB81C", backgroundColor: "#eddcb8" }}
          >
            <p
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "#971B2E" }}
            >
              Pickup only — no shipping
            </p>
            <p className="font-serif text-sm leading-relaxed" style={{ color: "#3a2010" }}>
              This item is available for pickup at our Carroll Gardens shop.
              Tue–Fri 10am–5:45pm · Sat–Sun 9:30am–5:30pm · Mon closed.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
