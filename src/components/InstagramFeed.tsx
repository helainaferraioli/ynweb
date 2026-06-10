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

function VideoTile({ post }: { post: Post }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovering, setHovering] = useState(false);

  const handleMouseEnter = () => {
    setHovering(true);
    videoRef.current?.play();
  };

  const handleMouseLeave = () => {
    setHovering(false);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  };

  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-none relative overflow-hidden"
      style={{ width: "288px", aspectRatio: "9/16" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={post.media_url}
        muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Thumbnail overlay — fades out on hover to reveal playing video */}
      {post.thumbnail_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.thumbnail_url}
          alt="Reel thumbnail"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: hovering ? 0 : 1 }}
        />
      )}
      <div
        className="absolute inset-0 bg-black/0 transition-colors duration-300"
        style={{ backgroundColor: hovering ? "rgba(0,0,0,0.2)" : "transparent" }}
      />
    </a>
  );
}

function ImageTile({ post }: { post: Post }) {
  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex-none relative group overflow-hidden"
      style={{ width: "410px", aspectRatio: "4/5" }}
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

export default function InstagramFeed() {
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
    <section style={{ backgroundColor: "#971B2E" }} className="py-16 overflow-hidden">

      {/* Header row */}
      <div className="flex items-start justify-between px-14 mb-10">
        <h2
          className="font-serif italic text-5xl md:text-6xl leading-none max-w-xs"
          style={{ color: "#f6e6c9" }}
        >
          Every visit<br />is different.
        </h2>
        <div className="flex flex-col gap-4 items-end max-w-xs text-right">
          <p className="font-serif text-base leading-relaxed" style={{ color: "#f6e6c9" }}>
            We never carry the same thing twice.<br />
            Come in and see what turned up this week.
          </p>
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
      </div>

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
          className="flex items-start gap-3 overflow-x-scroll px-14"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {posts?.map((post) =>
            post.media_type === "VIDEO"
              ? <VideoTile key={post.id} post={post} />
              : <ImageTile key={post.id} post={post} />
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

    </section>
  );
}
