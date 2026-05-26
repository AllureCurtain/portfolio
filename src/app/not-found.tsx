"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function NotFound() {
  const numberRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(numberRef.current, { yPercent: 100, opacity: 0, duration: 1.2 })
      .from(textRef.current, { y: 20, opacity: 0, duration: 0.8 }, "-=0.5");
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <span
        ref={numberRef}
        className="text-[clamp(6rem,20vw,16rem)] font-light leading-none tracking-tighter"
      >
        404
      </span>
      <p
        ref={textRef}
        className="mt-6 text-[var(--accent)] text-lg md:text-xl"
      >
        This page doesn&apos;t exist.{" "}
        <Link
          href="/"
          className="text-[var(--foreground)] underline underline-offset-4 hover:no-underline transition-all"
        >
          Go home
        </Link>
      </p>
    </div>
  );
}
