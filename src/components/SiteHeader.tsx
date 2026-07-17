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

const mobileLinks = [
  { label: "About",   href: "/about" },
  { label: "Shop",    href: "/shop" },
  { label: "We Buy",  href: "/we-buy" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setAboutOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  if (pathname.startsWith("/studio")) return null;

  const hidden = scrolled && !menuOpen;

  return (
    <>
      {/* YN monogram — appears while scrolled on desktop */}
      <Link
        href="/"
        className="fixed top-4 left-6 z-50 hidden md:block transition-all duration-400"
        style={{
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      >
        <Image src="/yn-short.png" alt="Yesterday's News" width={44} height={44} priority />
      </Link>

      {/* Mobile fullscreen menu */}
      <div
        className="fixed inset-0 z-50 flex flex-col md:hidden"
        style={{
          backgroundColor: "#971B2E",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-6 py-5">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image src="/yn-main.png" alt="Yesterday's News" width={140} height={52} priority />
          </Link>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-8 px-6 pt-12">
          {mobileLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-serif text-4xl leading-none hover:opacity-70 transition-opacity"
              style={{ color: "#FFB81C" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Bottom info */}
        <div className="mt-auto px-6 pb-12">
          <p className="text-sm leading-relaxed" style={{ color: "#FFCCCC" }}>
            428 Court Street, Brooklyn<br />
            Tue–Fri 10am–5:45pm · Sat–Sun 9:30am–5:30pm
          </p>
        </div>
      </div>

      {/* Header bar */}
      <div
        className="fixed top-0 left-0 right-0 z-40"
        style={{
          opacity: hidden ? 0 : 1,
          pointerEvents: hidden ? "none" : "auto",
          transition: "opacity 0.4s ease",
        }}
      >
        {/* Announcement stripe */}
        <div className="flex items-center justify-center py-3 px-4" style={{ backgroundColor: "#f6e6c9" }}>
          <p className="text-black text-xs font-medium tracking-normal md:tracking-wide text-center">
            <span className="md:hidden">Tues–Fri 10am–5:45pm &nbsp;//&nbsp; Weekend 9:30am–5:30pm</span>
            <span className="hidden md:inline">Visit us Tues–Fri 10am–5:45pm &nbsp;//&nbsp; Sat &amp; Sun 9:30am–5:30pm</span>
          </p>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center px-10 py-4" style={{ backgroundColor: "#971B2E" }}>
          <div className="flex-1 flex items-center gap-8">
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
            <Link href="/shop" className="text-white text-sm font-bold tracking-widests uppercase hover:opacity-70 transition-opacity">Shop</Link>
            <Link href="/we-buy" className="text-white text-sm font-bold tracking-widests uppercase hover:opacity-70 transition-opacity">We Buy</Link>
          </div>
          <Link href="/">
            <Image src="/yn-main.png" alt="Yesterday's News" width={180} height={68} priority />
          </Link>
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

        {/* Mobile nav bar */}
        <div className="flex md:hidden items-center justify-between px-6 py-4" style={{ backgroundColor: "#971B2E" }}>
          <Link href="/">
            <Image src="/yn-main.png" alt="Yesterday's News" width={120} height={45} priority />
          </Link>
          <button onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
