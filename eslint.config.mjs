import antfu from "@antfu/eslint-config";
import tailwindcss from "eslint-plugin-better-tailwindcss";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  antfu(
    {
      type: "app",
      vue: true,
      typescript: true,
      formatters: true,
      stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
      },
    },
    [
      tailwindcss.configs.recommended,
      {
        rules: {
          "vue/block-order": [
            "error",
            { order: ["script", "template", "style"] },
          ],
          "vue/attributes-order": [
            "error",
            {
              order: [
                // 1. Place TWO_WAY_BINDING (v-model) first
                "TWO_WAY_BINDING",

                // 2. Put the rest of the recommended Vue groups after
                "DEFINITION",
                "LIST_RENDERING",
                "CONDITIONALS",
                "RENDER_MODIFIERS",
                "GLOBAL",
                "UNIQUE",
                "OTHER_DIRECTIVES",
                "OTHER_ATTR",
                "EVENTS",
                "CONTENT",
              ],
              // You can also enable alphabetical sorting within these groups if desired
              alphabetical: false,
            },
          ],
          "ts/no-redeclare": ["off"],
          "ts/consistent-type-definitions": ["error", "type"],
          "no-console": ["warn"],
          "no-alert": ["warn"],
          "antfu/no-top-level-await": ["off"],
          "node/prefer-global/process": ["off"],
          "node/no-process-env": ["error"],
          "perfectionist/sort-imports": [
            "error",
            {
              type: "alphabetical",
              order: "asc",
              newlinesBetween: "ignore",
            },
          ],
          // "unicorn/filename-case": [
          //   "error",
          //   {
          //     case: "kebabCase",
          //     ignore: ["README.md"],
          //   },
          // ],
        },
        settings: {
          "better-tailwindcss": {
            entryPoint: "./app/assets/css/tailwind.css",
            group: "never",
            preferSingleLine: true,
            printWidth: 120,
          },
        },
      },
    ],
  ),
);
