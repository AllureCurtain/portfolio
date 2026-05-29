import Nav from "../components/Nav";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import HomeExperience from "../components/HomeExperience";

export default function Home() {
  return (
    <HomeExperience>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </HomeExperience>
  );
}
