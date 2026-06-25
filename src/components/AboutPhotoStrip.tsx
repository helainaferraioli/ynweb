"use client";

import Image from "next/image";
import { useRef } from "react";

const photos = Array.from({ length: 12 }, (_, i) =>
  `/images/Slideshow%20Photo%20${i + 1}.webp`
);

export default function AboutPhotoStrip() {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    ref.current?.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#1a0a0e" }}>
      <button
        onClick={() => scroll("left")}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-2xl border border-white/30 bg-black/40 hover:bg-black/60 transition"
        style={{ color: "#f6e6c9" }}
        aria-label="Scroll left"
      >‹</button>

      <div
        ref={ref}
        className="flex overflow-x-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        {photos.map((src, i) => (
          <div
            key={i}
            className="relative shrink-0"
            style={{ width: 300, height: 400 }}
          >
            <Image
              src={src}
              alt={`Yesterday's News`}
              fill
              className="object-cover"
              sizes="300px"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-2xl border border-white/30 bg-black/40 hover:bg-black/60 transition"
        style={{ color: "#f6e6c9" }}
        aria-label="Scroll right"
      >›</button>
    </section>
  );
}
