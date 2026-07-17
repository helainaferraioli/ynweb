"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Post = {
  id: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
};

const PLACEHOLDERS = Array.from({ length: 8 }, (_, i) => i);
const TILE_COLORS = [
  "#2C1810","#1A2416","#1C1C2C","#2C1A1A",
  "#1A1A2C","#2C2210","#101C2C","#1C2C1A",
];

function VideoTile({ post, dark }: { post: Post; dark?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.playbackRate = 1;
          video.play().catch(() => {});
        } else {
          video.pause();
          video.currentTime = 0;
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    if (videoRef.current) { videoRef.current.playbackRate = 1; videoRef.current.play().catch(() => {}); }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  return (
    <a
      ref={containerRef}
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-none relative overflow-hidden w-[220px] md:w-[288px] aspect-[9/13] md:aspect-[9/16]"
      style={{ ...(dark && { border: "2px solid #FFB81C" }) }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={post.media_url}
        poster={post.thumbnail_url}
        muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
    </a>
  );
}

function ImageTile({ post, dark }: { post: Post; dark?: boolean }) {
  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-none relative group overflow-hidden w-[220px] md:w-[410px]"
      style={{ aspectRatio: "4/5", ...(dark && { border: "2px solid #FFB81C" }) }}
    >
      <Image
        src={post.media_url}
        alt={post.caption?.slice(0, 80) ?? "Yesterday's News on Instagram"}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="384px"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
    </a>
  );
}

export default function InstagramFeed({ hideHeader, dark }: { hideHeader?: boolean; dark?: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data) => {
        if (data.error || !data.data) { setError(true); return; }
        setPosts(data.data);
      })
      .catch(() => setError(true));
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 420 : -420, behavior: "smooth" });
  };

  return (
    <section style={{ backgroundColor: dark ? "#000000" : "#971B2E" }} className={`overflow-hidden ${dark ? "pt-4 pb-16" : "py-16"}`}>

      {/* Header row */}
      {!hideHeader && <div className="flex flex-col md:flex-row md:items-start md:justify-between px-4 md:px-14 mb-6 md:mb-10 gap-2 md:gap-0">
        <h2
          className="font-serif italic text-4xl md:text-6xl leading-none"
          style={{ color: "#f6e6c9" }}
        >
          Shop our feed.
        </h2>
        <p className="font-serif text-sm md:text-base leading-relaxed md:max-w-xs md:text-right" style={{ color: "#f6e6c9" }}>
          Can&apos;t make it in person? Here&apos;s a peek at<br />what&apos;s new at the shop this week.
        </p>
      </div>}

      {/* Scrollable feed */}
      <div className="relative">
        <button
          onClick={() => scroll("left")}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-2xl border border-white/30 bg-black/30 hover:bg-black/50 transition"
          style={{ color: "#f6e6c9" }}
          aria-label="Scroll left"
        >‹</button>

        <div
          ref={scrollRef}
          className="flex items-center gap-3 overflow-x-scroll px-4 md:px-14"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {posts?.map((post) =>
            post.media_type === "VIDEO"
              ? <VideoTile key={post.id} post={post} dark={dark} />
              : <ImageTile key={post.id} post={post} dark={dark} />
          )}
          {!posts && PLACEHOLDERS.map((i) => (
            <div
              key={i}
              className="flex-none animate-pulse"
              style={{ width: "288px", aspectRatio: "4/5", backgroundColor: TILE_COLORS[i % TILE_COLORS.length] }}
            >
              {error && i === 0 && (
                <div className="flex items-center justify-center h-full p-4">
                  <p className="text-white/40 text-xs text-center">Add INSTAGRAM_ACCESS_TOKEN to .env.local</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center text-2xl border border-white/30 bg-black/30 hover:bg-black/50 transition"
          style={{ color: "#f6e6c9" }}
          aria-label="Scroll right"
        >›</button>
      </div>

      {/* Follow link below gallery */}
      <div className="px-4 md:px-14 mt-6">
        <a
          href="https://instagram.com/yesterdaysnewsbk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold tracking-widest uppercase pb-1 border-b-2 hover:opacity-70 transition-opacity"
          style={{ color: "#f6e6c9", borderColor: "#f6e6c9" }}
        >
          Follow @yesterdaysnewsbk
        </a>
      </div>

    </section>
  );
}
