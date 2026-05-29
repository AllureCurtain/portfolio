import Contact from "../components/Contact";
import HomeExperience from "../components/HomeExperience";
import Nav from "../components/Nav";
import ProjectBriefs from "../components/ProjectBriefs";
import SystemVisual from "../components/SystemVisual";
import { siteConfig } from "../data/site";

const focusAreas = [
  "Rust monorepo infrastructure",
  "High-concurrency Java services",
  "RAG and LLM workflow reliability",
];

export default function Home() {
  return (
    <HomeExperience>
      <Nav />
      <main>
        <section id="home" className="portfolio-section pt-32 md:pt-40">
          <div className="portfolio-shell grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <p className="section-kicker">{siteConfig.identity.role}</p>
              <h1 className="mt-6 max-w-[12ch] text-5xl font-light leading-[1.02] tracking-normal md:text-7xl">
                Yao builds backend systems that stay clear under load.
              </h1>
              <p className="mt-7 max-w-[62ch] text-base leading-7 text-[var(--accent)] md:text-lg">
                I work across Rust infrastructure, Java services, and AI
                knowledge systems. This portfolio now focuses on the systems,
                constraints, and measurable outcomes behind the projects.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {focusAreas.map((area) => (
                  <span
                    key={area}
                    className="border border-[var(--border)] px-4 py-2 text-sm leading-5 text-[var(--accent)]"
                  >
                    {area}
                  </span>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#work"
                  className="inline-flex min-h-11 items-center border border-[#8fc5b5]/50 bg-[#8fc5b5]/10 px-5 text-sm text-[#d9f4ec] transition-colors hover:bg-[#8fc5b5]/16"
                >
                  View projects
                </a>
                <a
                  href={`mailto:${siteConfig.identity.email}`}
                  className="inline-flex min-h-11 items-center break-all border border-[var(--border)] px-5 text-sm text-[var(--foreground)] transition-colors hover:border-white/35"
                >
                  {siteConfig.identity.email}
                </a>
              </div>
            </div>
            <SystemVisual />
          </div>
        </section>

        <section id="about" className="portfolio-section">
          <div className="portfolio-shell grid gap-10 lg:grid-cols-[0.6fr_1.4fr]">
            <div>
              <p className="section-kicker">{siteConfig.about.label}</p>
              <h2 className="section-title mt-4">What the page should make obvious.</h2>
            </div>
            <div>
              <p className="max-w-[72ch] text-2xl font-light leading-[1.35] tracking-normal md:text-4xl">
                {siteConfig.about.body}
              </p>
              <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
                {siteConfig.about.stats.map((stat) => (
                  <div key={stat.label} className="border-t border-[var(--border)] pt-4">
                    <div className="text-3xl font-light">{stat.value}</div>
                    <div className="mt-2 text-sm leading-5 text-[var(--accent)]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ProjectBriefs />
        <Contact />
      </main>
    </HomeExperience>
  );
}
