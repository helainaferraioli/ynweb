"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Buyer = { name: string; email: string; phone: string; qty: number };

type Props = {
  productId: string;
  productTitle: string;
  price: number;
  qty: number;
  paymentIntentId: string;
};

// ── Slot logic ────────────────────────────────────────────────────────────────

type Schedule = { startH: number; startM: number; lastH: number; lastM: number };

function getDaySchedule(dow: number): Schedule | null {
  if (dow === 1) return null; // Monday closed
  if (dow >= 2 && dow <= 5) return { startH: 10, startM: 0,  lastH: 17, lastM: 15 }; // Tue–Fri
  return                           { startH: 9,  startM: 30, lastH: 17, lastM: 0  }; // Sat–Sun
}

function generateSlots(s: Schedule): string[] {
  const slots: string[] = [];
  let h = s.startH, m = s.startM;
  while (h < s.lastH || (h === s.lastH && m <= s.lastM)) {
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    m += 30;
    if (m >= 60) { m -= 60; h++; }
  }
  return slots;
}

function filterPastSlots(slots: string[], date: Date): string[] {
  const now = new Date();
  if (date.toDateString() !== now.toDateString()) return slots;
  const cutoff = now.getHours() * 60 + now.getMinutes() + 60; // 1-hour buffer
  return slots.filter(s => {
    const [h, m] = s.split(":").map(Number);
    return h * 60 + m > cutoff;
  });
}

function getAvailableDays(): Date[] {
  const days: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 1) days.push(d); // skip Monday
  }
  return days;
}

function formatDayLabel(d: Date): { weekday: string; date: string } {
  return {
    weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
    date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
  };
}

function formatSlot(slot: string): string {
  const [h, m] = slot.split(":").map(Number);
  const period = h < 12 ? "AM" : "PM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")} ${period}`;
}

function toDateString(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ScheduleClient({ productId, productTitle, price, qty, paymentIntentId }: Props) {
  const router = useRouter();
  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const [mode, setMode] = useState<"pick" | "flexible">("pick");
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableDays = getAvailableDays();

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(`buyer_${productId}`);
      if (raw) setBuyer(JSON.parse(raw));
    } catch {}
  }, [productId]);

  const slotsForDay = selectedDay
    ? filterPastSlots(generateSlots(getDaySchedule(selectedDay.getDay())!), selectedDay)
    : [];

  const canSubmit =
    !submitting &&
    (mode === "flexible" || (mode === "pick" && selectedDay !== null && selectedSlot !== null));

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);

    const body = {
      paymentIntentId,
      productId,
      productTitle,
      quantity: buyer?.qty ?? qty,
      pricePaid: price * (buyer?.qty ?? qty),
      buyerName: buyer?.name ?? "",
      buyerEmail: buyer?.email ?? "",
      buyerPhone: buyer?.phone ?? "",
      pickupType: mode === "flexible" ? "flexible" : "scheduled",
      pickupDate: selectedDay ? toDateString(selectedDay) : undefined,
      pickupSlot: selectedSlot ?? undefined,
    };

    const res = await fetch("/api/shop/save-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (!res.ok || data.error) {
      setError(data.error ?? "Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    sessionStorage.removeItem(`buyer_${productId}`);
    router.push(`/shop/${productId}/confirmation?order_id=${data.orderId}`);
  };

  // ── render ──────────────────────────────────────────────────────────────────

  const tabBase =
    "flex-1 py-3 px-4 text-xs font-bold tracking-widest uppercase transition-colors";
  const tabActive = { backgroundColor: "#971B2E", color: "#fff" };
  const tabInactive = { backgroundColor: "#eddcb8", color: "#3a2010" };

  return (
    <section className="px-8 md:px-14 py-14 max-w-2xl">

      {/* Mode toggle */}
      <div className="flex mb-10 border" style={{ borderColor: "#c4a882" }}>
        <button
          className={tabBase}
          style={mode === "pick" ? tabActive : tabInactive}
          onClick={() => setMode("pick")}
        >
          Pick a time
        </button>
        <button
          className={tabBase}
          style={mode === "flexible" ? tabActive : tabInactive}
          onClick={() => { setMode("flexible"); setSelectedDay(null); setSelectedSlot(null); }}
        >
          Anytime this week
        </button>
      </div>

      {mode === "flexible" && (
        <div
          className="mb-10 px-5 py-5 border-l-4"
          style={{ borderColor: "#FFB81C", backgroundColor: "#eddcb8" }}
        >
          <p className="font-serif text-base leading-relaxed" style={{ color: "#1a0a0e" }}>
            We&apos;ll hold your item through the end of this week. You can come in any time we&apos;re open —
            Tue–Fri 10am–5:45pm or Sat–Sun 9:30am–5:30pm.
          </p>
        </div>
      )}

      {mode === "pick" && (
        <>
          {/* Day selector */}
          <div className="mb-8">
            <p
              className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
              style={{ color: "#971B2E" }}
            >
              Choose a day
            </p>
            <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
              {availableDays.map((day) => {
                const { weekday, date } = formatDayLabel(day);
                const isSelected = selectedDay?.toDateString() === day.toDateString();
                const schedule = getDaySchedule(day.getDay());
                const slots = schedule ? filterPastSlots(generateSlots(schedule), day) : [];
                const hasSlots = slots.length > 0;

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => {
                      if (!hasSlots) return;
                      setSelectedDay(day);
                      setSelectedSlot(null);
                    }}
                    disabled={!hasSlots}
                    className="flex-none flex flex-col items-center px-4 py-3 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    style={{
                      minWidth: "72px",
                      backgroundColor: isSelected ? "#971B2E" : "#eddcb8",
                      color: isSelected ? "#fff" : "#1a0a0e",
                      border: isSelected ? "2px solid #971B2E" : "2px solid #c4a882",
                    }}
                  >
                    <span className="text-xs font-bold tracking-wider uppercase">{weekday}</span>
                    <span className="font-serif text-sm mt-0.5">{date}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slot grid */}
          {selectedDay && (
            <div className="mb-8">
              <p
                className="text-xs font-bold tracking-[0.2em] uppercase mb-4"
                style={{ color: "#971B2E" }}
              >
                Choose a time
              </p>
              {slotsForDay.length === 0 ? (
                <p className="font-serif text-sm" style={{ color: "#3a2010" }}>
                  No slots available for this day — please pick another day.
                </p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {slotsForDay.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className="py-2.5 text-xs font-bold tracking-wider uppercase transition-colors"
                        style={{
                          backgroundColor: isSelected ? "#971B2E" : "#eddcb8",
                          color: isSelected ? "#fff" : "#1a0a0e",
                          border: isSelected ? "2px solid #971B2E" : "2px solid #c4a882",
                        }}
                      >
                        {formatSlot(slot)}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* Error */}
      {error && (
        <p className="mb-6 font-serif text-sm" style={{ color: "#971B2E" }}>
          {error}
        </p>
      )}

      {/* Confirm */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className="w-full py-4 font-serif font-bold text-sm tracking-widest uppercase transition-opacity hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
        style={{ backgroundColor: "#971B2E", color: "#fff" }}
      >
        {submitting ? "Saving…" : "Confirm Pickup"}
      </button>

    </section>
  );
}
