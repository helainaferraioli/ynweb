"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-8 left-0 right-0 z-50 flex items-center px-10 py-4"
      style={{
        backgroundColor: scrolled ? "#971B2E" : "transparent",
        transition: "background-color 0.4s ease",
      }}
    >
      {/* Left — equal flex-1 to mirror right side */}
      <div className="flex-1 flex items-center gap-8">
        <Link href="/about" className="text-white text-sm font-bold tracking-widest uppercase hover:opacity-70 transition-opacity">About</Link>
        <Link href="/shop" className="text-white text-sm font-bold tracking-widest uppercase hover:opacity-70 transition-opacity">Shop</Link>
        <Link href="/we-buy" className="text-white text-sm font-bold tracking-widest uppercase hover:opacity-70 transition-opacity">We Buy</Link>
      </div>

      {/* Center — logo always exactly centered */}
      <Link href="/">
        <Image src="/yn-main.png" alt="Yesterday's News" width={180} height={68} priority />
      </Link>

      {/* Right — equal flex-1, content pushed to end */}
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
  );
}
