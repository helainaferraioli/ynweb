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
        className="flex flex-col md:flex-row"
        style={{ backgroundColor: "#f6e6c9", marginTop: "130px" }}
      >
        {/* Copy LEFT */}
        <div
          className="flex flex-col justify-center gap-6 px-14 py-8 md:w-1/2"
          style={{ animation: "fadeIn 1.2s ease forwards", opacity: 0, animationDelay: "0.2s" }}
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#971B2E" }}>
            We Buy Vintage
          </span>
          <h1 className="font-serif leading-tight" style={{ color: "#1a0a0e" }}>
            <span className="block text-3xl md:text-4xl">Got a home full of vintage furniture?</span>
            <em className="block text-2xl md:text-3xl mt-1" style={{ color: "#971B2E" }}>We&apos;ll take it off your hands.</em>
          </h1>
          <div className="flex flex-col gap-4 font-serif text-base md:text-lg leading-relaxed max-w-sm" style={{ color: "#3a2010" }}>
            <p>
              For over 25 years, we&apos;ve been buying pre-1980s vintage items directly from homes across Brooklyn, Queens, and Long Island.
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

        {/* Photo RIGHT */}
        <div className="relative md:w-1/2 min-h-[480px]">
          <Image
            src="/images/we%20buy/DadPhoto%20copy.jpeg"
            alt="JP Ferraioli"
            fill
            className="object-cover"
            style={{ objectPosition: "center top" }}
            priority
            sizes="50vw"
          />
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

      {/* ── Footer ── */}
      <FadeIn>
        <Footer />
      </FadeIn>

    </main>
  );
}
