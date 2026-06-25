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
            Yesterday&apos;s News is a family-owned and operated vintage shop. Today, the shop is
            one of the longest standing vintage institutions in New York City, entering its 25th year
            and ushering in a second-generation. It all started with a third generation
            Italian-American family in the heart of Carroll Gardens, Brooklyn, where my dad, JP
            Ferraioli, found his footing and developed a love for days past.
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
              Where It Began
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight text-white">
              Meet my Dad, JP
            </h2>
            <div
              className="flex flex-col gap-5 font-serif text-base md:text-lg leading-relaxed max-w-lg"
              style={{ color: "#FFCCCC" }}
            >
              <p>
                JP Ferraioli grew up on President Street in Carroll Gardens, Brooklyn — siblings,
                parents, aunts, uncles, grandparents, friends, and playground rivals all living
                harmoniously within the grid of a humming working-class neighborhood.
              </p>
              <p>
                At ten, his great grandmother gave him his first taste of vintage: a 1940s
                Coca-Cola tray, passed down from her brother Tony, who had worked for the company
                during its commercial heyday.
              </p>
              <p>
                From that day forward, a voracious appetite for collecting and a deep nostalgia
                for well-made, heart-led craftsmanship drove JP to leave a career with the city
                and open a shop in the neighborhood where it all began.
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
                Today, the shop is entirely family and friend operated by husband-wife duo,
                Colleen and JP Ferraioli, their daughter (me!), Helaina, and our long-time
                President Street friend and employee, Craig Scotti.
              </p>
              <p>
                What keeps a business like ours alive is our collective commitment to providing
                every customer, visitor, and passerby with an experience that passion alone cannot
                produce – it&apos;s a decision that our family makes every day to continue to be a
                place where people can enjoy, escape, unwind, and explore.
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
                When you step into Yesterday&apos;s News, you are not just entering a vintage shop
                – you&apos;re looking to connect, to explore, and to uncover your next unique,
                one-of-a-kind find that speaks to you.
              </p>
              <p>
                Whether it be a pair of 1980s costume jewelry earrings that you wear to your
                anniversary dinner, an ottoman that becomes your cat&apos;s new favorite resting
                spot, a plantstand where you nurture your first basil plant in a narrow strip of
                sunlight in your Brooklyn apartment, or a dresser that comes to hold your upgraded
                work wardrobe – we have a piece for any and every occasion.
              </p>
              <p>
                We source every authentically vintage item in our shop by hand locally from homes
                in Brooklyn, Queens, and Long Island.
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
