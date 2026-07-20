import Image from "next/image";
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
      </div>

      {/* ── Footer ── */}
      <FadeIn>
        <Footer />
      </FadeIn>

    </main>
  );
}
