"use client";

import Image from "next/image";
import { Special_Elite } from "next/font/google";
import { useEffect, useState } from "react";

const typewriter = Special_Elite({ weight: "400", subsets: ["latin"] });

// All source photos are shown in the same 4:5 portrait crop.
const photos = [
  { src: "/images/about/1970s%20Prospect%20Park.png",    position: "center 80%",  rotate: -4, caption: "JP + Craig, Prospect Park little league (1970s)" },
  { src: "/images/about/1983%20President%20Street.png",  position: "center 40%",  rotate: 3,  caption: "A summer day on President Street (1983)" },
  { src: "/images/about/Dad%20Carroll%20Park.jpg",        position: "center 35%",  rotate: -2, caption: "Carroll Park bocci courts (1985)" },
  { src: "/images/about/1990s%20Collection%20Room.png",   position: "center 100%", rotate: -3, caption: "Reading yesterday's news (1993)" },
  { src: "/images/about/Dad%20Collection%20Room%202.png", position: "center 100%", rotate: 4,  caption: "The Coca-Cola collection room (1996)" },
  { src: "/images/about/Dad%20%26%20Craig.png",           position: "center 30%",  rotate: -5, caption: "JP and Craig catch a game (1996)" },
  { src: "/images/about/Opening%20Day%20H%26Mom.jpg",     position: "68% 22%",     rotate: -6, scale: 1.5, caption: "Colleen & Helaina, opening day (2001)" },
  { src: "/images/about/Dad%20Baby%20YN.png",             position: "center 30%",  rotate: 5,  caption: "Outside the shop (2004)" },
];

export default function JPSlideshow() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % photos.length);
    }, 4500);
    return () => clearInterval(id);
    // Restart the timer on every change (auto or manual) so a manual click
    // doesn't get immediately overridden by an in-flight auto-advance.
  }, [active]);

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  const goTo = (next: number) => setActive((next + photos.length) % photos.length);
  const activePhoto = photos[active];

  return (
    <div className="jp-slideshow-root absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "#971B2E" }}>
      <style>{`
        .jp-next-arrow { color: #f6e6c9; transition: color 0.2s ease; }
        .jp-next-arrow:hover { color: #FFB81C; }
        .jp-slideshow-root { --jp-shift: 0px; }
        @media (min-width: 1024px) {
          .jp-slideshow-root { --jp-shift: -92px; }
        }
      `}</style>
      {photos.map(({ src, position, rotate, scale, caption }, i) => {
        // How many steps behind the active photo this one is, in the cycle.
        const depth = (i - active + photos.length) % photos.length;
        const inStack = depth < 3;

        return (
          <div
            key={src}
            className="absolute inset-0 m-auto"
            style={{
              height: "78%",
              aspectRatio: "4 / 5",
              zIndex: photos.length - depth,
              opacity: inStack ? 1 : 0,
              transform: `translate(calc(var(--jp-shift) + ${depth * 9}px), ${depth * 9}px) rotate(${rotate}deg)`,
              transition: "transform 1.1s ease, opacity 0.8s ease",
              pointerEvents: depth === 0 ? "auto" : "none",
            }}
          >
            <button
              type="button"
              onClick={() => setExpanded(true)}
              aria-label={`View larger: ${caption}`}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fdfaf3",
                boxShadow: "0 10px 20px rgba(0,0,0,0.35)",
                padding: "4% 4% 13% 4%",
                border: 0,
                cursor: depth === 0 ? "pointer" : "default",
              }}
            >
              <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
                <Image
                  src={src}
                  alt="JP Ferraioli"
                  fill
                  className="object-cover"
                  style={{ objectPosition: position, transform: scale ? `scale(${scale})` : undefined }}
                  sizes="50vw"
                />
              </div>
              <p
                className={typewriter.className}
                style={{
                  color: "#3a2010",
                  fontSize: "0.78rem",
                  textAlign: "center",
                  marginTop: "6%",
                  letterSpacing: "0.02em",
                }}
              >
                {caption}
              </p>
            </button>
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => goTo(active + 1)}
        aria-label="Next photo"
        className="jp-next-arrow absolute right-0 top-1/2 z-30 w-14 h-14 hidden lg:flex items-center justify-center text-5xl"
        style={{ transform: "translateY(-50%) translateX(-88px)" }}
      >
        ›
      </button>
      <button
        type="button"
        onClick={() => goTo(active - 1)}
        aria-label="Previous photo"
        className="jp-next-arrow absolute left-0 top-1/2 z-30 w-14 h-14 hidden lg:flex items-center justify-center text-5xl"
        style={{ transform: "translateY(-50%) translateX(-52px)" }}
      >
        ‹
      </button>

      {expanded && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
          style={{ backgroundColor: "rgba(26,10,14,0.85)" }}
          onClick={() => setExpanded(false)}
        >
          <button
            type="button"
            onClick={() => setExpanded(false)}
            className="absolute top-5 right-5 md:top-8 md:right-8 text-white text-3xl leading-none w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
            aria-label="Close"
          >
            &times;
          </button>
          <div
            className="flex flex-col items-center gap-5 max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activePhoto.src}
              alt="JP Ferraioli"
              width={800}
              height={1000}
              style={{
                height: "min(60vh, 500px)",
                width: "auto",
                maxWidth: "90vw",
                aspectRatio: "4 / 5",
                objectFit: "cover",
                objectPosition: activePhoto.position,
                boxShadow: "0 16px 28px rgba(0,0,0,0.4)",
                border: "4px solid white",
              }}
            />
            <p
              className="font-serif text-base md:text-lg text-center leading-relaxed"
              style={{ color: "#f6e6c9" }}
            >
              {activePhoto.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
