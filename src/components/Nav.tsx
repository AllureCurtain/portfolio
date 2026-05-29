"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "../data/site";

gsap.registerPlugin(ScrollTrigger);

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    let lastScroll = 0;

    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const direction = self.direction;
        const scroll = self.scroll();

        if (scroll < 100) {
          gsap.to(nav, { yPercent: 0, duration: 0.4 });
        } else if (direction === 1 && scroll > lastScroll) {
          gsap.to(nav, { yPercent: -100, duration: 0.4, ease: "power2.inOut" });
        } else if (direction === -1) {
          gsap.to(nav, { yPercent: 0, duration: 0.4, ease: "power2.inOut" });
        }

        lastScroll = scroll;
      },
    });

    return () => {
      trigger.kill();
      gsap.killTweensOf(nav);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[var(--background)]/70 border-b border-[var(--border)]/50"
    >
      <div className="max-w-[90rem] mx-auto px-4 md:px-12 py-5 flex justify-between items-center gap-4">
        <a href="#home" className="text-sm font-medium tracking-wide">
          {siteConfig.identity.logo}
        </a>
        <div className="flex gap-5 md:gap-8">
          {siteConfig.nav.map((item) => (
            <MagneticLink key={item.label} href={item.href}>
              {item.label}
            </MagneticLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

function MagneticLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current!, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="text-sm text-[var(--accent)] hover:text-[var(--foreground)] transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-[var(--foreground)] hover:after:w-full after:transition-all after:duration-300"
    >
      {children}
    </a>
  );
}
