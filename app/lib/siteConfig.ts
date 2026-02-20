export type NavItem = {
  href: string;
  label: string;
};

export type Links = {
  github: string;
  githubAPI: string;
  ungh: string;
};

export type SiteConfig = {
  name: string;
  url: string;
  ogImage: string;
  description: string;
  links: Links;
  navItems: NavItem[];
};

export const siteConfig: SiteConfig = {
  name: "shadcn-docs-template",
  url: "https://github.com/hetari/shadcn-docs-template",
  ogImage:
    "https://raw.githubusercontent.com/hetari/shadcn-docs-template/master/og.jpg",
  description:
    "Simple, powerful and flexible site generation framework with everything you love from Nuxt.js & Shadcn Vue",
  links: {
    github: "https://github.com/hetari/shadcn-docs-template",
    githubAPI: "https://api.github.com/repos/hetari/shadcn-docs-template",
    ungh: "https://ungh.cc/repos/hetari/shadcn-docs-template",
  },
  navItems: [
    {
      href: "/docs/getting-started/introduction",
      label: "Docs",
    },
    {
      href: "/docs/prose-demo",
      label: "Demo",
    },
    {
      href: "/docs/about",
      label: "About",
    },
  ],
};
