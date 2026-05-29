import {
  getProjectHref,
  getProjectLinks,
  isExternalUrl,
  siteConfig,
} from "../data/site";

export default function ProjectBriefs() {
  return (
    <section id="work" className="portfolio-section">
      <div className="portfolio-shell">
        <div className="section-kicker">Selected systems</div>
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <h2 className="section-title">Projects explained as systems, not thumbnails.</h2>
            <p className="mt-5 max-w-[54ch] text-base leading-7 text-[var(--accent)]">
              Each project is presented by the constraint it solves: code
              collaboration, high-concurrency coupon delivery, or reliable LLM
              question answering.
            </p>
          </div>
          <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
            {siteConfig.projects.map((project, index) => {
              const href = getProjectHref(project);
              const links = getProjectLinks(project);

              return (
                <article
                  key={project.title}
                  className="grid gap-5 py-7 md:grid-cols-[auto_1fr] md:gap-8"
                >
                  <div className="text-sm tabular-nums text-[var(--accent)]">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h3 className="text-2xl font-light tracking-normal md:text-4xl">
                        {project.title}
                      </h3>
                      <span className="text-sm text-[var(--accent)]">{project.year}</span>
                    </div>
                    <p className="mt-4 max-w-[72ch] text-sm leading-7 text-[var(--accent)] md:text-base">
                      {project.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="border border-[var(--border)] px-3 py-1 text-xs text-[var(--accent)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {href ? (
                      <div className="mt-6 flex flex-wrap gap-4">
                        {links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target={isExternalUrl(link.href) ? "_blank" : undefined}
                            rel={isExternalUrl(link.href) ? "noreferrer" : undefined}
                            className="text-sm text-[var(--foreground)] underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#bfe5d9]"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
