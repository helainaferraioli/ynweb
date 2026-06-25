"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const team = [
  { src: "/images/Dad%20Team%20Photo.webp",     name: "JP Ferraioli",      role: "Owner" },
  { src: "/images/Mom%20Team%20Photo.webp",     name: "Colleen Ferraioli", role: "Owner" },
  { src: "/images/Helaina%20Team%20Photo.webp", name: "Helaina Ferraioli", role: "Manager" },
  { src: "/images/Craig%20Team%20Photo.webp",   name: "Craig Scotti",      role: "Employee" },
];

function TeamCard({
  src, name, role, delay,
}: {
  src: string; name: string; role: string; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

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
      className="flex flex-col flex-1 min-w-0"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {/* Photo */}
      <div
        className="relative overflow-hidden cursor-default"
        style={{ aspectRatio: "2/3" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image src={src} alt={name} fill className="object-cover object-top" sizes="25vw" />

        {/* Hover lower-third gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
          style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.35s ease" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 pb-6 flex flex-col items-center gap-1 px-4"
          style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.35s ease" }}
        >
          <span className="text-white text-base font-bold tracking-wide text-center drop-shadow">{name}</span>
          <span className="text-white/75 text-xs tracking-widest uppercase text-center drop-shadow">{role}</span>
        </div>
      </div>
    </div>
  );
}

export default function AboutTeamSection() {
  return (
    <section
      className="flex flex-col items-center py-20 px-8 gap-14"
      style={{ backgroundColor: "#f6e6c9" }}
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "#971B2E" }}>
          The People Behind It
        </span>
        <h2 className="font-serif text-3xl md:text-4xl font-bold" style={{ color: "#1a0a0e" }}>
          Meet the Team
        </h2>
      </div>
      <div className="flex gap-4 w-full max-w-6xl">
        {team.map((m, i) => (
          <TeamCard key={m.src} {...m} delay={i * 150} />
        ))}
      </div>
    </section>
  );
}
