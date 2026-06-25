"use client";

import { useState, useRef, useEffect } from "react";

const PHONE = "9173751361";

export default function CallTextButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="font-serif text-base px-7 py-3 transition-opacity duration-200 hover:opacity-80"
        style={{ backgroundColor: "#FFB81C", color: "#1a0a0e" }}
      >
        Call or Text Us
      </button>

      {open && (
        <div
          className="absolute left-0 top-full mt-2 flex flex-col shadow-lg z-10 min-w-[220px]"
          style={{ backgroundColor: "#1a0a0e" }}
        >
          <a
            href={`tel:${PHONE}`}
            className="font-serif text-base px-6 py-4 border-b border-white/10 hover:bg-white/10 transition-colors"
            style={{ color: "#f6e6c9" }}
            onClick={() => setOpen(false)}
          >
            📞 Call 917-375-1361
          </a>
          <a
            href={`sms:${PHONE}`}
            className="font-serif text-base px-6 py-4 hover:bg-white/10 transition-colors"
            style={{ color: "#f6e6c9" }}
            onClick={() => setOpen(false)}
          >
            💬 Text 917-375-1361
          </a>
        </div>
      )}
    </div>
  );
}
