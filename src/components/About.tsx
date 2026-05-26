"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const words = textRef.current!.querySelectorAll(".word");

      if (reduceMotion) {
        gsap.set(words, { opacity: 1 });
        return;
      }

      // Label slide in
      gsap.from(labelRef.current, {
        xPercent: -20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Words reveal with scrub
      gsap.set(words, { opacity: 0.1, y: 8 });
      gsap.to(words, {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 55%",
          end: "center 40%",
          scrub: 1,
        },
      });

      // Parallax on the whole text block
      gsap.to(textRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const text =
    "I craft digital experiences at the intersection of design and engineering. Focused on creating things that are both beautiful and functional. Every pixel matters, every interaction tells a story.";

  return (
    <section ref={sectionRef} id="about" className="items-start pt-32 md:pt-48">
      <div className="max-w-[90rem] w-full mx-auto">
        <span
          ref={labelRef}
          className="text-[var(--accent)] text-sm uppercase tracking-[0.2em] mb-12 block"
        >
          About
        </span>
        <p
          ref={textRef}
          className="text-[clamp(1.5rem,4vw,3.5rem)] font-light leading-[1.3] tracking-[-0.02em] max-w-5xl"
        >
          {text.split(" ").map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em] will-change-transform">
              {word}
            </span>
          ))}
        </p>
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <Stat number="5+" label="Years Experience" />
          <Stat number="30+" label="Projects Completed" />
          <Stat number="10+" label="Happy Clients" />
          <Stat number="∞" label="Cups of Coffee" />
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    gsap.from(ref.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div ref={ref} className="border-t border-[var(--border)] pt-4">
      <div className="text-3xl md:text-4xl font-light">{number}</div>
      <div className="text-sm text-[var(--accent)] mt-1">{label}</div>
    </div>
  );
}
