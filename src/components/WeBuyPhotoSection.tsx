"use client";

import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const WE_BUY_CATEGORIES = [
  { label: "Furniture",                      src: "/images/we%20buy/categories/Furniture.jpeg"  },
  { label: "Kitchen & Cookware",             src: "/images/we%20buy/categories/kitchen.JPG"     },
  { label: "Dishes",                         src: "/images/we%20buy/categories/dishes.JPEG"     },
  { label: "Barware",                        src: "/images/we%20buy/categories/barware.jpg"     },
  { label: "Home Decor & Wall Art",          src: "/images/we%20buy/categories/decor.jpeg"      },
  { label: "Figurines & Decorative Objects", src: "/images/we%20buy/categories/Figurines.jpg"   },
  { label: "Pottery & Ceramics",             src: "/images/we%20buy/categories/pottery.jpg"     },
  { label: "Lighting",                       src: "/images/we%20buy/categories/Lighting.jpeg"   },
  { label: "Personal Items",                 src: "/images/we%20buy/categories/personal.jpg"    },
  { label: "Paper Goods",                    src: "/images/we%20buy/categories/paper.jpg"       },
  { label: "Vintage Clothing",               src: "/images/we%20buy/categories/clothing.jpg"    },
  { label: "Costume Jewelry",                src: "/images/we%20buy/categories/jewelry.jpg"     },
];

export default function WeBuyPhotoSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Step 1: detect mobile
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Step 2: set up auto-scroll AFTER re-render with 36 items in DOM
  useEffect(() => {
    if (!isMobile) return;

    const el = scrollRef.current;
    if (!el) return;

    let autoPosRef = 0;
    let resumeTimer: ReturnType<typeof setTimeout>;

    const startAutoScroll = () => {
      const sw = el.scrollWidth / 3;
      autoPosRef = el.scrollLeft;

      const step = () => {
        autoPosRef += 0.5;
        if (autoPosRef >= sw * 2) autoPosRef -= sw;
        if (autoPosRef < sw * 0.05) autoPosRef += sw;
        el.scrollTo(autoPosRef, 0);
        animRef.current = requestAnimationFrame(step);
      };
      animRef.current = requestAnimationFrame(step);
    };

    // Place scroll in the middle set so user can swipe backward too
    const sw = el.scrollWidth / 3;
    el.scrollTo(sw, 0);

    startAutoScroll();

    const onTouchStart = () => {
      clearTimeout(resumeTimer);
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };
    const onTouchEnd = () => {
      resumeTimer = setTimeout(startAutoScroll, 1500);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [isMobile]);

  // 3 sets on mobile for seamless loop; 1 set on desktop
  const items = isMobile
    ? [...WE_BUY_CATEGORIES, ...WE_BUY_CATEGORIES, ...WE_BUY_CATEGORIES]
    : WE_BUY_CATEGORIES;

  return (
    <section id="what-we-buy" className="py-10 md:py-20" style={{ backgroundColor: "#f6e6c9" }}>

      {/* Header + intro */}
      <div className="flex flex-col gap-4 px-10 md:px-16 max-w-5xl mx-auto mb-12">
        <h2 className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: "#1a0a0e" }}>
          What We Buy
        </h2>
        <p className="font-serif text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: "#3a2010" }}>
          We buy furniture first and foremost — at least 8–10 qualifying pieces to make a visit worthwhile. Beyond that, we&apos;re interested in everything that came with the house, including:
        </p>
      </div>

      {/* Scroll strip */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-scroll px-4 md:px-16 pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
      >
        {items.map(({ label, src }, i) => (
          <div
            key={`${label}-${i}`}
            className="flex-none relative group overflow-hidden select-none"
            style={{
              width: "280px",
              aspectRatio: "3/4",
              WebkitTouchCallout: "none",
            } as React.CSSProperties}
            onContextMenu={(e) => e.preventDefault()}
          >
            <Image
              src={src}
              alt={label}
              fill
              className="object-cover pointer-events-none"
              sizes="280px"
              draggable={false}
            />

            {/* Caption — always visible on mobile, hover-reveal on desktop */}
            <div className="absolute inset-x-0 bottom-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
              <p className="relative font-serif text-white text-base leading-snug px-5 pb-5 pt-16">
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
