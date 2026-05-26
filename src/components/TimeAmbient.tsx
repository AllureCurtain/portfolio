"use client";

import { useEffect, useState } from "react";

function getTimeGradient() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "radial-gradient(ellipse at 80% 20%, rgba(255,240,220,0.03) 0%, transparent 60%)";
  if (hour >= 12 && hour < 18) return "radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 60%)";
  if (hour >= 18 && hour < 22) return "radial-gradient(ellipse at 20% 80%, rgba(255,180,100,0.04) 0%, transparent 60%)";
  return "radial-gradient(ellipse at 50% 50%, rgba(100,130,255,0.03) 0%, transparent 60%)";
}

function getTimeMessage() {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return "Good morning";
  if (hour >= 12 && hour < 18) return "Good afternoon";
  if (hour >= 18 && hour < 22) return "Good evening";
  return "Late night";
}

export default function TimeAmbient() {
  const [gradient, setGradient] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setGradient(getTimeGradient());
    setMessage(getTimeMessage());
  }, []);

  if (!gradient) return null;

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000"
        style={{ background: gradient }}
        aria-hidden="true"
      />
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-12 z-40 text-xs text-[var(--accent)] opacity-50">
        {message}
      </div>
    </>
  );
}
