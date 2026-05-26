"use client";

import { useState, useCallback } from "react";
import SmoothScroll from "../components/SmoothScroll";
import Loader from "../components/Loader";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Cursor from "../components/Cursor";
import TimeAmbient from "../components/TimeAmbient";
import ScrollProgress from "../components/ScrollProgress";

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const handleComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      <Loader onComplete={handleComplete} />
      <div
        className={`transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        <SmoothScroll>
          <ScrollProgress />
          <TimeAmbient />
          <Cursor />
          <Nav />
          <main>
            <Hero />
            <About />
            <Projects />
            <Contact />
          </main>
        </SmoothScroll>
      </div>
    </>
  );
}
