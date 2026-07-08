import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import Footer from "@/components/Footer";
import AboutTeamSection from "@/components/AboutTeamSection";
import AboutSlideshow from "@/components/AboutSlideshow";
import JPSlideshow from "@/components/JPSlideshow";
import InstagramFeed from "@/components/InstagramFeed";

export default function About() {
  return (
    <main className="flex flex-col">

      {/* ── Hero ── */}
      <section id="brooklyn-story" className="relative w-full" style={{ height: "72vh" }}>
        <Image
          src="/images/Hero%20Image.webp"
          alt="Yesterday's News"
          fill
          className="object-cover"
          style={{ objectPosition: "center 10%" }}
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ paddingTop: "120px" }}
        >
          <h1
            className="font-serif text-5xl md:text-7xl text-white"
            style={{
              animation: "fadeIn 1.4s ease forwards",
              opacity: 0,
              animationDelay: "0.3s",
              textShadow: "0 2px 30px rgba(0,0,0,0.55)",
            }}
          >
            A Brooklyn Story
          </h1>
        </div>
      </section>

      {/* ── Intro ── */}
      <FadeIn>
        <section className="py-20 px-10" style={{ backgroundColor: "#f6e6c9" }}>
          <p
            className="font-serif text-lg md:text-xl leading-relaxed max-w-2xl mx-auto text-center"
            style={{ color: "#3a2010" }}
          >
            Yesterday&apos;s News is a family-owned and operated vintage shop, now entering our
            25th year as one of New York City&apos;s longest-standing vintage institutions. Our story
            begins in the heart of Italian-American Brooklyn, right here in Carroll Gardens, where
            my dad began collecting vintage at just ten years old.
          </p>
        </section>
      </FadeIn>

      {/* ── JP Story ── */}
      <FadeIn>
        <section className="flex flex-col md:flex-row">

          {/* Text LEFT on red */}
          <div
            className="flex flex-col justify-center gap-5 px-10 py-20 md:w-[55%]"
            style={{ backgroundColor: "#971B2E" }}
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#FFB81C" }}>
              It Started in Brooklyn
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-white">
              Meet my Dad, JP
            </h2>
            <div
              className="flex flex-col gap-5 font-serif text-base md:text-lg leading-relaxed max-w-lg"
              style={{ color: "#FFCCCC" }}
            >
              <p>
                JP Ferraioli grew up on President Street in Carroll Gardens, Brooklyn — here,
                siblings, parents, aunts, uncles, grandparents, friends, and playground rivals
                all lived harmoniously within the grid of a humming working-class neighborhood.
              </p>
              <p>
                At ten, his grandmother gave him his first taste of vintage: a 1940s Coca-Cola tray.
              </p>
              <p>
                From that day forward, a voracious appetite for collecting developed alongside a
                deep nostalgia for well-made, heart-led craftsmanship. After a career with the
                city, this passion eventually drove my dad to open a shop in the neighborhood
                where it all began.
              </p>
            </div>
          </div>

          {/* Photo slideshow RIGHT */}
          <div className="relative md:w-[45%]" style={{ minHeight: "500px" }}>
            <JPSlideshow />
          </div>
        </section>
      </FadeIn>

      {/* ── Our Family ── */}
      <FadeIn>
        <section id="our-family" className="flex flex-col md:flex-row">

          {/* Family collage LEFT — natural 1:1 ratio */}
          <div className="relative md:w-1/2" style={{ aspectRatio: "1/1" }}>
            <Image
              src="/images/about/Family%20collage.png"
              alt="The Ferraioli Family"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>

          {/* Text RIGHT on cream */}
          <div
            className="flex flex-col justify-center gap-6 px-14 py-10 md:w-1/2"
            style={{ backgroundColor: "#f6e6c9" }}
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#971B2E" }}>
              The Ferraioli Family
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight" style={{ color: "#1a0a0e" }}>
              Our Family
            </h2>
            <div
              className="flex flex-col gap-5 font-serif text-base md:text-lg leading-relaxed max-w-sm"
              style={{ color: "#3a2010" }}
            >
              <p>
                Today, the shop is still entirely family-owned and operated — same neighborhood,
                same faces, just a new generation behind the counter.
              </p>
              <p>
                Just like in days of old, what keeps a place like ours alive isn&apos;t just
                passion, though we have plenty of that. It&apos;s a daily commitment to show up
                the way mom and pop shops across the city once did, making sure everyone who
                walks through the door — whether they&apos;re buying, browsing, or just passing
                time — leaves feeling like they found something special.
              </p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* ── Meet the Team ── */}
      <AboutTeamSection />

      {/* ── The Shop ── */}
      <FadeIn>
        <section id="the-shop" className="flex flex-col md:flex-row" style={{ minHeight: "680px" }}>

          {/* Text LEFT */}
          <div
            className="flex flex-col justify-center gap-6 px-14 py-16 md:w-1/2"
            style={{ backgroundColor: "#971B2E" }}
          >
            <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#FFB81C" }}>
              Court Street, Brooklyn
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-white">
              The Shop
            </h2>
            <div
              className="flex flex-col gap-5 font-serif text-base md:text-lg leading-relaxed max-w-sm"
              style={{ color: "#FFCCCC" }}
            >
              <p>
                Yesterday&apos;s News is not your average vintage shop. Step inside and
                you&apos;ll find yourself somewhere between a treasure hunt and a time capsule
                — where the past is always turning up something new.
              </p>
              <p>
                Whether it&apos;s a pair of 1980s costume jewelry earrings for your anniversary
                dinner, a plant stand where you nurture your first basil plant in a narrow strip
                of Brooklyn sunlight, or a midcentury dresser meant to hold your growing wardrobe
                — there&apos;s a piece here for you.
              </p>
              <p>
                Every item in our shop is authentically vintage, sourced by hand from homes
                across Brooklyn, Queens, and Long Island.
              </p>
            </div>
          </div>

          {/* Slideshow RIGHT */}
          <div className="relative md:w-1/2" style={{ minHeight: "680px" }}>
            <AboutSlideshow />
          </div>
        </section>
      </FadeIn>

      {/* ── See What's New + Instagram ── */}
      <FadeIn>
        <section className="pt-10 pb-4 px-10 text-center" style={{ backgroundColor: "#000000" }}>
          <h2
            className="font-serif text-5xl md:text-7xl text-white"
          >
            See What&apos;s New
          </h2>
        </section>
        <InstagramFeed hideHeader dark />
      </FadeIn>

      {/* ── Footer ── */}
      <FadeIn>
        <Footer />
      </FadeIn>

    </main>
  );
}
