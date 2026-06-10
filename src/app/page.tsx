import Image from "next/image";
import WeBuySection from "@/components/WeBuySection";
import AboutSection from "@/components/AboutSection";
import PressSection from "@/components/PressSection";
import InstagramFeed from "@/components/InstagramFeed";
import Ticker from "@/components/Ticker";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">

      {/* ── Hero ── */}
      <div className="relative w-full h-screen">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/home-video.mov" type="video/mp4" />
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
      <div style={{ backgroundColor: "#f6e6c9", height: "48px" }} />

      {/* ── Our Story ── */}
      <FadeIn>
        <AboutSection />
      </FadeIn>

      {/* ── Ticker ── */}
      <Ticker />

      {/* ── Instagram feed ── */}
      <FadeIn>
        <InstagramFeed />
      </FadeIn>

      {/* ── We Buy ── */}
      <div style={{ backgroundColor: "#f6e6c9", height: "48px" }} />
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
