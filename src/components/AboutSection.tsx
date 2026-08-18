"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);

  useEffect(() => {
    let observer: IntersectionObserver;
    const raf = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setFired(true); },
        { threshold: 0 }
      );
      if (buttonRef.current) observer.observe(buttonRef.current);
    });
    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, []);

  return (
    <section ref={ref} className="flex flex-col md:flex-row md:min-h-[580px] overflow-visible">
      <div className="about-image-wrapper relative md:w-1/2 order-last md:order-none" style={{ height: "320px" }}>
        <Image
          src="/family-photo-2.jpg"
          alt="The Ferraioli family outside Yesterday's News"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          style={{ objectPosition: "center 35%" }}
        />
        <a
          href="/about"
          className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 inline-block text-sm font-bold tracking-widest uppercase px-8 py-3 text-white z-10 whitespace-nowrap"
          style={{ backgroundColor: "#971B2E" }}
        >
          Dive Deeper
        </a>
      </div>

      <div
        className="flex flex-col justify-center gap-6 px-14 pt-16 md:pt-10 pb-16 md:pb-[190px] md:w-1/2 relative overflow-visible"
        style={{ backgroundColor: "#f6e6c9" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustration-corner.svg"
          alt=""
          aria-hidden="true"
          className="w-[88px] md:w-[130px]"
          style={{
            position: "absolute",
            bottom: 0,
            right: "2rem",
            zIndex: 10,
            transform: fired ? "translateY(0) scale(1)" : "translateY(115%) scale(0.85)",
            opacity: fired ? 1 : 0,
            transition: "transform 0.45s cubic-bezier(0.34, 1.25, 0.64, 1) 0.15s, opacity 0.25s ease 0.15s",
          }}
        />

        <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#971B2E" }}>
          Our Story
        </span>
        <h2 className="font-serif text-[1.6rem] md:text-5xl leading-tight" style={{ color: "#1a0a0e" }}>
          A family business.<br />
          <em style={{ color: "#971B2E" }}>A Brooklyn institution.</em>
        </h2>
        <div className="flex flex-col gap-4 font-serif text-base md:text-lg leading-relaxed max-w-sm" style={{ color: "#3a2010" }}>
          <p>
            JP and Colleen Ferraioli opened our doors in 2001 with a van and a life-long love
            for collecting treasures of the past. 25 years later, our mission hasn&apos;t changed.
            We&apos;re still supplying Brooklyn with unique vintage pieces – except now we&apos;ve
            got a truck and a second generation behind the counter.
          </p>
        </div>
        <div ref={buttonRef}>
          <a
            href="/about"
            className="hidden md:inline-block text-sm font-bold tracking-widest uppercase px-8 py-3 text-white transition-opacity hover:opacity-80"
            style={{ backgroundColor: "#971B2E" }}
          >
            Dive Deeper
          </a>
        </div>
      </div>
    </section>
  );
}
