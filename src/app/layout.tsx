import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import ScrollReset from "@/components/ScrollReset";

export const metadata: Metadata = {
  title: "Yesterday's News",
  description: "Yesterday's News",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ScrollReset />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
