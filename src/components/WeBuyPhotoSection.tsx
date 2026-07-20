"use client";

import Image from "next/image";
import { useRef, useEffect } from "react";

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

// Two sets for seamless loop — when autoPos reaches setWidth, jump to 0 (same content)
const ALL_ITEMS = [...WE_BUY_CATEGORIES, ...WE_BUY_CATEGORIES];

export default function WeBuyPhotoSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (window.innerWidth >= 768) return;

    const el = scrollRef.current;
    if (!el) return;

    let autoPos = 0;
    let resumeTimer: ReturnType<typeof setTimeout>;

    const startAutoScroll = () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      const setWidth = el.scrollWidth / 2;

      const step = () => {
        autoPos += 0.5;
        if (autoPos >= setWidth) autoPos = 0; // seamless: set 2 = set 1
        el.scrollTo(autoPos, 0);
        animRef.current = requestAnimationFrame(step);
      };
      animRef.current = requestAnimationFrame(step);
    };

    const stopAutoScroll = () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
        animRef.current = null;
      }
    };

    // Only start scrolling when the strip enters the viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reset to Furniture every time the section comes into view
          autoPos = 0;
          el.scrollTo(0, 0);
          startAutoScroll();
        } else {
          stopAutoScroll();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    const onTouchStart = () => {
      clearTimeout(resumeTimer);
      stopAutoScroll();
    };
    const onTouchEnd = () => {
      resumeTimer = setTimeout(startAutoScroll, 1500);
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      observer.disconnect();
      stopAutoScroll();
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

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
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-scroll px-4 md:px-16 pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {ALL_ITEMS.map(({ label, src }, i) => (
            <div
              key={i}
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
              {/* Caption — always visible on mobile, hover on desktop */}
              <div className="absolute inset-x-0 bottom-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                <p className="relative font-serif text-white text-base leading-snug px-5 pb-5 pt-16">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile scroll hint */}
        <div className="absolute right-0 top-0 bottom-2 md:hidden pointer-events-none flex items-center">
          <div
            className="h-full w-16 flex items-center justify-end pr-3"
            style={{ background: "linear-gradient(to right, transparent, #f6e6c9 70%)" }}
          >
            <span
              className="font-serif text-2xl font-bold"
              style={{ color: "#971B2E", animation: "nudge-right 1s ease-in-out infinite" }}
            >
              ›
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}
