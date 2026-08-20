"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [fired, setFired] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

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

  // Fires as soon as the section itself enters view — earlier than the
  // button-triggered illustration animation — so the text fade finishes first
  useEffect(() => {
    let observer: IntersectionObserver;
    const raf = requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setTextVisible(true); },
        { threshold: 0 }
      );
      if (ref.current) observer.observe(ref.current);
    });
    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, []);

  return (
    <section ref={ref} className="flex flex-col md:flex-row md:min-h-[580px] overflow-visible">
      <div className="about-image-wrapper relative md:w-1/2 order-last md:order-none" style={{ height: "320px", zIndex: 5 }}>
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
        className="flex flex-col justify-center gap-6 px-14 pt-10 md:pt-4 pb-4 md:pb-[66px] md:w-1/2 relative overflow-visible"
        style={{ backgroundColor: "#f6e6c9" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustration-corner.svg"
          alt=""
          aria-hidden="true"
          className="w-[130px] md:w-[158px] absolute bottom-0 md:-bottom-px right-10 md:right-28"
          style={{
            zIndex: 1,
            transform: fired ? "translateY(0) scale(1)" : "translateY(115%) scale(0.85)",
            opacity: fired ? 1 : 0,
            transition: "transform 0.45s cubic-bezier(0.34, 1.25, 0.64, 1) 0.15s, opacity 0.25s ease 0.15s",
          }}
        />
        <div
          className="flex flex-col gap-6"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#971B2E" }}>
            Our Story
          </span>
          <h2 className="font-serif text-[1.6rem] md:text-5xl leading-tight" style={{ color: "#1a0a0e" }}>
            A family business.<br />
            <em style={{ color: "#971B2E" }}>A Brooklyn institution.</em>
          </h2>
          {/* Mobile — wraps around the corner illustration */}
          <div className="flex flex-col font-serif text-base leading-relaxed max-w-sm md:hidden" style={{ color: "#3a2010" }}>
            <p>
              In 2001, our family opened Yesterday&apos;s&nbsp;News with a small van<br />
              and a love for vintage treasures.
            </p>
            <p className="max-w-[175px]">
              Twenty-five years later, we&apos;re still here, now
            </p>
            <p>
              with a truck, a larger<br />
              space, and the next gen<br />
              behind the counter.
            </p>
          </div>
          {/* Desktop — single paragraph */}
          <div className="hidden md:flex flex-col font-serif text-lg leading-relaxed max-w-sm" style={{ color: "#3a2010" }}>
            <p>
              In 2001, our family opened Yesterday&apos;s News with a small van and a love for
              vintage treasures. Twenty-five years later, we&apos;re still here, now with a
              truck, a larger space, and the next gen behind the counter.
            </p>
          </div>
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
