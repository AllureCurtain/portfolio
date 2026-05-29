"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)"
    );

    const updateEnabled = () => setEnabled(query.matches);

    updateEnabled();
    query.addEventListener("change", updateEnabled);

    return () => query.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current!;
    const follower = followerRef.current!;

    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, overwrite: true });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.4, overwrite: true });
    };

    const handlePointerOver = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest("a, button, [data-hover]")) {
        gsap.to(follower, { scale: 2.5, opacity: 0.5, duration: 0.3 });
      }
    };

    const handlePointerOut = (event: PointerEvent) => {
      if ((event.target as Element | null)?.closest("a, button, [data-hover]")) {
        gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("pointerover", handlePointerOver, { passive: true });
    document.addEventListener("pointerout", handlePointerOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      gsap.killTweensOf([cursor, follower]);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/40 rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:block"
      />
    </>
  );
}
