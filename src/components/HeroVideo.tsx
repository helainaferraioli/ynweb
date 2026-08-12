"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo({ className }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.src = window.innerWidth < 768
      ? "/Shortened%20Hero%20Video%201.mp4"
      : "/Shortened%20Hero%20Video%202.mp4";
    video.load();
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="auto"
      className={className}
    />
  );
}
