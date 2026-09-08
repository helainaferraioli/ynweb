"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQSection = {
  title: string;
  items: FAQItem[];
};

const SECTIONS: FAQSection[] = [
  {
    title: "How We Buy",
    items: [
      {
        question: "Do you buy items from individuals?",
        answer:
          "Yes — we're always looking to buy full or partial estates. Due to the volume of calls we receive, we typically aren't able to accommodate purchases of just a few items.",
      },
      {
        question: "Can I bring items to the store for you to look at?",
        answer:
          "Please send photos or call the shop before coming in with items to set up an appointment. We don't buy on the spot unless we've been notified in advance.",
      },
      {
        question: "Do you accept donations?",
        answer: "We don't accept donations, but thank you for thinking of us.",
      },
      {
        question: "Do you accept consignment?",
        answer: "We don't accept consignment items.",
      },
    ],
  },
  {
    title: "Purchases",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards and Venmo. If you see something you love on Instagram, give us a call or send a DM. Please make sure you want the item, have measured for it, and asked any questions before purchasing — deposits and all sales are final.",
      },
      {
        question: "Can I reserve an item online?",
        answer:
          "Yes, items can be purchased online via Instagram or email, or by phone — items are sold on a first come, first served basis. Items aren't held or reserved until they've been paid in full.",
      },
      {
        question: "Do you ship items?",
        answer: "No — all purchases are pickup only. We don't offer shipping.",
      },
      {
        question: "What is your return policy?",
        answer:
          "All sales are final. Our furniture, bric-a-brac, clothing, and accessories are vintage, so items may show some age or wear. We ask that you measure carefully and ask questions before purchasing. In extreme circumstances, we'll consider an exchange or store credit on a case-by-case basis if you contact us within 48 hours of your purchase. After 48 hours, exchanges and store credit are no longer available.",
      },
      {
        question: "How long will you hold my item, and how do I pick it up?",
        answer:
          "We don't have storage space, so we can hold a purchased item for up to 48 hours unless other arrangements are made. After 48 hours, a $5 per day fee applies. If you're picking up your item yourself, please bring blankets or padding for safe transport.",
      },
      {
        question: "Do you offer delivery?",
        answer:
          "We don't offer delivery ourselves, but we're happy to recommend a reliable delivery company once you've made a purchase.",
      },
    ],
  },
  {
    title: "Shop Stuff",
    items: [
      {
        question: "What are your hours?",
        answer:
          "Our hours are Tuesday–Friday 10am–5:45pm and Saturday–Sunday 9:30am–5:30pm. We're closed on Mondays.",
      },
      {
        question: "Where are you located?",
        answer: "We're located at 428 Court Street, Brooklyn, NY 11231.",
      },
      {
        question: "Is there parking nearby?",
        answer:
          "Parking is limited. Commercial parking is available on our side of Court Street, and metered parking is available along Court Street. The shop is also accessible via the F/G train at the Carroll St stop.",
      },
      {
        question: "Do you have gift cards?",
        answer:
          "Yes, physical gift cards can be purchased in-store or over the phone for pick-up.",
      },
    ],
  },
];

export default function FAQAccordion() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-12">
      {SECTIONS.map((section) => (
        <div key={section.title} className="flex flex-col gap-2">
          <h2 className="font-serif text-2xl md:text-3xl mb-2" style={{ color: "#1a0a0e" }}>
            {section.title}
          </h2>
          {section.items.map((item) => {
            const isOpen = openQuestion === item.question;
            return (
              <div key={item.question} className="border-b" style={{ borderColor: "#c4a882" }}>
                <button
                  onClick={() => setOpenQuestion(isOpen ? null : item.question)}
                  className="w-full flex items-center justify-between gap-4 py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg md:text-xl" style={{ color: "#1a0a0e" }}>
                    {item.question}
                  </span>
                  <svg
                    width="14"
                    height="9"
                    viewBox="0 0 14 9"
                    fill="none"
                    className="flex-none transition-transform duration-300"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <path d="M1 1L7 7L13 1" stroke="#971B2E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? "600px" : "0px" }}
                >
                  <p className="font-serif text-base leading-relaxed pb-6 max-w-2xl" style={{ color: "#3a2010" }}>
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
