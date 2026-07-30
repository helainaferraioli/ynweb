import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Shop",
  description: "Shop vintage furniture, housewares, jewelry, and more from Yesterday's News in Carroll Gardens, Brooklyn.",
};

export default function Shop() {
  return (
    <main className="flex flex-col">

      <FadeIn>
        <section
          className="flex flex-col items-center justify-center text-center gap-8 px-10"
          style={{ backgroundColor: "#f6e6c9", marginTop: "130px", paddingTop: "5rem", paddingBottom: "6rem" }}
        >
          <Image src="/Dice.png" alt="" width={140} height={140} style={{ height: "auto" }} />
          <div className="flex flex-col gap-3 max-w-sm">
            <h1 className="font-serif text-3xl md:text-5xl leading-tight md:whitespace-nowrap" style={{ color: "#1a0a0e" }}>
              New items dropping soon.
            </h1>
            <p className="font-serif text-base leading-relaxed" style={{ color: "#3a2010" }}>
              We&apos;re curating our first online drop. Follow us on Instagram to be the first to know when it goes live.
            </p>
          </div>
          <a
            href="https://instagram.com/yesterdaysnewsbk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold tracking-widest uppercase px-8 py-3 text-white transition-opacity hover:opacity-85"
            style={{ backgroundColor: "#971B2E" }}
          >
            Follow @yesterdaysnewsbk
          </a>
        </section>
      </FadeIn>

      <FadeIn>
        <Footer />
      </FadeIn>

    </main>
  );
}
