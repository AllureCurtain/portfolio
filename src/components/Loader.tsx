"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const container = containerRef.current;

    if (reduceMotion) {
      if (counterRef.current) {
        counterRef.current.textContent = "100";
      }

      const timeout = window.setTimeout(() => {
        setDone(true);
        onComplete();
      }, 50);

      return () => window.clearTimeout(timeout);
    }

    const counter = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.1,
          ease: "power4.inOut",
          onComplete: () => {
            setDone(true);
            onComplete();
          },
        });
      },
    });

    tl.to(counter, {
      value: 100,
      duration: 1.8,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
        }
      },
    });

    return () => {
      tl.kill();
      gsap.killTweensOf(container);
    };
  }, [onComplete]);

  if (done) return null;

  return (
    <div
      data-loader
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[var(--background)] flex items-end justify-between px-6 md:px-12 pb-8"
    >
      <span className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
        Loading
      </span>
      <span
        ref={counterRef}
        className="text-[clamp(4rem,15vw,12rem)] font-light leading-none tracking-tighter tabular-nums"
      >
        000
      </span>
    </div>
  );
}
