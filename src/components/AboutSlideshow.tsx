"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const photos = Array.from({ length: 12 }, (_, i) =>
  `/images/Slideshow%20Photo%20${i + 1}.webp`
);

export default function AboutSlideshow() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((a) => (a + 1) % photos.length);
    }, 5500);
  };

  useEffect(() => {
    startTimer();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (dir: 1 | -1) => {
    setActive((a) => (a + dir + photos.length) % photos.length);
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
      className="absolute inset-0"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {photos.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{ opacity: i === active ? 1 : 0, transition: "opacity 0.5s ease" }}
        >
          <Image
            src={src}
            alt="Yesterday's News"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
      ))}

      {/* Prev arrow */}
      <button
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center rounded-full bg-black/35 text-white text-xl hover:bg-black/55 transition-colors z-10"
        aria-label="Previous photo"
      >
        ‹
      </button>

      {/* Next arrow */}
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
