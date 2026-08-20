import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#971B2E" }} className="px-6 md:px-14 pt-16 pb-10">
      <div className="max-w-7xl mx-auto">

        {/* Columns */}
        <div className="grid grid-cols-2 md:flex md:flex-row gap-y-8 gap-x-14 md:gap-14 justify-between mb-8">

          {/* Col 1 — Visit Us */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#FFB81C" }}>
              Visit Us
            </span>
            <div className="flex flex-col gap-1 text-sm leading-relaxed" style={{ color: "#FFCCCC" }}>
              <p>428 Court Street<br />Brooklyn, NY 11231</p>
              <div className="flex flex-col gap-0.5 mt-2">
                <p className="whitespace-nowrap"><span className="font-bold">Mon</span> · closed</p>
                <p className="whitespace-nowrap"><span className="font-bold">Tue–Fri</span> · 10am–5:45pm</p>
                <p className="whitespace-nowrap"><span className="font-bold">Weekend</span> · 9:30am–5:30pm</p>
              </div>
            </div>
            <div className="hidden md:flex flex-col gap-1">
              <a href="tel:7188750546" className="text-sm hover:opacity-70 transition-opacity" style={{ color: "#FFCCCC" }}>
                718-875-0546
              </a>
              <a href="mailto:yesterdaysnews1@gmail.com" className="text-sm hover:opacity-70 transition-opacity" style={{ color: "#FFCCCC" }}>
                yesterdaysnews1@gmail.com
              </a>
            </div>
          </div>

          {/* Col 2 — Yesterday's News nav */}
          <div className="flex flex-col gap-3 items-end md:items-start pr-6 md:pr-0">
            <span className="text-xs font-bold tracking-widest uppercase whitespace-nowrap" style={{ color: "#FFB81C" }}>
              Yesterday&apos;s News
            </span>
            {[
              { label: "About", href: "/about" },
              { label: "Shop", href: "/shop" },
              { label: "We Buy", href: "/we-buy" },
              { label: "Contact", href: "/contact" },
            ].map((l) => (
              <Link key={l.href} href={l.href} className="text-sm hover:opacity-70 transition-opacity" style={{ color: "#FFCCCC" }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Col 3 — Have Something to Sell + Social */}
          <div className="hidden md:flex flex-col gap-10 max-w-[200px]">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#FFB81C" }}>
                Have Something to Sell?
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "#FFCCCC" }}>
                We buy vintage furniture, art, and collectibles. Tell us what you have.
              </p>
              <Link
                href="/we-buy"
                className="inline-block text-xs font-bold tracking-widest uppercase pb-1 border-b hover:opacity-70 transition-opacity w-fit"
                style={{ color: "#FFB81C", borderColor: "#FFB81C" }}
              >
                Learn more →
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "#FFB81C" }}>
                Social
              </span>
              <a
                href="https://instagram.com/yesterdaysnewsbk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: "#FFCCCC" }}
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com/@yesterdaysnewsbklyn"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-70 transition-opacity"
                style={{ color: "#FFCCCC" }}
              >
                TikTok
              </a>
            </div>
          </div>

        </div>

        {/* Mobile contact buttons */}
        <div className="flex md:hidden justify-center gap-6 pt-6 pb-4">
          <a href="tel:7188750546" style={{ color: "#FFCCCC" }}>
            <div className="w-12 h-12 rounded-full border border-[#FFCCCC]/40 flex items-center justify-center hover:opacity-70 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.07 1.18 2 2 0 012.03 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
              </svg>
            </div>
          </a>
          <a href="mailto:yesterdaysnews1@gmail.com" style={{ color: "#FFCCCC" }}>
            <div className="w-12 h-12 rounded-full border border-[#FFCCCC]/40 flex items-center justify-center hover:opacity-70 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
          </a>
          <a href="https://instagram.com/yesterdaysnewsbk" target="_blank" rel="noopener noreferrer" style={{ color: "#FFCCCC" }}>
            <div className="w-12 h-12 rounded-full border border-[#FFCCCC]/40 flex items-center justify-center hover:opacity-70 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
            </div>
          </a>
          <a href="https://tiktok.com/@yesterdaysnewsbklyn" target="_blank" rel="noopener noreferrer" style={{ color: "#FFCCCC" }}>
            <div className="w-12 h-12 rounded-full border border-[#FFCCCC]/40 flex items-center justify-center hover:opacity-70 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
              </svg>
            </div>
          </a>
        </div>

        {/* Bottom — seal + copyright */}
        <div className="flex flex-col items-center gap-4 pt-6">
          <Image src="/illustration-newspaper-black.png" alt="Yesterday's News" width={130} height={101} />
          <p className="text-xs tracking-widest uppercase text-center" style={{ color: "#FFCCCC" }}>
            © Yesterday&apos;s News 2026. All Rights Reserved.
          </p>
          <Link href="/policies" className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity" style={{ color: "#FFCCCC" }}>
            Returns &amp; Privacy
          </Link>
        </div>

      </div>
    </footer>
  );
}
