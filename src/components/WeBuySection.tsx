import Image from "next/image";
import Link from "next/link";

export default function WeBuySection() {
  return (
    <section className="flex flex-col md:flex-row min-h-[560px]">
      <div
        className="flex flex-col justify-center gap-6 px-14 py-16 md:w-1/2"
        style={{ backgroundColor: "#f6e6c9" }}
      >
        <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#971B2E" }}>
          Estate &amp; Home Sourcing
        </span>
        <h2 className="font-serif text-4xl md:text-5xl leading-none" style={{ color: "#1a0a0e" }}>
          We do the<br />heavy lifting.
        </h2>
        <div className="flex flex-col gap-4 font-serif text-base md:text-lg leading-relaxed max-w-md" style={{ color: "#3a2010" }}>
          <p>
            Got a home full of things you&apos;re ready to part with? We buy directly
            from estates, apartments, and houses across Brooklyn, Queens, and Long Island.
          </p>
          <p>
            Free assessment. Fair prices. We handle everything.
          </p>
        </div>
        <div>
          <Link
            href="/we-buy"
            className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase px-7 py-3 text-white hover:opacity-85 transition-opacity"
            style={{ backgroundColor: "#971B2E" }}
          >
            Get in Touch <span>→</span>
          </Link>
        </div>
      </div>
      <div className="relative md:w-1/2 min-h-[420px]">
        <Image
          src="/dad-in-trunk.jpg"
          alt="JP Ferraioli in the truck"
          fill
          className="object-cover"
          style={{ objectPosition: "center center" }}
        />
      </div>
    </section>
  );
}
