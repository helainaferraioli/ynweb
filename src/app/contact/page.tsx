import Image from "next/image";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import ContactForm from "@/components/ContactForm";

const MAP_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const MAP_SRC = `https://www.google.com/maps/embed/v1/place?key=${MAP_KEY}&q=428+Court+Street,Brooklyn,NY&zoom=15`;

export default function Contact() {
  return (
    <main className="flex flex-col">

      {/* ── Hero ── */}
      <section
        className="flex flex-col md:flex-row mt-[100px] md:mt-[130px]"
        style={{ backgroundColor: "#f6e6c9" }}
      >
        {/* Photo — first on mobile, right on desktop */}
        <div className="relative order-first md:order-last md:w-1/2 min-h-[65vw] md:min-h-[320px]">
          <Image
            src="/images/contact/Map%20texture%20copy.jpeg"
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {/* Bottom vignette — mobile only */}
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 md:hidden pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)" }}
          />
          {/* H1 overlaid at bottom — mobile only */}
          <div className="absolute inset-x-0 bottom-0 px-6 pb-6 z-10 md:hidden">
            <h1 className="font-serif text-3xl text-white leading-tight">Contact Us</h1>
          </div>
        </div>

        {/* Copy — below photo on mobile, left on desktop */}
        <div
          className="order-last md:order-first flex flex-col justify-center gap-4 px-6 py-8 md:px-14 md:py-24 md:w-1/2"
          style={{ animation: "fadeIn 1.2s ease forwards", opacity: 0, animationDelay: "0.2s" }}
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#971B2E" }}>
            Get in Touch
          </span>
          <h1 className="hidden md:block font-serif text-4xl md:text-5xl leading-tight" style={{ color: "#1a0a0e" }}>
            Contact Us
          </h1>
          <p className="font-serif text-base md:text-lg leading-relaxed" style={{ color: "#3a2010" }}>
            We&apos;re easy to reach. Whether you spotted something in the window, have a question about the shop, or just want to say hi — we&apos;re here. Reach us by phone, Instagram, or the form below.
          </p>
        </div>
      </section>

      {/* ── Form + Map ── */}
      <FadeIn>
        <section className="flex flex-col md:flex-row">

          {/* Left — form on top, store info below */}
          <div className="flex flex-col md:w-1/2" style={{ backgroundColor: "#971B2E" }}>

            {/* Form */}
            <div className="flex flex-col gap-8 px-6 py-10 md:px-14 md:py-16">
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#FFB81C" }}>
                  Send a Message
                </span>
                <h2 className="font-serif text-3xl md:text-5xl leading-tight text-white">
                  We&apos;d love to hear from you.
                </h2>
              </div>
              <ContactForm />
            </div>

            {/* Store info */}
            <div
              className="flex flex-col gap-8 px-6 py-10 md:px-14 md:py-12"
              style={{ backgroundColor: "#f6e6c9", borderTop: "1px solid #c4a882" }}
            >
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#971B2E" }}>
                  Phone
                </span>
                <a
                  href="tel:7188750546"
                  className="font-serif text-2xl hover:opacity-70 transition-opacity"
                  style={{ color: "#1a0a0e" }}
                >
                  718-875-0546
                </a>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#971B2E" }}>
                  Address
                </span>
                <a
                  href="https://maps.google.com/?q=428+Court+Street+Brooklyn+NY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-serif text-2xl hover:opacity-70 transition-opacity"
                  style={{ color: "#1a0a0e" }}
                >
                  428 Court Street<br />Brooklyn, NY
                </a>
              </div>

              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#971B2E" }}>
                  Hours
                </span>
                <div className="font-serif text-base leading-relaxed" style={{ color: "#1a0a0e" }}>
                  <p>Monday: Closed</p>
                  <p>Tuesday–Friday: 10am–5:45pm</p>
                  <p>Saturday–Sunday: 9:30am–5:30pm</p>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <a
                  href="mailto:yesterdaysnews1@gmail.com"
                  className="font-serif text-sm font-bold tracking-widest uppercase px-6 py-3 border-2 transition-colors hover:bg-[#971B2E] hover:text-white hover:border-[#971B2E]"
                  style={{ color: "#971B2E", borderColor: "#971B2E" }}
                >
                  Email Us
                </a>
                <a
                  href="https://www.instagram.com/yesterdaysnewsbk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-60 transition-opacity"
                  style={{ color: "#971B2E" }}
                  aria-label="Instagram"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Right — map, full height */}
          <div className="relative md:w-1/2" style={{ minHeight: "320px" }}>
            <iframe
              src={MAP_SRC}
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", position: "absolute", inset: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Yesterday's News location"
            />
          </div>

        </section>
      </FadeIn>

      {/* ── Footer ── */}
      <FadeIn>
        <Footer />
      </FadeIn>

    </main>
  );
}
