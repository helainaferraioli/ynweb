import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <>
      {/* ── Hero ── */}
      <div className="relative w-full" style={{ height: "90vh" }}>
        <Image
          src="/about-hero.jpg"
          alt="Court Street, Carroll Gardens"
          fill
          className="object-cover"
          style={{ objectPosition: "70% 37%" }}
          priority
        />
        {/* subtle overlay so text pops */}
        <div className="absolute inset-0 bg-black/25" />

        {/* "A Brooklyn Story" centered over photo */}
        <div className="absolute inset-0 flex items-center justify-center pt-20">
          <h1
            className="font-serif text-5xl md:text-7xl text-white text-center drop-shadow-lg"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
          >
            A Brooklyn Story
          </h1>
        </div>
      </div>

      {/* ── Intro paragraph ── */}
      <section className="py-20 px-10" style={{ backgroundColor: "#f6e6c9" }}>
        <p className="font-serif text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-center" style={{ color: "#3a2010" }}>
          Yesterday&apos;s News is one of Brooklyn&apos;s most beloved antiques and collectibles shops — a place where every object has a past, every shelf tells a story, and every visit turns up something you didn&apos;t know you needed.
        </p>
      </section>

      <Footer />
    </>
  );
}
