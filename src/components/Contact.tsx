import { isExternalUrl, siteConfig } from "../data/site";

export default function Contact() {
  const contactLinks = [
    {
      label: siteConfig.identity.email,
      href: `mailto:${siteConfig.identity.email}`,
    },
    ...siteConfig.socialLinks,
  ];

  return (
    <section id="contact" className="portfolio-section pb-16 md:pb-24">
      <div className="portfolio-shell">
        <div className="grid gap-10 border-t border-[var(--border)] pt-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <p className="section-kicker">{siteConfig.contact.label}</p>
            <h2 className="section-title mt-4">{siteConfig.contact.heading}</h2>
          </div>
          <div className="flex flex-col justify-between gap-10">
            <div className="flex flex-wrap gap-3">
              {siteConfig.contact.availability.map((item) => (
                <span
                  key={item}
                  className="border border-[var(--border)] px-4 py-2 text-sm text-[var(--accent)]"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              {contactLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={isExternalUrl(link.href) ? "_blank" : undefined}
                  rel={isExternalUrl(link.href) ? "noreferrer" : undefined}
                  className="break-all text-base text-[var(--foreground)] underline decoration-white/25 underline-offset-4 transition-colors hover:text-[#bfe5d9]"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex justify-between gap-6 border-t border-[var(--border)] pt-6 text-sm text-[var(--accent)]">
              <span>&copy; {new Date().getFullYear()}</span>
              <span>{siteConfig.contact.footerNote}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
