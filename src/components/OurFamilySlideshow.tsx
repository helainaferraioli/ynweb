"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const photos = [
  { src: "/images/about/Mom%26Me%20Opening%20Day.png", position: "center top" },
  { src: "/images/about/Dad%20Baby%20YN.png",          position: "center top" },
  { src: "/images/about/Dad%20%26%20Craig.png",        position: "center top" },
];

export default function OurFamilySlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % photos.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0">
      {photos.map(({ src, position }, i) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{
            opacity: i === active ? 1 : 0,
            transition: "opacity 0.9s ease",
          }}
        >
          <Image
            src={src}
            alt="The Ferraioli Family"
            fill
            className="object-cover"
            style={{ objectPosition: position }}
            sizes="50vw"
          />
        </div>
      ))}
    </div>
  );
}
