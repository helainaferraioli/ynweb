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
        className="px-14 py-24"
        style={{ backgroundColor: "#f6e6c9", marginTop: "130px" }}
      >
        <div
          className="max-w-2xl"
          style={{ animation: "fadeIn 1.2s ease forwards", opacity: 0, animationDelay: "0.2s" }}
        >
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#971B2E" }}>
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mt-4 mb-4" style={{ color: "#1a0a0e" }}>
            Contact Us
          </h1>
          <p className="font-serif text-base md:text-lg leading-relaxed" style={{ color: "#3a2010" }}>
            We&apos;re a family-run shop in Carroll Gardens, Brooklyn. Don&apos;t hesitate to reach out.
          </p>
        </div>
      </section>

      {/* ── Info + Map ── */}
      <FadeIn>
        <section className="flex flex-col md:flex-row" style={{ backgroundColor: "#f6e6c9" }}>

          {/* Left — store info */}
          <div className="flex flex-col justify-center gap-8 px-14 py-16 md:w-1/2" style={{ borderTop: "1px solid #c4a882" }}>

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

          {/* Right — map */}
          <div className="md:w-1/2" style={{ minHeight: "400px" }}>
            <iframe
              src={MAP_SRC}
              width="100%"
              height="400"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Yesterday's News location"
            />
          </div>

        </section>
      </FadeIn>

      {/* ── Contact Form ── */}
      <FadeIn>
        <section className="flex flex-col md:flex-row" style={{ backgroundColor: "#971B2E" }}>
          <div className="flex flex-col gap-8 px-14 py-16 md:w-1/2 md:max-w-2xl">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#FFB81C" }}>
                Send a Message
              </span>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight text-white">
                We&apos;d love to hear from you.
              </h2>
            </div>
            <ContactForm />
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
