"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ScrollBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed left-0 right-0 z-50 flex items-center justify-center px-10 py-3"
      style={{
        top: 131,
        backgroundColor: "#971B2E",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.4s ease",
      }}
    >
      <Link href="/">
        <Image src="/yn-main.png" alt="Yesterday's News" width={160} height={60} priority />
      </Link>
    </div>
  );
}
