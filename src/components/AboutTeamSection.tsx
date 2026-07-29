"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react"; // useState kept for fade-in visibility

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
      <div className="relative overflow-hidden" style={{ aspectRatio: "2/3" }}>
        <Image src={src} alt={name} fill className="object-cover object-top" sizes="25vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-6 flex flex-col items-center gap-1 px-4">
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
      className="flex flex-col items-center pt-2 pb-8 px-8 md:px-14 gap-14"
      style={{ backgroundColor: "#f6e6c9" }}
    >
      <h2 className="hidden md:block font-serif text-4xl w-full mt-8 -mb-8" style={{ color: "#1a0a0e" }}>
        The faces behind the magic
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {team.map((m, i) => (
          <TeamCard key={m.src} {...m} delay={i * 150} />
        ))}
      </div>
    </section>
  );
}
