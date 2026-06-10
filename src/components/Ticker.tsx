"use client";

const INFO = [
  "Yesterday's News",
  "441 Court Street, Brooklyn, NY 11231",
  "Tues–Fri 10am–5:45pm",
  "Sat & Sun 9:30am–5:30pm",
  "yesterdaysnews1@gmail.com",
  "(718) 875-0900",
];

const text = INFO.join("  //  ") + "  //  ";

export default function Ticker() {
  return (
    <div
      className="overflow-hidden py-3 relative"
      style={{ backgroundColor: "#FFB81C", zIndex: 5 }}
    >
      <div
        className="flex whitespace-nowrap"
        style={{
          animation: "ticker 30s linear infinite",
        }}
      >
        {/* Duplicate for seamless loop */}
        {[0, 1].map((i) => (
          <span
            key={i}
            className="text-black text-sm font-medium tracking-wide flex-none pr-8"
          >
            {text}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
