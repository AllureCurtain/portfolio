"use client";

import ScrollProgress from "./ScrollProgress";
import SmoothScroll from "./SmoothScroll";
import TimeAmbient from "./TimeAmbient";

export default function HomeExperience({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-portfolio-experience>
      <SmoothScroll>
        <ScrollProgress />
        <TimeAmbient />
        {children}
      </SmoothScroll>
    </div>
  );
}
