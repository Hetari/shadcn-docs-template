export type NavItem = {
  name: string;
  href: string;
};

/** Top-level section pills shown in the sidebar and mobile menu. */
export const NAV_SECTIONS: NavItem[] = [
  { name: "Get Started", href: "/docs/getting-started/introduction" },
];

/** Sidebar group titles (lowercased) that should never be rendered. */
export const SIDEBAR_EXCLUDED_SECTIONS: string[] = [];

/** Individual page paths that should be hidden from the sidebar page list. */
export const SIDEBAR_EXCLUDED_PAGES: string[] = ["/docs/introduction"];

/**
 * Top-level/main site navigation items primarily used in the site header.
 * Each item follows the NavItem structure with a display name and href.
 */
export const MAIN_NAVIGATION: NavItem[] = [
  {
    href: "/docs/getting-started/introduction",
    name: "Docs",
  },
  {
    href: "/docs/prose-demo",
    name: "Demo",
  },
];
