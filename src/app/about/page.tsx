import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "The story of Yesterday's News — founded by JP Ferraioli in Carroll Gardens, Brooklyn, and family-run for over 25 years.",
};
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import AboutTeamSection from "@/components/AboutTeamSection";
import AboutSlideshow from "@/components/AboutSlideshow";
import JPSlideshow from "@/components/JPSlideshow";
import InstagramFeed from "@/components/InstagramFeed";

export default function About() {
  return (
    <main className="flex flex-col">

      {/* ── Hero ── */}
      <section id="brooklyn-story" className="relative w-full aspect-[16/9] mt-[100px] md:mt-0 md:h-[72vh] md:aspect-auto overflow-hidden">
        <Image
          src="/images/Hero%20Image.webp"
          alt="Yesterday's News"
          fill
          className="object-cover scale-125 md:scale-100"
          style={{ objectPosition: "center 10%" }}
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center md:pt-[120px]">
          <h1
            className="font-serif text-2xl md:text-7xl text-white text-center"
            style={{
              animation: "fadeIn 1.4s ease forwards",
              opacity: 0,
              animationDelay: "0.3s",
              textShadow: "0 2px 30px rgba(0,0,0,0.55)",
            }}
          >
            A Brooklyn Story
          </h1>
        </div>
      </section>

      {/* ── Intro ── */}
      <FadeIn>
        <section className="py-10 md:py-20 px-10" style={{ backgroundColor: "#f6e6c9" }}>
          <p
            className="font-serif text-sm md:text-xl leading-relaxed max-w-2xl mx-auto text-center"
            style={{ color: "#3a2010" }}
          >
            Yesterday&apos;s News is a family-owned and operated vintage shop, now entering our
            25th year as one of NYC&apos;s longest-standing stores of its kind. Our story begins
            right here in Carroll Gardens. Surrounded by an ever-evolving city and enthralled
            with the treasures of the past, my dad started collecting at just ten years old.
          </p>
        </section>
      </FadeIn>

      {/* ── JP Story ── */}
      <FadeIn>
        <section className="flex flex-col lg:flex-row">

          {/* Text LEFT on red */}
          <div
            className="flex flex-col lg:justify-center lg:gap-5 lg:px-10 lg:py-20 lg:w-[55%]"
            style={{ backgroundColor: "#971B2E" }}
          >
            {/* Label + heading */}
            <div className="flex flex-col gap-5 px-10 pt-10 pb-4 lg:p-0">
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#FFB81C" }}>
                It Started in Brooklyn
              </span>
              <h2 className="font-serif text-4xl lg:text-5xl leading-tight text-white">
                Meet my Dad, JP
              </h2>
            </div>
            {/* Slideshow — full width below heading on mobile/tablet */}
            <div className="relative lg:hidden" style={{ height: "260px" }}>
              <JPSlideshow />
            </div>
            {/* Paragraphs */}
            <div
              className="flex flex-col gap-5 font-serif text-base lg:text-lg leading-relaxed max-w-lg px-10 py-8 lg:p-0"
              style={{ color: "#FFCCCC" }}
            >
              <p>
                In the 1970s, Carroll Gardens looked a little different. My dad, JP Ferraioli,
                grew up in a working-class Italian-American neighborhood, on President Street,
                where the streets were his playground, and a diverse array of family-run mom
                and pop shops acted as the backdrop to his earliest memories.
              </p>
              <p>
                Then, at the age of 10, his grandmother gave him his first taste of vintage: a
                1940s Coca-Cola tray she&apos;d inherited from her brother, Tony.
              </p>
              <p>
                From that day on, his appetite for collecting never ceased. Eventually, this
                passion drove him to open a shop of his own in the neighborhood where it all began.
              </p>
            </div>
          </div>

          {/* Photo slideshow RIGHT — desktop only */}
          <div className="relative hidden lg:block lg:w-[45%]" style={{ minHeight: "333px" }}>
            <JPSlideshow />
          </div>
        </section>
      </FadeIn>

      {/* ── The Shop ── */}
      <FadeIn>
        <section id="the-shop" className="flex flex-col md:flex-row" style={{ minHeight: "680px" }}>

          {/* Slideshow LEFT */}
          <div className="relative overflow-hidden md:w-1/2" style={{ minHeight: "680px", backgroundColor: "#f6e6c9" }}>
            <AboutSlideshow />
          </div>

          {/* Text RIGHT on cream */}
          <div
            className="flex flex-col justify-center gap-6 px-14 py-16 md:w-1/2"
            style={{ backgroundColor: "#f6e6c9" }}
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#971B2E" }}>
              Brooklyn&apos;s Vintage Destination
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: "#1a0a0e" }}>
              The Shop
            </h2>
            <div
              className="flex flex-col gap-5 font-serif text-base md:text-lg leading-relaxed max-w-sm"
              style={{ color: "#3a2010" }}
            >
              <p>
                Step inside Yesterday&apos;s News and you&apos;ll find yourself somewhere between a treasure hunt and a time capsule
                — where the past is always turning up something new. We&apos;re constantly bringing in new
                inventory, and we carry vintage and antique furniture, home decor, lighting, art, ephemera,
                photos, clothing, jewelry, and much more. Stop by and see for yourself.
              </p>
              <p>
                Every item in our shop is authentically vintage, sourced by hand from homes
                across Brooklyn, Queens, and Long Island.
              </p>
              <p>
                Looking to sell?{" "}
                <Link
                  href="/we-buy"
                  className="font-bold underline underline-offset-4 hover:opacity-70 transition-opacity"
                  style={{ color: "#971B2E" }}
                >
                  Contact us here
                </Link>
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── Our Family ── */}
      <FadeIn>
        <section id="our-family" className="flex flex-col" style={{ backgroundColor: "#971B2E" }}>

          {/* Intro text */}
          <div className="flex flex-col gap-6 px-8 md:px-14 pt-16 pb-8 max-w-2xl">
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#FFB81C" }}>
              The Ferraioli Family
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-white">
              Meet our Family
            </h2>
            <p className="font-serif text-base md:text-lg leading-relaxed" style={{ color: "#FFCCCC" }}>
              Today, the shop is still entirely family-owned and operated — same neighborhood,
              same faces, just a new generation behind the counter.
            </p>
          </div>

          {/* Team photos */}
          <AboutTeamSection backgroundColor="#971B2E" />
        </section>
      </FadeIn>

      {/* ── See What's New + Instagram ── */}
      <div style={{ backgroundColor: "#000000" }}>
        <FadeIn>
          <section
            className="flex flex-col md:flex-row md:items-start md:justify-between pt-12 pb-6 px-4 md:px-14 mb-6 md:mb-10 gap-2 md:gap-0"
            style={{ backgroundColor: "#000000" }}
          >
            <h2
              className="font-serif italic text-4xl md:text-6xl leading-none"
              style={{ color: "#f6e6c9" }}
            >
              See what&apos;s new.
            </h2>
            <p
              className="font-serif text-sm md:text-base leading-relaxed whitespace-nowrap md:text-right"
              style={{ color: "#f6e6c9" }}
            >
              Keep up with our latest finds on Instagram ↓
            </p>
          </section>
          <InstagramFeed hideHeader dark />
        </FadeIn>
      </div>

      {/* ── Footer ── */}
      <FadeIn>
        <Footer />
      </FadeIn>

    </main>
  );
}
