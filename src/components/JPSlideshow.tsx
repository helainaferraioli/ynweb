"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const photos = [
  { src: "/images/about/1970s%20Prospect%20Park.png",    position: "center 65%" },
  { src: "/images/about/1983%20President%20Street.png",  position: "center top" },
  { src: "/images/about/1990s%20Collection%20Room.png",   position: "center 10%" },
  { src: "/images/about/Dad%20Collection%20Room%202.png", position: "center top" },
];

export default function JPSlideshow() {
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
            alt="JP Ferraioli"
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
