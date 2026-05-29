export type SiteLink = {
  label: string;
  href: string;
};

export type SiteStat = {
  value: string;
  label: string;
};

export type SiteProject = {
  title: string;
  description: string;
  tags: string[];
  year: string;
  color: string;
  liveUrl?: string;
  repoUrl?: string;
  caseStudyUrl?: string;
};

export type SiteConfig = {
  identity: {
    name: string;
    logo: string;
    role: string;
    domain: string;
    email: string;
  };
  seo: {
    title: string;
    description: string;
    locale: string;
  };
  nav: SiteLink[];
  about: {
    label: string;
    body: string;
    stats: SiteStat[];
  };
  projects: SiteProject[];
  socialLinks: SiteLink[];
  contact: {
    label: string;
    heading: string;
    availability: string[];
    footerNote: string;
  };
};

const baseUrl = "http://localhost:3000";

export const siteConfig: SiteConfig = {
  identity: {
    name: "Portfolio Owner",
    logo: "PO.",
    role: "Designer & Developer",
    domain: baseUrl,
    email: "",
  },
  seo: {
    title: "Portfolio Owner - Designer & Developer",
    description:
      "A motion-rich portfolio for a designer and developer. Final identity, project details, and production domain are centralized here for launch updates.",
    locale: "en_US",
  },
  nav: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ],
  about: {
    label: "About",
    body:
      "I craft digital experiences at the intersection of design and engineering. This portfolio is ready for final biography, proof points, and launch details once the real content is available.",
    stats: [],
  },
  projects: [
    {
      title: "Portfolio Case Study",
      description:
        "A featured project slot prepared for a real case study, including optional live, source, and write-up links.",
      tags: ["Design", "Development"],
      year: "2026",
      color: "#1a1a2e",
    },
    {
      title: "Product Interface",
      description:
        "A second work slot for a shipped interface or product system with concrete outcomes.",
      tags: ["UI/UX", "Frontend"],
      year: "2026",
      color: "#16213e",
    },
    {
      title: "Interactive Experiment",
      description:
        "An experimental build slot for motion, creative development, or technical exploration.",
      tags: ["Creative Dev", "Motion"],
      year: "2026",
      color: "#0f3460",
    },
  ],
  socialLinks: [],
  contact: {
    label: "Contact",
    heading: "Let's work together",
    availability: ["Available for work", "Open to collaboration"],
    footerNote: "Built with care",
  },
};

export const siteUrl = new URL(siteConfig.identity.domain);

export function getProjectHref(project: SiteProject) {
  return project.caseStudyUrl ?? project.liveUrl ?? project.repoUrl;
}

export function getProjectLinks(project: SiteProject): SiteLink[] {
  return [
    project.liveUrl ? { label: "Live", href: project.liveUrl } : null,
    project.repoUrl ? { label: "Code", href: project.repoUrl } : null,
    project.caseStudyUrl
      ? { label: "Case Study", href: project.caseStudyUrl }
      : null,
  ].filter((link): link is SiteLink => Boolean(link));
}

export function isExternalUrl(href: string) {
  return /^https?:\/\//.test(href);
}
