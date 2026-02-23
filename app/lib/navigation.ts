export type NavItem = {
  name: string;
  href: string;
};

/** Top-level section pills shown in the sidebar and mobile menu. */
export const NAV_SECTIONS: NavItem[] = [
  { name: "Get Started", href: "/docs/introduction" },
  { name: "Components", href: "/docs/components" },
  { name: "Registry", href: "/docs/registry" },
  { name: "MCP Server", href: "/docs/mcp" },
  { name: "Forms", href: "/docs/forms" },
  { name: "Changelog", href: "/docs/changelog" },
];

/** Sidebar group titles (lowercased) that should never be rendered. */
export const SIDEBAR_EXCLUDED_SECTIONS: string[] = [
  "installation",
  "dark mode",
];

/** Individual page paths that should be hidden from the sidebar page list. */
export const SIDEBAR_EXCLUDED_PAGES: string[] = [
  "/docs/introduction",
  "/docs/changelog",
];
