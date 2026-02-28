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
};

const repoUrl = "https://github.com/hetari/shadcn-docs-template";

export const siteConfig: SiteConfig = {
  name: "shadcn-docs-template",
  url: repoUrl,
  ogImage:
    "https://raw.githubusercontent.com/hetari/shadcn-docs-template/master/og.jpg",
  description:
    "Simple, powerful and flexible site generation framework with everything you love from Nuxt.js & Shadcn Vue",
  links: {
    github: repoUrl,
    githubAPI: "https://api.github.com/repos/hetari/shadcn-docs-template",
    ungh: "https://ungh.cc/repos/hetari/shadcn-docs-template",
  },
};
