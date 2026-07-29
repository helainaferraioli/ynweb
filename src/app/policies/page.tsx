import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Policies",
  description: "Return policy and privacy policy for Yesterday's News.",
};

export default function Policies() {
  return (
    <main className="flex flex-col">

      <section
        className="flex flex-col gap-12 px-6 md:px-20 py-24 md:py-32 max-w-3xl mx-auto w-full"
        style={{ marginTop: "100px" }}
      >
        <div className="flex flex-col gap-2">
          <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#971B2E" }}>
            Store Policies
          </span>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: "#1a0a0e" }}>
            Returns &amp; Privacy
          </h1>
        </div>

        {/* Return Policy */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl md:text-3xl" style={{ color: "#1a0a0e" }}>
            Return Policy
          </h2>
          <div className="flex flex-col gap-3 font-serif text-base md:text-lg leading-relaxed" style={{ color: "#3a2010" }}>
            <p>
              All sales are final. Every item in the shop is one-of-a-kind — vintage and antique pieces that have already lived a full life. We can&apos;t accept returns or exchanges.
            </p>
            <p>
              That said, we describe everything honestly. If something doesn&apos;t match how we represented it, reach out and we&apos;ll make it right. We&apos;ve been here 25 years because we treat people fairly.
            </p>
            <p>
              Questions before you buy? Call us at{" "}
              <a href="tel:7188750546" className="underline hover:opacity-70 transition-opacity">
                718-875-0546
              </a>{" "}
              or email{" "}
              <a href="mailto:yesterdaysnews1@gmail.com" className="underline hover:opacity-70 transition-opacity">
                yesterdaysnews1@gmail.com
              </a>.
            </p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid #c4a882" }} />

        {/* Privacy Policy */}
        <div className="flex flex-col gap-4">
          <h2 className="font-serif text-2xl md:text-3xl" style={{ color: "#1a0a0e" }}>
            Privacy Policy
          </h2>
          <div className="flex flex-col gap-3 font-serif text-base md:text-lg leading-relaxed" style={{ color: "#3a2010" }}>
            <p>
              We collect only what we need to run the shop and respond to you.
            </p>

            <h3 className="font-serif text-lg font-bold mt-2" style={{ color: "#1a0a0e" }}>What we collect</h3>
            <ul className="flex flex-col gap-2 pl-4 list-disc">
              <li>
                <strong>Contact forms</strong> — your name, phone number, zip code, and any message you send us. We use this to respond to your inquiry. Nothing else.
              </li>
              <li>
                <strong>Photos</strong> — if you submit photos through our &quot;We Buy&quot; form, they&apos;re stored securely and used only to evaluate your items.
              </li>
              <li>
                <strong>Orders</strong> — if you purchase something from our shop, your payment is processed by Stripe. We never see or store your card number. Stripe&apos;s privacy policy is at{" "}
                <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:opacity-70 transition-opacity">
                  stripe.com/privacy
                </a>.
              </li>
            </ul>

            <h3 className="font-serif text-lg font-bold mt-2" style={{ color: "#1a0a0e" }}>What we don&apos;t do</h3>
            <p>
              We don&apos;t sell your information. We don&apos;t send marketing emails. We don&apos;t track you across the web.
            </p>

            <h3 className="font-serif text-lg font-bold mt-2" style={{ color: "#1a0a0e" }}>Third-party services</h3>
            <p>
              This site uses Google Maps for location display and Instagram to show our feed. Those services have their own privacy policies.
            </p>

            <h3 className="font-serif text-lg font-bold mt-2" style={{ color: "#1a0a0e" }}>Contact</h3>
            <p>
              Questions? Reach us at{" "}
              <a href="mailto:yesterdaysnews1@gmail.com" className="underline hover:opacity-70 transition-opacity">
                yesterdaysnews1@gmail.com
              </a>.
            </p>

            <p className="text-sm mt-2" style={{ color: "#7a5030" }}>
              Last updated July 2026.
            </p>
          </div>
        </div>

      </section>

      <Footer />
    </main>
  );
}
