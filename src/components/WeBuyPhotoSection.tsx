"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

function PhotoTile({ label, src }: { label: string; src: string }) {
  return (
    <div
      className="flex-none relative group overflow-hidden"
      style={{ width: "280px", aspectRatio: "3/4" }}
    >
      <Image src={src} alt={label} fill className="object-cover" sizes="280px" />
      <div className="absolute inset-x-0 bottom-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <p className="relative font-serif text-white text-base leading-snug px-5 pb-5 pt-16">
          {label}
        </p>
      </div>
    </div>
  );
}

export default function WeBuyPhotoSection() {
  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
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

      {isMobile ? (
        /* CSS marquee — reliable on iOS Safari */
        <div
          className="overflow-hidden"
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setTimeout(() => setPaused(false), 2000)}
        >
          <div
            className="flex gap-3"
            style={{
              width: "max-content",
              animation: "marquee-scroll 50s linear infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {[...WE_BUY_CATEGORIES, ...WE_BUY_CATEGORIES].map(({ label, src }, i) => (
              <PhotoTile key={`${label}-${i}`} label={label} src={src} />
            ))}
          </div>
        </div>
      ) : (
        /* Normal horizontal scroll for desktop */
        <div
          className="flex gap-3 overflow-x-scroll px-10 md:px-16 pb-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" } as React.CSSProperties}
        >
          {WE_BUY_CATEGORIES.map(({ label, src }) => (
            <div
              key={label}
              className="flex-none relative group overflow-hidden"
              style={{ width: "280px", aspectRatio: "3/4" }}
            >
              <Image src={src} alt={label} fill className="object-cover" sizes="280px" />
              <div className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                <p className="relative font-serif text-white text-base leading-snug px-5 pb-5 pt-16">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}
