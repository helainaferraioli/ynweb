"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface Props {
  src: string;
  poster: string;
  className?: string;
}

export default function HeroVideo({ src, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;

    const tryPlay = () => {
      video.play().then(() => setPlaying(true)).catch(() => {});
    };

    tryPlay();

    // iOS 26+ blocks autoplay for muted videos — play on first touch
    document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
    return () => document.removeEventListener("touchstart", tryPlay);
  }, []);

  return (
    <>
      {/* Static poster — visible until video plays, hides iOS play button */}
      <Image
        src={poster}
        alt=""
        fill
        priority
        className={className}
        style={{ opacity: playing ? 0 : 1, transition: "opacity 0.4s ease" }}
      />
      {/* Video — hidden until playing so iOS play button is never visible */}
      <video
        ref={ref}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className={className}
        style={{ opacity: playing ? 1 : 0, transition: "opacity 0.4s ease" }}
      />
    </>
  );
}
