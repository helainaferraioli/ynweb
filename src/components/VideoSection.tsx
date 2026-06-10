"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
          setPaused(false);
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden cursor-pointer"
      style={{ height: "60vh" }}
      onClick={handleClick}
    >
      <video
        ref={videoRef}
        src="/home-video.mov"
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/25" />

      {/* Pause indicator — fades in when paused */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: paused ? 1 : 0 }}
      >
        <div className="w-16 h-16 rounded-full bg-black/50 border-2 border-white flex items-center justify-center">
          <svg width="18" height="22" viewBox="0 0 18 22" fill="white">
            <rect x="0" y="0" width="6" height="22" rx="1" />
            <rect x="12" y="0" width="6" height="22" rx="1" />
          </svg>
        </div>
      </div>
    </section>
  );
}
