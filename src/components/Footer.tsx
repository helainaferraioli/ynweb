"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer style={{ backgroundColor: "#971B2E" }} className="px-14 py-16">
      <div className="flex flex-col md:flex-row gap-16 justify-between max-w-7xl mx-auto">

        {/* Left — logo + nav links */}
        <div className="flex flex-col gap-10">
          <Image src="/yn-main.png" alt="Yesterday's News" width={180} height={68} />
          <div className="flex gap-14">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#FFB81C" }}>
                Social
              </span>
              <a
                href="https://instagram.com/yesterdaysnewsbk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: "#FFCCCC" }}
              >
                Instagram
              </a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#FFB81C" }}>
                Yesterday&apos;s News
              </span>
              {[
                { label: "About", href: "/about" },
                { label: "Shop", href: "/shop" },
                { label: "We Buy", href: "/we-buy" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-sm hover:opacity-70 transition-opacity" style={{ color: "#FFCCCC" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Center — seal + copyright */}
        <div className="flex flex-col items-center justify-end gap-4">
          <Image src="/yn-short.png" alt="YN" width={80} height={80} />
          <p className="text-xs tracking-widest uppercase text-center" style={{ color: "#FFCCCC" }}>
            © Yesterday&apos;s News 2026. All Rights Reserved.
          </p>
        </div>

        {/* Right — subscribe */}
        <div className="flex flex-col gap-5 md:max-w-sm w-full">
          <h3 className="font-serif font-bold text-3xl" style={{ color: "#FFB81C" }}>
            Subscribe
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#FFCCCC" }}>
            Sign up with your email address to receive news and updates.
          </p>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 bg-white text-gray-800 text-sm outline-none placeholder-gray-400 w-full"
          />
          <button
            className="py-3 font-bold text-sm tracking-widest uppercase hover:opacity-90 transition-opacity w-full"
            style={{ backgroundColor: "#FFB81C", color: "#1A0A0E" }}
          >
            Sign Up
          </button>
          <p className="text-xs" style={{ color: "#FFCCCC99" }}>
            We respect your privacy.
          </p>
        </div>

      </div>
    </footer>
  );
}
