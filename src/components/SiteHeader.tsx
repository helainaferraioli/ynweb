"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const aboutLinks = [
  { label: "A Brooklyn Story", href: "/about#brooklyn-story" },
  { label: "Our Family",       href: "/about#our-family" },
  { label: "The Shop",         href: "/about#the-shop" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on any page navigation
  useEffect(() => {
    setAboutOpen(false);
  }, [pathname]);

  const hidden = scrolled;

  return (
    <>
    {/* YN monogram — appears in corner while scrolled */}
    <Link
      href="/"
      className="fixed top-4 left-6 z-50 transition-all duration-400"
      style={{
        opacity: scrolled ? 1 : 0,
        pointerEvents: scrolled ? "auto" : "none",
        transition: "opacity 0.4s ease",
      }}
    >
      <Image src="/yn-short.png" alt="Yesterday's News" width={44} height={44} priority />
    </Link>

    <div
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? "none" : "auto",
        transition: "opacity 0.4s ease",
      }}
    >
      {/* Announcement stripe */}
      <div className="flex items-center justify-center py-3 px-4" style={{ backgroundColor: "#f6e6c9" }}>
        <p className="text-black text-xs font-medium tracking-wide text-center">
          Visit us Tues–Fri 10am–5:45pm &nbsp;//&nbsp; Sat &amp; Sun 9:30am–5:30pm
        </p>
      </div>

      {/* Nav */}
      <nav className="flex items-center px-10 py-4" style={{ backgroundColor: "#971B2E" }}>

        {/* Left */}
        <div className="flex-1 flex items-center gap-8">

          {/* About with dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <Link href="/about" className="text-white text-sm font-bold tracking-widest uppercase hover:opacity-70 transition-opacity hover:underline underline-offset-4">
              About
            </Link>

            <div
              className="absolute top-full left-0 pt-5 pb-7 px-8 min-w-[240px]"
              style={{
                backgroundColor: "#971B2E",
                opacity: aboutOpen ? 1 : 0,
                transform: aboutOpen ? "translateY(0)" : "translateY(-4px)",
                pointerEvents: aboutOpen ? "auto" : "none",
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
            >
              <nav className="flex flex-col gap-5">
                {aboutLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-white text-sm font-bold tracking-widest uppercase hover:opacity-60 transition-opacity"
                    onClick={() => setAboutOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          <Link href="/shop" className="text-white text-sm font-bold tracking-widest uppercase hover:opacity-70 transition-opacity">Shop</Link>
          <Link href="/we-buy" className="text-white text-sm font-bold tracking-widests uppercase hover:opacity-70 transition-opacity">We Buy</Link>
        </div>

        {/* Center */}
        <Link href="/">
          <Image src="/yn-main.png" alt="Yesterday's News" width={180} height={68} priority />
        </Link>

        {/* Right */}
        <div className="flex-1 flex justify-end">
          <Link
            href="/contact"
            className="text-sm font-bold tracking-widest uppercase px-6 py-2 border-2 transition-colors hover:bg-[#FFB81C] hover:border-[#FFB81C] hover:text-black"
            style={{ color: "#FFB81C", borderColor: "#FFB81C" }}
          >
            Contact
          </Link>
        </div>
      </nav>
    </div>
    </>
  );
}
