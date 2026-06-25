import Image from "next/image";

const WE_BUY_CATEGORIES = [
  { label: "Furniture",                      src: "/images/we%20buy/categories/Furniture.jpeg"  },
  { label: "Kitchen & Cookware",             src: "/images/we%20buy/categories/kitchen.JPG"     },
  { label: "Dishes",                           src: "/images/we%20buy/categories/dishes.JPEG"     },
  { label: "Barware",                          src: "/images/we%20buy/categories/barware.jpg"     },
  { label: "Home Decor & Wall Art",          src: "/images/we%20buy/categories/decor.jpeg"      },
  { label: "Figurines & Decorative Objects", src: "/images/we%20buy/categories/Figurines.jpg"   },
  { label: "Pottery & Ceramics",             src: "/images/we%20buy/categories/pottery.jpg"     },
  { label: "Lighting",                        src: "/images/we%20buy/categories/lighting.jpeg"   },
  { label: "Personal Items",                 src: "/images/we%20buy/categories/personal.jpg"    },
  { label: "Paper Goods",                    src: "/images/we%20buy/categories/paper.jpg"       },
  { label: "Vintage Clothing",               src: "/images/we%20buy/categories/clothing.jpg"    },
  { label: "Costume Jewelry",                src: "/images/we%20buy/categories/jewelry.jpg"     },
];

export default function WeBuyPhotoSection() {
  return (
    <section id="what-we-buy" className="py-20" style={{ backgroundColor: "#f6e6c9" }}>

      {/* Label + intro */}
      <div className="flex flex-col gap-4 px-10 md:px-16 max-w-5xl mx-auto mb-12">
        <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#971B2E" }}>
          What We Buy
        </span>
        <p className="font-serif text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: "#3a2010" }}>
          Furniture is our anchor — we need at least 8–10 qualifying pieces to make a visit worthwhile. Beyond that, we&apos;re interested in everything that came with the house.
        </p>
      </div>

      {/* Horizontal scroll strip */}
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
            <Image
              src={src}
              alt={label}
              fill
              className="object-cover"
              sizes="280px"
            />

            {/* Lower-third overlay — visible on hover */}
            <div
              className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
              <p
                className="relative font-serif text-white text-base leading-snug px-5 pb-5 pt-16"
              >
                {label}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
