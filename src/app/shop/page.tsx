import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { sanityClient, urlFor } from "@/lib/sanity";

type Product = {
  _id: string;
  title: string;
  price: number;
  photos: { asset: { _ref: string } }[];
  quantity_available: number;
  status: string;
  posted_at: string;
};

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

function isNew(posted_at: string) {
  return Date.now() - new Date(posted_at).getTime() < SEVEN_DAYS_MS;
}

async function getLiveProducts(): Promise<Product[]> {
  return sanityClient.fetch(
    `*[_type == "product" && status == "live"] | order(posted_at desc) {
      _id, title, price, photos, quantity_available, status, posted_at
    }`
  );
}

export const revalidate = 60;

export default async function Shop() {
  const products = await getLiveProducts();

  return (
    <main className="flex flex-col">

      {/* Hero */}
      <section
        className="px-14 py-20"
        style={{ backgroundColor: "#f6e6c9", marginTop: "130px" }}
      >
        <div style={{ animation: "fadeIn 1.2s ease forwards", opacity: 0, animationDelay: "0.2s" }}>
          <span
            className="text-xs font-bold tracking-[0.2em] uppercase"
            style={{ color: "#971B2E" }}
          >
            The Shop
          </span>
          <h1
            className="font-serif text-4xl md:text-5xl leading-tight mt-4"
            style={{ color: "#1a0a0e" }}
          >
            What&apos;s in the shop this week.
          </h1>
        </div>
      </section>

      {/* Product grid */}
      <FadeIn>
        <section className="px-10 md:px-14 py-16" style={{ backgroundColor: "#f6e6c9" }}>
          {products.length === 0 ? (
            <p className="font-serif text-lg" style={{ color: "#3a2010" }}>
              New items dropping soon — check back shortly.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => {
                const soldOut = product.quantity_available === 0;
                const lastOne = product.quantity_available === 1;
                const newBadge = product.posted_at && isNew(product.posted_at);
                const photo = product.photos?.[0];
                const imgUrl = photo
                  ? urlFor(photo).width(800).height(1000).fit("crop").url()
                  : null;

                return (
                  <Link
                    key={product._id}
                    href={`/shop/${product._id}`}
                    className="group flex flex-col gap-3"
                  >
                    {/* Photo */}
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ aspectRatio: "4/5" }}
                    >
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full" style={{ backgroundColor: "#e8d9be" }} />
                      )}

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {newBadge && !soldOut && (
                          <span
                            className="text-xs font-bold tracking-widest uppercase px-2 py-1"
                            style={{ backgroundColor: "#FFB81C", color: "#1a0a0e" }}
                          >
                            New
                          </span>
                        )}
                        {lastOne && !soldOut && (
                          <span
                            className="text-xs font-bold tracking-widest uppercase px-2 py-1"
                            style={{ backgroundColor: "#971B2E", color: "#fff" }}
                          >
                            Last one
                          </span>
                        )}
                        {soldOut && (
                          <span
                            className="text-xs font-bold tracking-widest uppercase px-2 py-1"
                            style={{ backgroundColor: "#3a2010", color: "#fff" }}
                          >
                            Sold out
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title + price */}
                    <div className="flex flex-col gap-1">
                      <p
                        className="font-serif text-base leading-snug"
                        style={{ color: "#1a0a0e" }}
                      >
                        {product.title}
                      </p>
                      <p className="font-serif text-base" style={{ color: "#971B2E" }}>
                        ${product.price.toLocaleString()}
                      </p>
                    </div>

                    {/* CTA */}
                    <button
                      disabled={soldOut}
                      className="w-full font-serif text-sm font-bold tracking-widest uppercase py-3 transition-opacity hover:opacity-80 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: soldOut ? "#c4a882" : "#971B2E",
                        color: "#fff",
                      }}
                    >
                      {soldOut ? "Sold Out" : "Reserve & Pay"}
                    </button>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </FadeIn>

      <FadeIn>
        <Footer />
      </FadeIn>

    </main>
  );
}
