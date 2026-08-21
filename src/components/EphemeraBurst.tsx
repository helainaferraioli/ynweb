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
    caption: "A 1910s postcard view of the Brooklyn Bridge, spanning the East River into Manhattan.",
    width: 182, height: 119,
    style: { top: "2%", left: "4%", rotate: "-9deg" },
    floatDelay: "0s",
    cutout: false,
  },
  {
    src: "/images/ephemera/dodgers-patch-v2.png",
    alt: "Vintage Brooklyn Dodgers patch",
    caption: "A 1950s felt Brooklyn Dodgers patch, from back when Ebbets Field was still standing.",
    width: 145, height: 148,
    style: { top: "30%", left: "11%", rotate: "16deg" },
    floatDelay: "1.6s",
    cutout: true,
  },
  {
    src: "/images/ephemera/brooklyn-directory-cover.jpg",
    alt: "Vintage Brooklyn street directory cover",
    caption: "The 1932 “How-To-Get-There” street directory of Brooklyn — a paper GPS for the borough.",
    width: 102, height: 203,
    style: { top: "35%", left: "2%", rotate: "7deg" },
    floatDelay: "1.3s",
    cutout: false,
  },
  {
    src: "/images/ephemera/dodgers-ticket.jpg",
    alt: "Vintage Dodgers ticket",
    caption: "A ticket stub from a 1955 Brooklyn Dodgers game at Ebbets Field.",
    width: 97, height: 193,
    style: { top: "39%", right: "13%", rotate: "-13deg", zIndex: 20 },
    floatDelay: "1.1s",
    cutout: false,
  },
  {
    src: "/images/ephemera/coney-island-postcard.jpg",
    alt: "Vintage Coney Island postcard",
    caption: "A 1930s linen postcard shows a crowded afternoon on the beach at Coney Island.",
    width: 209, height: 137,
    style: { top: "2%", right: "6%", rotate: "7deg" },
    floatDelay: "0.6s",
    cutout: false,
  },
  {
    src: "/images/ephemera/manhattan-bridge-postcard.jpg",
    alt: "Vintage Manhattan Bridge postcard",
    caption: "A 1910s postcard view of the Manhattan Bridge and the East River waterfront.",
    width: 177, height: 113,
    lightboxScale: 6,
    style: { top: "78%", right: "3%", rotate: "-6deg" },
    floatDelay: "0.9s",
    cutout: false,
  },
  {
    src: "/images/ephemera/coney-island-postcard-2.jpg",
    alt: "Vintage Coney Island Cyclone postcard",
    caption: "A 1930s linen souvenir postcard shows The Cyclone roller coaster at Coney Island, running since 1927.",
    width: 180, height: 116,
    style: { top: "46%", right: "-3%", rotate: "4deg" },
    floatDelay: "0.7s",
    cutout: false,
  },
  {
    src: "/images/ephemera/saturday-night-fever-card.jpg",
    alt: "Vintage Saturday Night Fever trading card",
    caption: "A trading card from the film 'Saturday Night Fever', filmed right here in Brooklyn.",
    width: 167, height: 120,
    style: { top: "70%", left: "11%", rotate: "6deg" },
    floatDelay: "0.4s",
    cutout: false,
  },
  {
    src: "/images/ephemera/steeplechase-ticket-v2.png",
    alt: "Vintage Steeplechase Park ticket",
    caption: "A 1949 admission tag from Steeplechase Park, Coney Island.",
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  const active = activeIndex !== null ? pieces[activeIndex] : null;

  return (
    <>
      <div ref={ref} className="hidden md:block absolute inset-0 pointer-events-none z-[5]">
        <style>{`
          @keyframes ephemera-float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .ephemera-piece {
            transition: transform 0.25s ease;
            transform: scale(1);
          }
          .ephemera-piece:hover,
          .ephemera-piece:focus-visible {
            transform: scale(1.08);
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
              <button
                type="button"
                onClick={() => setActiveIndex(i)}
                className="ephemera-piece pointer-events-auto block cursor-pointer p-0 border-0 bg-transparent rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ outlineColor: "#FFB81C" }}
                aria-label={`View larger: ${p.caption}`}
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
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
          style={{ backgroundColor: "rgba(26,10,14,0.85)" }}
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute top-5 right-5 md:top-8 md:right-8 text-white text-3xl leading-none w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Close"
          >
            &times;
          </button>
          <div
            className="flex flex-col items-center gap-5 max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              width={active.width * ((active as { lightboxScale?: number }).lightboxScale ?? 3)}
              height={active.height * ((active as { lightboxScale?: number }).lightboxScale ?? 3)}
              style={{
                height: "min(60vh, 500px)",
                width: "auto",
                maxWidth: "90vw",
                aspectRatio: `${active.width} / ${active.height}`,
                ...(active.cutout
                  ? { filter: "drop-shadow(0 16px 28px rgba(0,0,0,0.45))" }
                  : { boxShadow: "0 16px 28px rgba(0,0,0,0.4)", border: "4px solid white" }),
              }}
            />
            <p
              className="font-serif text-base md:text-lg text-center leading-relaxed max-w-lg"
              style={{ color: "#f6e6c9" }}
            >
              {active.caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
