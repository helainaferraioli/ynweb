"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const members = [
  { src: "/dadphoto.jpeg", name: "JP Ferraioli", role: "Owner" },
  { src: "/momphoto.jpeg", name: "Colleen Ferraioli", role: "Owner" },
  { src: "/helainaphoto.jpeg", name: "Helaina Ferraioli", role: "Manager" },
];

function FamilyCard({ src, name, role, delay }: { src: string; name: string; role: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative flex-1 min-w-0 overflow-hidden"
      style={{
        aspectRatio: "3/4",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      <Image
        src={src}
        alt={name}
        fill
        className="object-cover object-top"
      />
      {/* vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
      {/* name + role */}
      <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center gap-1 px-4">
        <span className="text-white text-lg font-bold tracking-wide text-center drop-shadow">{name}</span>
        <span className="text-white/80 text-sm font-normal tracking-wide text-center drop-shadow">{role}</span>
      </div>
    </div>
  );
}

export default function FamilySection() {
  return (
    <section
      className="flex flex-col items-center py-20 px-8 gap-14"
      style={{ backgroundColor: "#282828" }}
    >
      <h2 className="text-white text-3xl md:text-4xl font-bold font-serif tracking-wide text-center">
        Family owned and operated for 25 years.
      </h2>
      <div className="flex gap-4 w-full max-w-6xl">
        {members.map((m, i) => (
          <FamilyCard key={m.src} {...m} delay={i * 150} />
        ))}
      </div>
    </section>
  );
}
