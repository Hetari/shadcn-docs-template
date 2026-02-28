import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "shadcn-nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/a11y",
    "@nuxt/hints",
    "nuxt-og-image",
    "@nuxt/content",
    "nuxt-shiki",
    "@nuxt/fonts",
  ],

  ogImage: {
    fonts: ["Geist:400", "Geist:500", "Geist:600"],
    defaults: {
      width: 1200,
      height: 630,
    },
  },

  css: ["~/assets/css/main.css"],

  vite: {
    plugins: [
      // https://github.com/tailwindlabs/tailwindcss/discussions/19655
      // @ts-expect-error vite type mismatch between @nuxt/schema and @tailwindcss/vite
      tailwindcss(),
    ],
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },

  components: [
    {
      path: "~/components",
      ignore: ["_internal/*", "_internal/**/*", "examples/*", "examples/**/*"],
    },
    { path: "~/components/demo", pathPrefix: false },
    { path: "~/components/content", global: true, pathPrefix: false },
  ],

  shiki: {
    defaultTheme: {
      light: "github-light-default",
      dark: "github-dark",
    },
    bundledLangs: [
      "ts",
      "tsx",
      "js",
      "vue",
      "html",
      "json",
      "bash",
      "astro",
      "toml",
      "yaml",
      "md",
      "markdown",
    ],
  },

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
    },
  },
  content: {
    build: {
      markdown: {
        highlight: false,
      },
    },
    database: {
      type: "d1",
      bindingName: "DB",
    },
    // required to prevent error related to better-sqlite3 during build and deploy
    experimental: {
      sqliteConnector: "native",
    },
  },

  build: {
    transpile: ["vue-sonner"],
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
      failOnError: false,
      autoSubfolderIndex: false,
    },
  },
  app: {
    head: {
      link: [
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "shortcut icon", href: "/favicon-16x16.png" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
      meta: [
        {
          name: "keywords",
          content: "Nuxt,Vue,Tailwind CSS,Components,shadcn",
        },
      ],
    },
  },
});
