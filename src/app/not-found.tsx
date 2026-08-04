import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <main className="flex flex-col min-h-screen">
      <section
        className="flex flex-col items-center justify-center text-center gap-8 flex-1 px-10"
        style={{ backgroundColor: "#f6e6c9", marginTop: "130px", paddingTop: "4rem", paddingBottom: "5rem" }}
      >
        <Image
          src="/illustration-newspaperbox.svg"
          alt=""
          width={120}
          height={120}
          style={{ opacity: 0.6 }}
        />
        <div className="flex flex-col gap-3 max-w-sm">
          <p className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#971B2E" }}>
            404
          </p>
          <h1 className="font-serif text-3xl md:text-5xl leading-tight" style={{ color: "#1a0a0e" }}>
            This page has gone out of print.
          </h1>
          <p className="font-serif text-base leading-relaxed" style={{ color: "#3a2010" }}>
            Whatever you were looking for has found a new home — or never existed to begin with.
          </p>
        </div>
        <Link
          href="/"
          className="font-serif text-sm font-bold tracking-widest uppercase px-8 py-3 text-white transition-opacity hover:opacity-85"
          style={{ backgroundColor: "#971B2E" }}
        >
          Back to the shop
        </Link>
      </section>

      <Footer />
    </main>
  );
}
