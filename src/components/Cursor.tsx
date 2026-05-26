"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<MutationObserver | null>(null);

  const bindHoverTargets = useCallback(() => {
    const follower = followerRef.current;
    if (!follower) return;

    const handleEnter = () => {
      gsap.to(follower, { scale: 2.5, opacity: 0.5, duration: 0.3 });
    };
    const handleLeave = () => {
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
    };

    const links = document.querySelectorAll("a, button, [data-hover]");
    links.forEach((link) => {
      if (!(link as HTMLElement).dataset.cursorBound) {
        link.addEventListener("mouseenter", handleEnter);
        link.addEventListener("mouseleave", handleLeave);
        (link as HTMLElement).dataset.cursorBound = "1";
      }
    });
  }, []);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    const cursor = cursorRef.current!;
    const follower = followerRef.current!;

    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 });

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1, overwrite: true });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.4, overwrite: true });
    };

    window.addEventListener("mousemove", moveCursor);
    bindHoverTargets();

    observerRef.current = new MutationObserver(() => {
      bindHoverTargets();
    });
    observerRef.current.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      observerRef.current?.disconnect();
    };
  }, [bindHoverTargets]);

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
