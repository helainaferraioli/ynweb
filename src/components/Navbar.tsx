import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex items-center px-10 py-5 bg-black">
      <Link href="/" className="shrink-0">
        <Image src="/yn-short.png" alt="Yesterday's News" width={48} height={48} priority />
      </Link>
      <nav className="flex flex-1 items-center justify-center gap-10">
        <Link href="/about" className="text-white text-sm font-bold tracking-widest uppercase hover:opacity-60 transition-opacity">About</Link>
        <Link href="/shop" className="text-white text-sm font-bold tracking-widest uppercase hover:opacity-60 transition-opacity">Shop</Link>
        <Link href="/we-buy" className="text-white text-sm font-bold tracking-widest uppercase hover:opacity-60 transition-opacity">We Buy</Link>
      </nav>
      <Link
        href="/contact"
        className="text-sm font-bold tracking-widest uppercase px-6 py-2 border-2 transition-colors hover:bg-[#FFB81C] hover:border-[#FFB81C] hover:text-black"
        style={{ color: "#FFB81C", borderColor: "#FFB81C" }}
      >
        Contact
      </Link>
    </header>
  );
}
