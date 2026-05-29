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

const baseUrl = "https://785777.xyz";

export const siteConfig: SiteConfig = {
  identity: {
    name: "Yao",
    logo: "Y.",
    role: "Java / Rust Backend Developer",
    domain: baseUrl,
    email: "alluresocina@163.com",
  },
  seo: {
    title: "Yao - Java / Rust Backend Developer",
    description:
      "Portfolio of Yao, a backend developer focused on high-concurrency Java systems, Rust infrastructure, and AI knowledge applications.",
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
      "I build high-concurrency backend systems, Rust infrastructure, and AI knowledge applications. My work spans monorepo collaboration, coupon distribution, and production LLM Q&A systems, with a focus on reliable data flow, queueing, caching, and measurable performance.",
    stats: [
      { value: "3.7k", label: "QPS cache-hit benchmark" },
      { value: "2ms", label: "p95 query latency" },
      { value: "Rust", label: "Monorepo infrastructure" },
      { value: "CET-6", label: "English certification" },
    ],
  },
  projects: [
    {
      title: "Mega",
      description:
        "Open-source monorepo collaboration infrastructure for Git, code review, and build workflows. I worked on commit history APIs, build triggers, merge queue flow, permission checks, diff rename detection, and code blame.",
      tags: ["Rust", "Git", "Monorepo", "Cedar", "Redis"],
      year: "2025",
      color: "#12312b",
      repoUrl: "https://github.com/AllureCurtain/mega",
    },
    {
      title: "QuanXiangJia",
      description:
        "High-concurrency coupon platform covering seckill claiming, distribution, settlement, search, reservation storage, and delayed reminders. The cache-hit pressure test reached about 3.7k QPS with p95 latency around 2ms.",
      tags: ["Spring Boot", "RocketMQ", "Redis", "MySQL", "Redisson"],
      year: "2025",
      color: "#2b2615",
    },
    {
      title: "IntelliQA",
      description:
        "Production LLM Q&A platform for enterprise knowledge silos, combining parallel retrieval, query understanding, distributed queue limiting, model fallback, and SSE result streaming.",
      tags: ["Spring Boot", "Milvus", "Redis", "RAG", "SSE"],
      year: "2026",
      color: "#1e2b4f",
    },
  ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/AllureCurtain" },
  ],
  contact: {
    label: "Contact",
    heading: "Build reliable systems with me",
    availability: ["Open to backend roles", "Available for collaboration"],
    footerNote: "Yao - 785777.xyz",
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
