import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Yesterday's News.",
};

export default function FAQ() {
  return (
    <main className="flex flex-col">

      {/* ── Hero ── */}
      <FadeIn>
        <section
          className="relative flex items-center justify-center mt-[100px] md:mt-[130px] overflow-hidden"
          style={{ height: "260px", backgroundColor: "#1a0a0e" }}
        >
          <Image
            src="/images/faq/faq%20header.jpg"
            alt="Court Street sign outside Yesterday's News"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 38%" }}
            sizes="100vw"
          />
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(0,0,0,0.55)" }} />
          <h1 className="relative font-serif text-4xl md:text-5xl text-white leading-tight">
            FAQ
          </h1>
        </section>
      </FadeIn>

      {/* ── Questions ── */}
      <FadeIn>
        <section
          className="px-6 md:px-20 py-16 md:py-20 max-w-3xl mx-auto w-full"
          style={{ backgroundColor: "#f6e6c9" }}
        >
          <FAQAccordion />
        </section>
      </FadeIn>

      <Footer />
    </main>
  );
}
