"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "../data/site";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canUsePointerEffect = window.matchMedia(
      "(pointer: fine) and (min-width: 768px)"
    ).matches;
    let frameId = 0;
    let latestPointer: MouseEvent | null = null;

    const ctx = gsap.context(() => {
      const chars = titleRef.current!.querySelectorAll(".char");

      if (reduceMotion) {
        gsap.set([titleRef.current, subtitleRef.current, lineRef.current], {
          clearProps: "all",
        });
        return;
      }

      // Entry animation
      const tl = gsap.timeline({ defaults: { ease: "power4.out" }, delay: 2.4 });

      tl.from(chars, {
        yPercent: 110,
        opacity: 0,
        duration: 1.2,
        stagger: 0.04,
      })
        .from(
          subtitleRef.current,
          { yPercent: 40, opacity: 0, duration: 1 },
          "-=0.7"
        )
        .from(
          lineRef.current,
          { scaleX: 0, duration: 1.2, ease: "power3.inOut" },
          "-=0.6"
        );

      // Scroll parallax: hero content fades and scales down as you scroll
      gsap.to(contentRef.current, {
        yPercent: -20,
        opacity: 0,
        scale: 0.95,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      const updateCharacters = (e: MouseEvent) => {
        chars.forEach((char) => {
          const rect = (char as HTMLElement).getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const dist = Math.hypot(dx, dy);
          const radius = 180;
          if (dist < radius) {
            const force = (1 - dist / radius) * 30;
            const angle = Math.atan2(dy, dx);
            gsap.to(char, {
              x: -Math.cos(angle) * force,
              y: -Math.sin(angle) * force,
              rotation: (Math.random() - 0.5) * 8,
              duration: 0.6,
              ease: "power3.out",
            });
          } else {
            gsap.to(char, {
              x: 0,
              y: 0,
              rotation: 0,
              duration: 0.8,
              ease: "elastic.out(1, 0.5)",
            });
          }
        });
      };

      if (!canUsePointerEffect) {
        return;
      }

      // Character scatter on mouse proximity
      const handleMove = (e: MouseEvent) => {
        latestPointer = e;

        if (frameId) return;

        frameId = requestAnimationFrame(() => {
          frameId = 0;
          if (latestPointer) updateCharacters(latestPointer);
        });
      };

      window.addEventListener("mousemove", handleMove, { passive: true });
      return () => {
        window.removeEventListener("mousemove", handleMove);
        if (frameId) cancelAnimationFrame(frameId);
      };
    }, containerRef);

    return () => {
      ctx.revert();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, []);

  const title = siteConfig.identity.name;

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative flex flex-col justify-end pb-24 md:pb-32"
    >
      <div ref={contentRef} className="max-w-[90rem] w-full mx-auto">
        <div className="reveal-line">
          <h1
            ref={titleRef}
            className="text-[clamp(3rem,12vw,12rem)] font-light leading-[0.9] tracking-[-0.04em]"
            aria-label={title}
          >
            {title.split("").map((c, i) => (
              <span
                key={i}
                className="char inline-block will-change-transform"
                aria-hidden="true"
              >
                {c === " " ? " " : c}
              </span>
            ))}
          </h1>
        </div>
        <p
          ref={subtitleRef}
          className="mt-6 text-[var(--accent)] text-lg md:text-xl font-light tracking-wide"
        >
          {siteConfig.identity.role}
        </p>
        <div
          ref={lineRef}
          className="mt-12 h-px bg-[var(--border)] origin-left"
        />
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-30">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
