import Footer from "@/components/Footer";
import Link from "next/link";
import { sanityClient } from "@/lib/sanity";

export const dynamic = "force-dynamic";

type Order = {
  _id: string;
  product_title: string;
  quantity: number;
  price_paid: number;
  buyer_name: string;
  buyer_email: string;
  pickup_type: "scheduled" | "flexible";
  pickup_date: string | null;
  pickup_slot: string | null;
  pickup_deadline: string;
};

async function getOrder(orderId: string): Promise<Order | null> {
  return sanityClient.fetch(
    `*[_type == "order" && _id == $orderId][0] {
      _id, product_title, quantity, price_paid,
      buyer_name, buyer_email,
      pickup_type, pickup_date, pickup_slot, pickup_deadline
    }`,
    { orderId }
  );
}

function formatSlot(slot: string): string {
  const [h, m] = slot.split(":").map(Number);
  const period = h < 12 ? "AM" : "PM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

function formatDate(dateStr: string): string {
  // dateStr is "YYYY-MM-DD" — parse as local date to avoid UTC offset shifts
  const [y, mo, d] = dateStr.split("-").map(Number);
  const date = new Date(y, mo - 1, d);
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

function formatDeadline(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export default async function ConfirmationPage({
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ order_id?: string }>;
}) {
  const { order_id } = await searchParams;
  const order = order_id ? await getOrder(order_id) : null;

  return (
    <main style={{ backgroundColor: "#f6e6c9", marginTop: "130px" }}>
      <section className="px-8 md:px-14 py-20 max-w-2xl">
        <span
          className="text-xs font-bold tracking-[0.2em] uppercase"
          style={{ color: "#971B2E" }}
        >
          Order confirmed
        </span>

        <h1
          className="font-serif text-4xl md:text-5xl leading-tight mt-4 mb-6"
          style={{ color: "#1a0a0e" }}
        >
          {order ? `Thanks, ${order.buyer_name.split(" ")[0]}.` : "You're all set."}
        </h1>

        <p className="font-serif text-base leading-relaxed mb-10" style={{ color: "#3a2010" }}>
          {order
            ? `Your payment was received and ${order.product_title} is reserved for you.`
            : "Your item is reserved and we'll have it ready for you."}
        </p>

        {/* Order summary */}
        {order && (
          <div
            className="flex flex-col gap-3 p-5 mb-8"
            style={{ backgroundColor: "#eddcb8" }}
          >
            <p
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: "#971B2E" }}
            >
              Your order
            </p>
            <div
              className="flex justify-between items-baseline border-b pb-3"
              style={{ borderColor: "#c4a882" }}
            >
              <span className="font-serif text-sm" style={{ color: "#1a0a0e" }}>
                {order.product_title}
                {order.quantity > 1 && (
                  <span style={{ color: "#3a2010" }}> × {order.quantity}</span>
                )}
              </span>
              <span className="font-serif text-sm" style={{ color: "#1a0a0e" }}>
                ${order.price_paid?.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-baseline">
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: "#3a2010" }}
              >
                Total paid
              </span>
              <span className="font-serif text-base font-bold" style={{ color: "#1a0a0e" }}>
                ${order.price_paid?.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Pickup info */}
        <div
          className="border-l-4 px-5 py-4 mb-10"
          style={{ borderColor: "#FFB81C", backgroundColor: "#eddcb8" }}
        >
          <p
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: "#971B2E" }}
          >
            {order?.pickup_type === "scheduled" ? "Your pickup time" : "Your pickup window"}
          </p>

          {order?.pickup_type === "scheduled" && order.pickup_date && order.pickup_slot ? (
            <>
              <p className="font-serif text-sm font-bold" style={{ color: "#1a0a0e" }}>
                {formatDate(order.pickup_date)} at {formatSlot(order.pickup_slot)}
              </p>
              <p className="font-serif text-sm mt-1" style={{ color: "#3a2010" }}>
                441 Court Street, Brooklyn, NY 11231
              </p>
            </>
          ) : order?.pickup_type === "flexible" ? (
            <>
              <p className="font-serif text-sm font-bold" style={{ color: "#1a0a0e" }}>
                Anytime through {formatDeadline(order.pickup_deadline)}
              </p>
              <p className="font-serif text-sm mt-1" style={{ color: "#3a2010" }}>
                441 Court Street · Mon closed · Tue–Fri 10am–5:30pm · Sat–Sun 9:45am–5:15pm
              </p>
            </>
          ) : (
            <p className="font-serif text-sm" style={{ color: "#3a2010" }}>
              441 Court Street, Brooklyn, NY 11231
              <br />
              Mon closed · Tue–Fri 10am–5:30pm · Sat–Sun 9:45am–5:15pm
            </p>
          )}
        </div>

        {/* Confirmation email note */}
        {order?.buyer_email && (
          <p className="font-serif text-sm mb-8" style={{ color: "#3a2010" }}>
            A confirmation has been sent to {order.buyer_email}.
          </p>
        )}

        {/* Order ref */}
        {order_id && (
          <p className="font-serif text-xs mb-10 opacity-50" style={{ color: "#1a0a0e" }}>
            Order ref: {order_id}
          </p>
        )}

        <Link
          href="/shop"
          className="inline-block text-xs font-bold tracking-widest uppercase pb-1 border-b-2 hover:opacity-60 transition-opacity"
          style={{ color: "#971B2E", borderColor: "#971B2E" }}
        >
          Back to shop →
        </Link>
      </section>
      <Footer />
    </main>
  );
}
