"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const chars = headingRef.current!.querySelectorAll(".contact-char");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(chars, {
        yPercent: 110,
        opacity: 0,
        rotation: 8,
        duration: 1.2,
        stagger: 0.03,
        ease: "power4.out",
      }).from(
        linksRef.current,
        { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      );

      // Infinite marquee
      if (marqueeRef.current) {
        const marqueeWidth = marqueeRef.current.scrollWidth / 2;
        gsap.to(marqueeRef.current, {
          x: -marqueeWidth,
          duration: 20,
          ease: "none",
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const heading = "Let's work together";

  return (
    <section ref={sectionRef} id="contact" className="items-end pb-16 md:pb-24">
      <div className="max-w-[90rem] w-full mx-auto">
        <span className="text-[var(--accent)] text-sm uppercase tracking-[0.2em] mb-12 block">
          Contact
        </span>
        <div className="reveal-line">
          <h2
            ref={headingRef}
            className="text-[clamp(2rem,8vw,7rem)] font-light leading-[1] tracking-[-0.04em]"
            aria-label={heading}
          >
            {heading.split("").map((c, i) => (
              <span
                key={i}
                className="contact-char inline-block will-change-transform"
                aria-hidden="true"
              >
                {c === " " ? " " : c}
              </span>
            ))}
          </h2>
        </div>
        <div ref={linksRef} className="mt-12 flex flex-col md:flex-row gap-8">
          <ContactLink href="mailto:hello@yourname.com">hello@yourname.com</ContactLink>
          <ContactLink href="#">GitHub</ContactLink>
          <ContactLink href="#">LinkedIn</ContactLink>
          <ContactLink href="#">Twitter</ContactLink>
        </div>

        {/* Marquee */}
        <div className="mt-32 overflow-hidden border-y border-[var(--border)] py-6">
          <div
            ref={marqueeRef}
            className="flex whitespace-nowrap text-2xl md:text-4xl font-light tracking-[-0.02em] text-[var(--accent)] gap-12 will-change-transform"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="flex items-center gap-12 shrink-0">
                Available for work
                <span className="text-[var(--foreground)]">●</span>
                Open to collaboration
                <span className="text-[var(--foreground)]">●</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border)] flex justify-between items-center">
          <span className="text-sm text-[var(--accent)]">
            &copy; {new Date().getFullYear()}
          </span>
          <span className="text-sm text-[var(--accent)]">Built with care</span>
        </div>
      </div>
    </section>
  );
}

function ContactLink({ href, children }: { href: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <a
      ref={ref}
      href={href}
      className="group relative text-lg overflow-hidden inline-block"
    >
      <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full text-[var(--accent)]">
        {children}
      </span>
      <span className="absolute top-full left-0 block transition-transform duration-500 ease-out group-hover:-translate-y-full text-[var(--foreground)]">
        {children}
      </span>
    </a>
  );
}
