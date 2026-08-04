import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Yesterday's News — Vintage & Antique Shop, Brooklyn",
  description: "Brooklyn's beloved vintage and antique shop, open for 25 years at 428 Court Street in Carroll Gardens. Furniture, housewares, jewelry, clothing, and more.",
};
import WeBuySection from "@/components/WeBuySection";
import AboutSection from "@/components/AboutSection";
import PressSection from "@/components/PressSection";
import InstagramFeed from "@/components/InstagramFeed";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-0">

      {/* ── Hero ── */}
      <div className="relative w-full h-[75vh] md:h-screen">
        <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover object-[65%_90%] md:object-center">
          <source src="/home-page-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/15" />
        <div
          className="absolute bottom-14 left-10"
          style={{ animation: "fadeIn 1.4s ease forwards", opacity: 0, animationDelay: "0.4s" }}
        >
          <p
            className="text-white text-3xl md:text-5xl font-serif font-bold leading-none"
            style={{ textShadow: "0 4px 24px rgba(0,0,0,0.5), 0 1px 6px rgba(0,0,0,0.35)" }}
          >
            Brooklyn&apos;s one-stop<br />vintage shop since 2001.
          </p>
        </div>
      </div>

      {/* ── Cream divider ── */}
      <div className="hidden md:block" style={{ backgroundColor: "#f6e6c9", height: "48px" }} />

      {/* ── Our Story ── */}
      <AboutSection />

      {/* ── Ticker ── */}
      <Ticker />

      {/* ── Instagram feed ── */}
      <FadeIn>
        <InstagramFeed />
      </FadeIn>

      {/* ── We Buy ── */}
      <div className="hidden md:block" style={{ backgroundColor: "#f6e6c9", height: "48px" }} />
      <FadeIn>
        <WeBuySection />
      </FadeIn>

      {/* ── Press ── */}
      <PressSection />

      {/* ── Footer ── */}
      <FadeIn>
        <Footer />
      </FadeIn>

    </main>
  );
}
