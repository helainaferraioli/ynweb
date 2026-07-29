import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "We Buy",
  description: "Selling vintage furniture or household items? Yesterday's News buys estates, collections, and more. Tell us what you have and we'll come to you.",
};
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import CallTextButton from "@/components/CallTextButton";
import WeBuyQualify from "@/components/WeBuyQualify";
import WeBuyPhotoSection from "@/components/WeBuyPhotoSection";
import WeBuyExclusions from "@/components/WeBuyExclusions";
import WeBuyContactForm from "@/components/WeBuyContactForm";

export default function WeBuy() {
  return (
    <main className="flex flex-col">

      {/* ── Hero ── */}
      <section
        className="flex flex-col md:flex-row mt-[100px] md:mt-[130px]"
        style={{ backgroundColor: "#f6e6c9" }}
      >
        {/* Photo — first on mobile, right column on desktop */}
        <div className="relative order-first md:order-last md:w-1/2 min-h-[65vw] md:min-h-[480px]">
          <Image
            src="/images/we%20buy/DadPhoto%20copy.jpeg"
            alt="JP Ferraioli"
            fill
            className="object-cover"
            style={{ objectPosition: "center top" }}
            priority
            sizes="50vw"
          />
          {/* Bottom vignette — mobile only */}
          <div
            className="absolute inset-x-0 bottom-0 h-2/3 md:hidden pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 100%)" }}
          />
          {/* H1 pinned to bottom of photo — mobile only */}
          <div className="absolute inset-x-0 bottom-0 px-6 pb-6 z-10 md:hidden">
            <h1 className="font-serif leading-tight">
              <span className="block text-3xl text-white">Got a home full of vintage furniture?</span>
              <em className="block text-2xl mt-1" style={{ color: "#FFB81C" }}>We&apos;ll take it off your hands.</em>
            </h1>
          </div>
        </div>

        {/* Copy — cream background below photo on mobile, left column on desktop */}
        <div
          className="order-last md:order-first flex flex-col justify-center gap-6 px-6 md:px-14 py-8 md:w-1/2"
          style={{ animation: "fadeIn 1.2s ease forwards", opacity: 0, animationDelay: "0.2s" }}
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#971B2E" }}>
            We Buy Vintage
          </span>
          {/* H1 — desktop only */}
          <h1 className="hidden md:block font-serif leading-tight" style={{ color: "#1a0a0e" }}>
            <span className="block text-4xl">Got a home full of vintage furniture?</span>
            <em className="block text-3xl mt-1" style={{ color: "#971B2E" }}>We&apos;ll take it off your hands.</em>
          </h1>
          <div className="flex flex-col gap-4 font-serif text-base md:text-lg leading-relaxed max-w-sm" style={{ color: "#3a2010" }}>
            <p>
              For over 25 years, JP has been buying pre-1980s vintage items directly from homes across Brooklyn, Queens, and Long Island. We come to you, buy on the spot, and take everything the same day.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 mt-1">
            <a
              href="#qualify"
              className="font-serif text-base px-7 py-3 border-2 transition-colors duration-200 hover:bg-[#971B2E] hover:text-white"
              style={{ color: "#971B2E", borderColor: "#971B2E" }}
            >
              Do I qualify? <strong>↓</strong>
            </a>
            <CallTextButton />
          </div>
        </div>
      </section>

      {/* ── Is This a Good Fit? ── */}
      <FadeIn>
        <WeBuyQualify />
      </FadeIn>

      {/* ── What We Buy ── */}
      <FadeIn>
        <WeBuyPhotoSection />
      </FadeIn>

      {/* ── What We Don't Buy ── */}
      <FadeIn>
        <WeBuyExclusions />
      </FadeIn>

      {/* ── Contact Form ── */}
      <FadeIn>
        <WeBuyContactForm />
      </FadeIn>

      {/* ── Bottom photo — mobile only ── */}
      <div className="relative md:hidden w-full" style={{ height: "90vw" }}>
        <Image
          src="/images/we%20buy/Checklist%20photo.jpg"
          alt="JP Ferraioli at work"
          fill
          className="object-cover"
          style={{ objectPosition: "center 20%" }}
          sizes="100vw"
        />
        {/* Bottom vignette */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)" }}
        />
        {/* Overlay text + buttons */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-8 z-10 flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-white">Prefer to Talk?</span>
            <p className="font-serif text-xl text-white leading-snug">Call or text us directly.</p>
          </div>
          <div className="flex gap-4">
            <a
              href="tel:9173751361"
              aria-label="Call us"
              className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8a19.79 19.79 0 01-3.07-8.63A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
            </a>
            <a
              href="sms:9173751361"
              aria-label="Text us"
              className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
              </svg>
            </a>
            <a
              href="mailto:yesterdaysnews1@gmail.com"
              aria-label="Email us"
              className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <FadeIn>
        <Footer />
      </FadeIn>

    </main>
  );
}
