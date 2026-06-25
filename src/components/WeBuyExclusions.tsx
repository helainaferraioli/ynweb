"use client";

import { useState } from "react";

const EXCLUSIONS = [
  "Appliances",
  "Electronics",
  "Exercise equipment",
  "Instruments",
  "China cabinets & large display cabinets",
  "Couches",
  "Chandeliers",
  "Anything manufactured after 1980",
];

export default function WeBuyExclusions() {
  const [open, setOpen] = useState(false);

  return (
    <section className="pt-0 pb-10 px-10 md:px-16" style={{ backgroundColor: "#f6e6c9" }}>
      <div className="max-w-sm">
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center justify-between gap-4 border-t border-b py-5"
          style={{ borderColor: "#c4a882" }}
          aria-expanded={open}
        >
          <span className="font-serif text-lg" style={{ color: "#1a0a0e" }}>
            What We Don&apos;t Buy
          </span>
          <svg
            width="14"
            height="9"
            viewBox="0 0 14 9"
            fill="none"
            className="flex-none transition-transform duration-300"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", color: "#971B2E" }}
          >
            <path d="M1 1L7 7L13 1" stroke="#971B2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: open ? "600px" : "0px" }}
        >
          <div className="pt-5 pb-2 flex flex-col gap-1">
            <p className="font-serif text-sm mb-4" style={{ color: "#3a2010" }}>
              We aren&apos;t able to purchase the following, even if they&apos;re in great condition:
            </p>
            {EXCLUSIONS.map((item) => (
              <p key={item} className="font-serif text-base py-2 border-b" style={{ color: "#1a0a0e", borderColor: "#c4a882" }}>
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
