"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFired(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="flex flex-col md:flex-row min-h-[580px] overflow-visible">
      <div className="relative md:w-1/2 min-h-[420px]">
        <Image
          src="/family-photo-1.jpg"
          alt="The Ferraioli family outside Yesterday's News"
          fill
          className="object-cover"
          style={{ objectPosition: "center 68%" }}
        />
      </div>

      <div
        className="flex flex-col justify-center gap-6 px-14 py-16 md:w-1/2 relative overflow-visible"
        style={{ backgroundColor: "#f6e6c9" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustration-corner.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            right: "2rem",
            width: 170,
            zIndex: 10,
            transform: fired ? "translateY(0) scale(1)" : "translateY(115%) scale(0.85)",
            opacity: fired ? 1 : 0,
            transition: fired
              ? "transform 0.45s cubic-bezier(0.34, 1.25, 0.64, 1) 0.15s, opacity 0.25s ease 0.15s"
              : "none",
          }}
        />

        <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#971B2E" }}>
          Our Story
        </span>
        <h2 className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: "#1a0a0e" }}>
          A family business.<br />
          <em style={{ color: "#971B2E" }}>A Brooklyn institution.</em>
        </h2>
        <div className="flex flex-col gap-4 font-serif text-base md:text-lg leading-relaxed max-w-sm" style={{ color: "#3a2010" }}>
          <p>
            In 2001, we opened our doors on Court Street with a truck, a good eye, and a love
            for the objects that carry people&apos;s lives. Twenty-five years later, not much has
            changed — except now there&apos;s a second generation at the counter.
          </p>
        </div>
        <div>
          <a
            href="/about"
            className="inline-block text-sm font-bold tracking-widest uppercase px-8 py-3 text-white transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#971B2E" }}
          >
            Dive Deeper
          </a>
        </div>
      </div>
    </section>
  );
}
