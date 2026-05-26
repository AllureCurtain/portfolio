"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current!;
    const follower = followerRef.current!;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.4 });
    };

    const handleEnter = () => {
      gsap.to(follower, { scale: 2.5, opacity: 0.5, duration: 0.3 });
    };

    const handleLeave = () => {
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 });
    };

    window.addEventListener("mousemove", moveCursor);

    const links = document.querySelectorAll("a, button, [data-hover]");
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleEnter);
      link.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleEnter);
        link.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      />
    </>
  );
}
