"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;

    const tryPlay = () => video.play().catch(() => {});

    tryPlay();

    // iOS 26+ blocks autoplay even for muted videos — play on first touch
    const unlock = () => tryPlay();
    document.addEventListener("touchstart", unlock, { once: true, passive: true });

    return () => document.removeEventListener("touchstart", unlock);
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      className={className}
    />
  );
}
