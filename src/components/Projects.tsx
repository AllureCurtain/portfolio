"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Project One",
    description: "A brief description of this project and what it does.",
    tags: ["Design", "Development"],
    year: "2025",
    color: "#1a1a2e",
  },
  {
    title: "Project Two",
    description: "Another project showcasing different skills.",
    tags: ["Branding", "UI/UX"],
    year: "2024",
    color: "#16213e",
  },
  {
    title: "Project Three",
    description: "Something experimental and creative.",
    tags: ["Creative Dev", "3D"],
    year: "2024",
    color: "#0f3460",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        gsap.from(item, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse",
          },
        });

        // Stagger the line separator
        const line = item.querySelector(".project-line");
        if (line) {
          gsap.from(line, {
            scaleX: 0,
            duration: 0.8,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (previewRef.current && activeIndex >= 0) {
        gsap.to(previewRef.current, {
          x: e.clientX + 20,
          y: e.clientY - 40,
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [activeIndex]);

  const handleEnter = (i: number) => {
    setActiveIndex(i);
    gsap.to(previewRef.current, { opacity: 1, scale: 1, duration: 0.3 });
  };

  const handleLeave = () => {
    setActiveIndex(-1);
    gsap.to(previewRef.current, { opacity: 0, scale: 0.9, duration: 0.3 });
  };

  return (
    <section ref={sectionRef} id="work" className="items-start pt-32 md:pt-48">
      <div className="max-w-[90rem] w-full mx-auto">
        <span className="text-[var(--accent)] text-sm uppercase tracking-[0.2em] mb-16 block">
          Selected Work
        </span>
        <div className="flex flex-col">
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => { if (el) itemsRef.current[i] = el; }}
              className="group cursor-pointer"
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={handleLeave}
            >
              <div className="project-line h-px bg-[var(--border)] origin-left" />
              <div className="py-10 md:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-baseline gap-6">
                  <span className="text-[var(--accent)] text-sm tabular-nums opacity-50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-2xl md:text-5xl font-light tracking-[-0.02em] group-hover:translate-x-4 transition-all duration-500 group-hover:text-white">
                      {project.title}
                    </h3>
                    <p className="text-[var(--accent)] mt-2 text-sm md:text-base max-w-md">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="flex gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs border border-[var(--border)] rounded-full px-3 py-1 text-[var(--accent)] group-hover:border-white/30 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[var(--accent)] text-sm">
                    {project.year}
                  </span>
                  <svg
                    className="w-5 h-5 text-[var(--accent)] group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
          <div className="project-line h-px bg-[var(--border)]" />
        </div>
      </div>

      {/* Hover preview card */}
      <div
        ref={previewRef}
        className="fixed top-0 left-0 w-48 h-32 rounded-lg pointer-events-none z-50 opacity-0 scale-90 overflow-hidden hidden md:block"
        style={{
          backgroundColor: activeIndex >= 0 ? projects[activeIndex]?.color : "#1a1a2e",
        }}
      >
        <div className="w-full h-full flex items-center justify-center text-white/50 text-xs uppercase tracking-widest">
          {activeIndex >= 0 ? projects[activeIndex]?.title : ""}
        </div>
      </div>
    </section>
  );
}
