import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { sanityClient, urlFor } from "@/lib/sanity";
import ProductDetail from "@/components/ProductDetail";

type Product = {
  _id: string;
  title: string;
  description?: string;
  price: number;
  photos: { asset: { _ref: string }; hotspot?: { x: number; y: number } }[];
  dimensions?: string;
  materials?: string;
  condition?: "excellent" | "good" | "fair";
  quantity_available: number;
  status: string;
  posted_at?: string;
};

async function getProduct(id: string): Promise<Product | null> {
  return sanityClient.fetch(
    `*[_type == "product" && _id == $id][0] {
      _id, title, description, price, photos,
      dimensions, materials, condition,
      quantity_available, status, posted_at
    }`,
    { id }
  );
}

export const revalidate = 60;

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  const photos = (product.photos ?? []).map((p) =>
    urlFor(p).width(1200).height(1500).fit("crop").url()
  );

  return (
    <main className="flex flex-col" style={{ backgroundColor: "#f6e6c9" }}>
      <div style={{ marginTop: "130px" }}>
        <FadeIn>
          <ProductDetail product={product} photos={photos} />
        </FadeIn>
      </div>
      <FadeIn>
        <Footer />
      </FadeIn>
    </main>
  );
}
