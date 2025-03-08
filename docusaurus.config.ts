import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "TechNotes",
  favicon: "img/favicon.ico",
  url: "https://YutoNishigaki.github.io",
  baseUrl: "/tech-notes/",
  organizationName: "YutoNishigaki",
  projectName: "tech-notes",
  trailingSlash: false,
  deploymentBranch: "gh-pages",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "ja",
    locales: ["ja"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/",
          sidebarPath: "./sidebars.ts",
          showLastUpdateTime: true,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      logo: {
        alt: "Site Logo",
        src: "img/logo.png",
        srcDark: "img/logo-dark.png",
      },
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} nissy.`,
    },
    colorMode: {
      defaultMode: "dark",
      disableSwitch: false,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  markdown: {
    mermaid: true,
  },
  themes: [
    "@docusaurus/theme-mermaid",
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      {
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        hashed: true,
        language: ["ja"],
        forceIgnoreNoIndex: true,
        docsRouteBasePath: "/",
      },
    ],
  ],
};

export default config;
