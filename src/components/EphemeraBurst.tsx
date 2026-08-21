"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Two columns, clustered out in the section's side padding (away from the
// centered text), arched like a parenthesis: pulled in near the top/bottom
// of the arc, bulging out toward the middle. Spaced to avoid heavy overlap.
const pieces = [
  {
    src: "/images/ephemera/brooklyn-bridge-postcard.jpg",
    alt: "Vintage Brooklyn Bridge postcard",
    width: 182, height: 119,
    style: { top: "2%", left: "4%", rotate: "-9deg" },
    floatDelay: "0s",
    cutout: false,
  },
  {
    src: "/images/ephemera/dodgers-patch-v2.png",
    alt: "Vintage Brooklyn Dodgers patch",
    width: 145, height: 148,
    style: { top: "30%", left: "11%", rotate: "16deg" },
    floatDelay: "1.6s",
    cutout: true,
  },
  {
    src: "/images/ephemera/brooklyn-directory-cover.jpg",
    alt: "Vintage Brooklyn street directory cover",
    width: 102, height: 203,
    style: { top: "35%", left: "4%", rotate: "7deg" },
    floatDelay: "1.3s",
    cutout: false,
  },
  {
    src: "/images/ephemera/dodgers-ticket.jpg",
    alt: "Vintage Dodgers ticket",
    width: 97, height: 193,
    style: { top: "39%", right: "11%", rotate: "-13deg", zIndex: 20 },
    floatDelay: "1.1s",
    cutout: false,
  },
  {
    src: "/images/ephemera/coney-island-postcard.jpg",
    alt: "Vintage Coney Island postcard",
    width: 209, height: 137,
    style: { top: "2%", right: "6%", rotate: "7deg" },
    floatDelay: "0.6s",
    cutout: false,
  },
  {
    src: "/images/ephemera/manhattan-bridge-postcard.jpg",
    alt: "Vintage Manhattan Bridge postcard",
    width: 177, height: 113,
    style: { top: "78%", right: "3%", rotate: "-6deg" },
    floatDelay: "0.9s",
    cutout: false,
  },
  {
    src: "/images/ephemera/coney-island-postcard-2.jpg",
    alt: "Vintage Coney Island Cyclone postcard",
    width: 180, height: 116,
    style: { top: "46%", right: "-3%", rotate: "4deg" },
    floatDelay: "0.7s",
    cutout: false,
  },
  {
    src: "/images/ephemera/saturday-night-fever-card.jpg",
    alt: "Vintage Saturday Night Fever trading card",
    width: 167, height: 120,
    style: { top: "70%", left: "11%", rotate: "6deg" },
    floatDelay: "0.4s",
    cutout: false,
  },
  {
    src: "/images/ephemera/steeplechase-ticket-v2.png",
    alt: "Vintage Steeplechase Park ticket",
    width: 127, height: 127,
    style: { top: "11%", right: "-1%", rotate: "11deg" },
    floatDelay: "0.3s",
    cutout: true,
  },
];

// Fluid width that scales down with the viewport instead of staying pinned
// at a fixed pixel size. Reaches `px` (its max) around a 1280px-wide screen
// and shrinks toward ~65% of that as the window narrows, never going below it.
function fluidWidth(px: number) {
  const min = Math.round(px * 0.65);
  const vw = (px / 12.8).toFixed(2);
  return `clamp(${min}px, ${vw}vw, ${px}px)`;
}

export default function EphemeraBurst() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="hidden md:block absolute inset-0 pointer-events-none z-[5]" aria-hidden="true">
      <style>{`
        @keyframes ephemera-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
      {/*
        Capped at the same reference width the layout was hand-tuned against.
        Above 1280px it stays centered and fixed instead of stretching the
        left/right % positions further from the text; below 1280px it shrinks
        1:1 with the viewport (same as fluidWidth's reference), so pieces and
        their gap to the text narrow together instead of drifting into it.
      */}
      <div className="relative h-full max-w-[1280px] mx-auto">
      {pieces.map((p, i) => (
        <div
          key={p.src}
          className="absolute"
          style={{
            top: p.style.top,
            bottom: (p.style as { bottom?: string }).bottom,
            left: (p.style as { left?: string }).left,
            right: (p.style as { right?: string }).right,
            zIndex: (p.style as { zIndex?: number }).zIndex ?? i,
            opacity: visible ? 1 : 0,
            transform: visible
              ? `rotate(${p.style.rotate})`
              : `rotate(${p.style.rotate}) translateY(-60px)`,
            transition: `opacity 0.7s ease ${i * 120}ms, transform 0.7s cubic-bezier(0.34, 1.25, 0.64, 1) ${i * 120}ms`,
          }}
        >
          <div
            style={{
              animation: visible ? `ephemera-float 5s ease-in-out ${p.floatDelay} infinite` : undefined,
            }}
          >
            <Image
              src={p.src}
              alt={p.alt}
              width={p.width}
              height={p.height}
              className="object-cover"
              style={{
                width: fluidWidth(p.width),
                height: "auto",
                ...(p.cutout
                  ? { filter: "drop-shadow(0 8px 14px rgba(0,0,0,0.3))" }
                  : { boxShadow: "0 10px 20px rgba(0,0,0,0.25)", border: "3px solid white" }),
              }}
            />
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
