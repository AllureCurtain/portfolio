"use client";

import { useEffect, useState } from "react";
import { Alignment, Fit, Layout, useRive } from "@rive-app/react-canvas";

type SystemVisualProps = {
  className?: string;
};

const riveSrc = "/rive/portfolio-system.riv";

const fallbackNodes = [
  { label: "API", x: "17%", y: "35%" },
  { label: "Redis", x: "34%", y: "16%" },
  { label: "RocketMQ", x: "68%", y: "34%" },
  { label: "MySQL", x: "64%", y: "76%" },
  { label: "RAG", x: "25%", y: "68%" },
];

export default function SystemVisual({ className = "" }: SystemVisualProps) {
  const [canLoadRive, setCanLoadRive] = useState(
    () =>
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [riveFailed, setRiveFailed] = useState(false);

  useEffect(() => {
    if (!canLoadRive) {
      return;
    }

    const controller = new AbortController();

    fetch(riveSrc, { method: "HEAD", signal: controller.signal })
      .then((response) => setCanLoadRive(response.ok))
      .catch(() => setCanLoadRive(false));

    return () => controller.abort();
  }, [canLoadRive]);

  const { RiveComponent } = useRive(
    canLoadRive
      ? {
          src: riveSrc,
          autoplay: true,
          layout: new Layout({
            fit: Fit.Contain,
            alignment: Alignment.Center,
          }),
          onLoadError: () => setRiveFailed(true),
        }
      : undefined,
    { shouldResizeCanvasToContainer: true }
  );

  return (
    <div
      className={`relative min-h-[420px] overflow-hidden border border-[var(--border)] bg-[rgba(255,255,255,0.03)] p-5 md:min-h-[560px] md:p-8 ${className}`}
      aria-label="Backend system animation"
    >
      {canLoadRive && !riveFailed ? (
        <RiveComponent className="absolute inset-0 h-full w-full" />
      ) : (
        <FallbackSystemVisual />
      )}
      <div className="pointer-events-none absolute inset-x-5 bottom-5 border-t border-white/10 pt-4 text-xs uppercase tracking-[0.18em] text-[var(--accent)] md:inset-x-8 md:bottom-8">
        Rive-ready system map
      </div>
    </div>
  );
}

function FallbackSystemVisual() {
  return (
    <div className="fallback-system-visual absolute inset-0">
      <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/[0.03]" />
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 600 520"
        fill="none"
        role="presentation"
      >
        <path
          className="system-flow system-flow-a"
          d="M92 180 C210 88 348 86 500 182"
        />
        <path
          className="system-flow system-flow-b"
          d="M498 186 C500 326 420 420 292 366"
        />
        <path
          className="system-flow system-flow-c"
          d="M292 366 C176 432 86 336 92 180"
        />
      </svg>
      {fallbackNodes.map((node) => (
        <div
          key={node.label}
          className="system-node absolute z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white/15 bg-[var(--background)] text-[0.7rem] text-[var(--foreground)] md:h-20 md:w-20 md:text-sm"
          style={{ left: node.x, top: node.y }}
        >
          {node.label}
        </div>
      ))}
      <div className="absolute left-1/2 top-1/2 z-20 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-[#8fc5b5]/40 bg-[#8fc5b5]/10 text-center text-sm text-[#bfe5d9] md:h-28 md:w-28">
        Yao
        <br />
        Backend
      </div>
    </div>
  );
}
