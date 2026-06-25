"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const photos = Array.from({ length: 12 }, (_, i) =>
  `/images/Slideshow%20Photo%20${i + 1}.webp`
);

export default function AboutSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((a) => (a + 1) % photos.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0">
      {photos.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0"
          style={{
            opacity: i === active ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <Image
            src={src}
            alt="Yesterday's News"
            fill
            className="object-cover"
            sizes="50vw"
          />
        </div>
      ))}
    </div>
  );
}
