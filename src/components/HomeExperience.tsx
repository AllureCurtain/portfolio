"use client";

import { useCallback, useState } from "react";
import Cursor from "./Cursor";
import Loader from "./Loader";
import ScrollProgress from "./ScrollProgress";
import SmoothScroll from "./SmoothScroll";
import TimeAmbient from "./TimeAmbient";

export default function HomeExperience({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);
  const handleComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Loader onComplete={handleComplete} />
      <div
        data-portfolio-experience
        className={`transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        <SmoothScroll>
          <ScrollProgress />
          <TimeAmbient />
          <Cursor />
          {children}
        </SmoothScroll>
      </div>
    </>
  );
}
