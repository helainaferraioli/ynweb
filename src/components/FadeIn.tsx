"use client";

import { useEffect, useRef, useState } from "react";

export default function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => setVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) show(); },
      { threshold: 0, rootMargin: "0px 0px 100px 0px" }
    );
    observer.observe(el);

    // Safari sometimes hasn't finished layout when the effect first runs —
    // defer the viewport check by one frame so getBoundingClientRect is accurate
    const raf = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 100) show();
    });

    return () => { observer.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity 0.9s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
