"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

function getDayStatus(): string {
  const dow = new Date().getDay();
  if (dow === 1) return "CLOSED TODAY · Back Tuesday";
  if (dow >= 2 && dow <= 5) return "OPEN TODAY · 10am–5:45pm";
  return "OPEN TODAY · 9:30am–5:30pm";
}

const STATIC_ITEMS = [
  "YESTERDAY'S NEWS ANTIQUES & COLLECTIBLES",
  "EST. 2001",
  "428 Court Street · Brooklyn, NY",
];

const SEP = "/images/asterisk-transparent.png";

function TickerSegment({ dayStatus }: { dayStatus: string }) {
  const items = [...STATIC_ITEMS, dayStatus];
  return (
    <>
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-0.5 flex-none">
          <span className="text-black text-xs font-bold tracking-[0.18em] uppercase whitespace-nowrap">
            {item}
          </span>
          <span className="flex-none inline-flex items-center" style={{ width: 64, height: 64 }}>
            <Image src={SEP} alt="" width={64} height={64} className="object-contain" />
          </span>
        </span>
      ))}
    </>
  );
}

export default function Ticker() {
  const [dayStatus, setDayStatus] = useState("OPEN TODAY");
  const trackRef = useRef<HTMLDivElement>(null);
  const segRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setDayStatus(getDayStatus());
  }, []);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current || !segRef.current) return;
      const w = segRef.current.offsetWidth;
      if (w > 0) trackRef.current.style.setProperty("--seg-w", `${w}px`);
    };
    measure();
    const t = setTimeout(measure, 300);
    return () => clearTimeout(t);
  }, [dayStatus]);

  return (
    <div
      className="overflow-hidden relative"
      style={{ backgroundColor: "#FFB81C", zIndex: 15, height: "44px" }}
    >
      <div ref={trackRef} className="ticker-track flex items-center whitespace-nowrap h-full">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            ref={i === 0 ? segRef : undefined}
            className="inline-flex items-center gap-5 flex-none pr-5"
          >
            <TickerSegment dayStatus={dayStatus} />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-1 * var(--seg-w, 25%))); }
        }
        .ticker-track {
          animation: ticker 16s linear infinite;
          will-change: transform;
        }
        @media (min-width: 768px) {
          .ticker-track {
            animation-duration: 35s;
          }
        }
      `}</style>
    </div>
  );
}
