"use client";

import Image from "next/image";
import { useState } from "react";

const criteria = [
  "You have 8–10 or more pieces of vintage furniture, 50 years old or older",
  "Your pieces are in good, usable condition — some wear is fine, nothing broken or missing parts",
  "You're located in Brooklyn, Queens, or Long Island",
  "You're ready to sell now",
];

export default function WeBuyQualify() {
  const [checked, setChecked] = useState<boolean[]>(new Array(criteria.length).fill(false));
  const allChecked = checked.every(Boolean);

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  return (
    <section id="qualify" className="flex flex-col md:flex-row">

      {/* Photo LEFT */}
      <div className="relative md:w-1/2 min-h-[520px]">
        <Image
          src="/images/we%20buy/Checklist%20photo"
          alt="JP Ferraioli at work"
          fill
          className="object-cover"
          style={{ objectPosition: "center top" }}
          sizes="50vw"
        />
      </div>

      {/* Checklist RIGHT */}
      <div
        className="flex flex-col justify-center gap-8 px-14 py-16 md:w-1/2"
        style={{ backgroundColor: "#971B2E" }}
      >
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#FFB81C" }}>
            Is This a Good Fit?
          </span>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight text-white">
            Here&apos;s who we can help.
          </h2>
          <p className="font-serif text-base md:text-lg leading-relaxed" style={{ color: "#FFCCCC" }}>
            We&apos;re not the right call for everyone — tick the boxes that apply to you:
          </p>
        </div>

        {/* Checklist */}
        <div className="flex flex-col gap-5">
          {criteria.map((text, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className="flex items-start gap-4 text-left group"
              role="checkbox"
              aria-checked={checked[i]}
            >
              {/* Checkbox */}
              <span
                className="flex-none mt-1 w-5 h-5 border-2 flex items-center justify-center transition-colors duration-150"
                style={{
                  borderColor: checked[i] ? "#fff" : "#FFCCCC",
                  backgroundColor: checked[i] ? "#fff" : "transparent",
                }}
              >
                {checked[i] && (
                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                    <path d="M1 4L4.5 7.5L11 1" stroke="#971B2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span
                className="font-serif text-base md:text-lg leading-relaxed transition-colors duration-150"
                style={{ color: checked[i] ? "#fff" : "#FFCCCC" }}
              >
                {text}
              </span>
            </button>
          ))}
        </div>

        {/* Reveal when all checked */}
        <div
          className="flex items-center gap-3 font-serif text-lg transition-all duration-500"
          style={{
            color: "#FFB81C",
            opacity: allChecked ? 1 : 0,
            transform: allChecked ? "translateY(0)" : "translateY(8px)",
            pointerEvents: allChecked ? "auto" : "none",
          }}
        >
          <em>Sounds like this might be a good fit</em>
          <a href="#how-it-works" className="text-2xl leading-none hover:opacity-70 transition-opacity" aria-label="Read more">
            ↓
          </a>
        </div>
      </div>

    </section>
  );
}
