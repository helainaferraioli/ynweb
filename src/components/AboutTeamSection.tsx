"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react"; // useState kept for fade-in visibility

const team = [
  { src: "/images/Dad%20Team%20Photo%201.webp", name: "JP Ferraioli",      role: "Owner", scale: 1.3, objectPosition: "center 82%" },
  { src: "/images/Colleen%202.jpg",             name: "Colleen Ferraioli", role: "Owner" },
  { src: "/images/Helaina%20Team%20Photo.webp", name: "Helaina Ferraioli", role: "Manager", scale: 1.4, objectPosition: "center 100%", shiftY: "-5%" },
  { src: "/images/Craig%20Team%20Photo.webp",   name: "Craig Scotti",      role: "General Manager", scale: 1.2, objectPosition: "center 100%", vignette: true, shiftY: "-4%" },
];

function TeamCard({
  src, name, role, delay, scale, objectPosition, shiftY, vignette,
}: {
  src: string; name: string; role: string; delay: number; scale?: number; objectPosition?: string; shiftY?: string; vignette?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="flex flex-col"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "3/4" }}>
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover object-top"
          sizes="25vw"
          style={scale ? { transform: `scale(${scale}) translateY(${shiftY ?? "0%"})`, objectPosition } : undefined}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        {vignette && (
          <div
            className="absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)" }}
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 pb-6 flex flex-col items-center gap-1 px-4">
          <span className="text-white text-base font-bold tracking-wide text-center drop-shadow">{name}</span>
          <span className="text-white/75 text-xs tracking-widest uppercase text-center drop-shadow">{role}</span>
        </div>
      </div>
    </div>
  );
}

export default function AboutTeamSection({
  backgroundColor = "#f6e6c9",
}: {
  backgroundColor?: string;
}) {
  return (
    <section
      className="flex flex-col items-center pt-2 pb-16 px-8 md:px-14 gap-14"
      style={{ backgroundColor }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {team.map((m, i) => (
          <TeamCard key={m.src} {...m} delay={i * 150} />
        ))}
      </div>
    </section>
  );
}
