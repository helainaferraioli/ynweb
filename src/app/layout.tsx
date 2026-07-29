import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import ScrollReset from "@/components/ScrollReset";

const SITE_URL = "https://www.yesterdaysnewsbk.com";
const SITE_NAME = "Yesterday's News";
const DESCRIPTION = "Vintage and antique shop in Carroll Gardens, Brooklyn. Open 25 years at 428 Court Street.";
const OG_IMAGE = `${SITE_URL}/shopfront1.jpeg`;

export const metadata: Metadata = {
  title: { default: SITE_NAME, template: `%s — ${SITE_NAME}` },
  description: DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: SITE_NAME,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Yesterday's News storefront, 428 Court Street, Carroll Gardens, Brooklyn" }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {/* Runs synchronously during HTML parse — before browser restores scroll */}
        <script dangerouslySetInnerHTML={{ __html: `history.scrollRestoration = 'manual'; window.scrollTo(0, 0);` }} />
        <ScrollReset />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
