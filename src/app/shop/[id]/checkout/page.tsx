import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import { sanityClient, urlFor } from "@/lib/sanity";
import CheckoutClient from "@/components/CheckoutClient";

type Product = {
  _id: string;
  title: string;
  price: number;
  photos: { asset: { _ref: string } }[];
  quantity_available: number;
  status: string;
};

async function getProduct(id: string): Promise<Product | null> {
  return sanityClient.fetch(
    `*[_type == "product" && _id == $id][0] {
      _id, title, price, photos, quantity_available, status
    }`,
    { id }
  );
}

export const dynamic = "force-dynamic";

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ qty?: string }>;
}) {
  const { id } = await params;
  const { qty: qtyParam } = await searchParams;

  const product = await getProduct(id);

  if (!product || product.status !== "live" || product.quantity_available === 0) {
    notFound();
  }

  const qty = Math.min(
    Math.max(1, parseInt(qtyParam ?? "1", 10) || 1),
    product.quantity_available
  );

  const photoUrl = product.photos?.[0]
    ? urlFor(product.photos[0]).width(400).height(500).fit("crop").url()
    : null;

  return (
    <main style={{ backgroundColor: "#f6e6c9", marginTop: "130px" }}>
      <CheckoutClient
        product={{ _id: product._id, title: product.title, price: product.price, photoUrl }}
        qty={qty}
      />
      <Footer />
    </main>
  );
}
