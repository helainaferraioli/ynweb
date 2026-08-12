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
    const onCanPlay = () => video.play().catch(() => {});
    video.addEventListener("canplay", onCanPlay, { once: true });
    video.load();
    return () => video.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={className}
    />
  );
}
