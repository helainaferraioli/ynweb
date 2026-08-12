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

    // Set both muted state and default — Safari checks defaultMuted for autoplay policy
    video.muted = true;
    video.defaultMuted = true;

    const onPlaying = () => setPlaying(true);
    video.addEventListener("playing", onPlaying);

    video.play().catch(() => {});

    // iOS 26+ fallback: play on first touch if autoplay still blocked
    const unlock = () => video.play().catch(() => {});
    document.addEventListener("touchstart", unlock, { once: true, passive: true });

    return () => {
      video.removeEventListener("playing", onPlaying);
      document.removeEventListener("touchstart", unlock);
    };
  }, []);

  return (
    <>
      {/* Video is always visible so iOS will attempt autoplay */}
      <video
        ref={ref}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className={className}
      />
      {/* Poster sits on top of the video, hiding the iOS play button until video plays */}
      <Image
        src={poster}
        alt=""
        fill
        priority
        className={className}
        style={{
          opacity: playing ? 0 : 1,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
