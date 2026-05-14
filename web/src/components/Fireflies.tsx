"use client";

import { useMemo } from "react";

type Props = {
  count?: number;
  className?: string;
};

function seeded(index: number, salt: number) {
  const x = Math.sin(index * 97.13 + salt * 31.7) * 10000;
  return x - Math.floor(x);
}

export function Fireflies({ count = 18, className }: Props) {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: (seeded(i + 1, count) * 100).toFixed(4),
        top: (seeded(i + 1, count + 4) * 100).toFixed(4),
        size: (4 + seeded(i + 1, count + 8) * 10).toFixed(4),
        delay: (seeded(i + 1, count + 12) * 5).toFixed(4),
        duration: (5 + seeded(i + 1, count + 16) * 6).toFixed(4),
        opacity: (0.4 + seeded(i + 1, count + 20) * 0.5).toFixed(4),
      })),
    [count]
  );

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`} aria-hidden>
      {dots.map((d, i) => (
        <span
          key={i}
          className="firefly"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            opacity: d.opacity,
          }}
        />
      ))}
    </div>
  );
}
