"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const photos = Array.from({ length: 12 }, (_, i) =>
  `/images/Slideshow%20Photo%20${i + 1}.webp`
);

export default function AboutSlideshow() {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((a) => {
        setPrev(a);
        return (a + 1) % photos.length;
      });
    }, 4500);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startTimer();
        else stopTimer();
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => { observer.disconnect(); stopTimer(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (dir: 1 | -1) => {
    setActive((a) => {
      const next = (a + dir + photos.length) % photos.length;
      setPrev(a);
      return next;
    });
    startTimer();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) go(diff < 0 ? 1 : -1);
    touchStartX.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {photos.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{
            // Keep outgoing photo visible underneath so there's no black flash
            opacity: i === active || i === prev ? 1 : 0,
            zIndex: i === active ? 2 : i === prev ? 1 : 0,
            transition: i === active ? "opacity 0.8s ease" : "none",
          }}
        >
          <Image
            src={src}
            alt="Yesterday's News"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={90}
          />
        </div>
      ))}

      <button
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/35 text-white text-xl hover:bg-black/55 transition-colors z-10"
        aria-label="Previous photo"
      >
        ‹
      </button>
      <button
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/35 text-white text-xl hover:bg-black/55 transition-colors z-10"
        aria-label="Next photo"
      >
        ›
      </button>
    </div>
  );
}
