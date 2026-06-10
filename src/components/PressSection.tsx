"use client";

import { useEffect, useRef, useState } from "react";

const features = [
  {
    logo: "/press-nyt.svg",
    alt: "The New York Times",
    title: '"Curated Collectibles on One Brooklyn Corner"',
    href: "https://www.nytimes.com/2017/11/22/nyregion/curated-collectibles-on-one-brooklyn-corner.html",
    width: 260,
  },
  {
    logo: "/press-cnt.svg",
    alt: "Condé Nast Traveler",
    title: '"How to Spend a Perfect Day in Carroll Gardens, Brooklyn"',
    href: "https://www.cntraveler.com/story/how-to-spend-a-perfect-day-in-carroll-gardens-brooklyn",
    width: 220,
  },
  {
    logo: "/press-vogue.svg",
    alt: "Vogue",
    title: '"The Best Shopping in NYC According to Vogue Staffers"',
    href: "https://www.vogue.com/article/the-best-shopping-in-nyc-according-to-vogue-staffers",
    width: 160,
  },
  {
    logo: "/press-ad.svg",
    alt: "Architectural Digest",
    title: '"The Unadulterated Joy of Trinkets and Knickknacks"',
    href: "https://www.architecturaldigest.com/story/the-unadulterated-joy-of-trinkets-and-knickknacks",
    width: 300,
  },
];

// Each card starts tiny, clustered near the newspaper stand (right side)
// and grows + flies to its grid position
const startTransforms = [
  "translate(380px, 200px) scale(0.04)",  // top-left
  "translate(210px, 200px) scale(0.04)",  // top-right
  "translate(380px,  30px) scale(0.04)",  // bottom-left
  "translate(210px,  30px) scale(0.04)",  // bottom-right (closest to stand)
];

// bottom-right first, then burst outward
const delays = [600, 720, 840, 500];

export default function PressSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFired(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ backgroundColor: "#FFB81C" }} className="py-12 px-10 overflow-hidden">
      <div ref={ref} className="flex items-end gap-8 max-w-6xl mx-auto">

        {/* Press grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {features.map((f, i) => (
            <a
              key={f.href}
              href={f.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center text-center gap-4 group bg-white px-8 py-7"
              style={{
                opacity: fired ? 1 : 0,
                transform: fired ? "translate(0,0) scale(1)" : startTransforms[i],
                transition: `opacity 0.7s ease ${delays[i]}ms, transform 0.7s cubic-bezier(0.15, 0.85, 0.35, 1.1) ${delays[i]}ms`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={f.logo}
                alt={f.alt}
                style={{ width: f.width, height: "auto", maxHeight: 60, objectFit: "contain" }}
                className="block mx-auto opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span
                className="font-serif text-sm leading-relaxed underline underline-offset-4 decoration-1 group-hover:opacity-60 transition-opacity"
                style={{ color: "#3a2010" }}
              >
                {f.title}
              </span>
            </a>
          ))}
        </div>

        {/* Newspaper stand — slides in from the right first */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustration-newspaperbox.svg"
          alt=""
          aria-hidden="true"
          className="hidden md:block flex-shrink-0 self-end"
          style={{
            width: 130,
            marginBottom: "-1.5rem",
            opacity: fired ? 1 : 0,
            transform: fired ? "translateX(0)" : "translateX(180px)",
            transition: "opacity 0.5s ease 0ms, transform 0.5s cubic-bezier(0.2, 0.8, 0.4, 1) 0ms",
          }}
        />

      </div>
    </section>
  );
}
