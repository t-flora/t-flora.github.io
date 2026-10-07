import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import { defineConfig, fontProviders } from "astro/config";
import expressiveCode from "astro-expressive-code";
import fs from "fs";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeUnwrapImages from "rehype-unwrap-images";

import { expressiveCodeOptions } from "./src/site.config";
import { rehypeSidenotes } from "./src/plugins/rehype-sidenotes";

// https://astro.build/config
export default defineConfig({
	integrations: [expressiveCode(expressiveCodeOptions), sitemap(), mdx()],
	compressHTML: true,
	// Self-hosted Source Serif 4 (variable, with optical sizes). Astro preloads it and
	// generates a metric-matched fallback so text doesn't jump when the font arrives.
	fonts: [
		{
			cssVariable: "--font-source-serif",
			fallbacks: ["Georgia", "serif"],
			name: "Source Serif 4",
			options: {
				variants: [
					{
						src: ["@fontsource-variable/source-serif-4/files/source-serif-4-latin-opsz-normal.woff2"],
						style: "normal",
						weight: "200 900",
					},
					{
						src: ["@fontsource-variable/source-serif-4/files/source-serif-4-latin-opsz-italic.woff2"],
						style: "italic",
						weight: "200 900",
					},
				],
			},
			provider: fontProviders.local(),
		},
	],
	// Pages from the old Cactus site, sent to their closest equivalent. Old tag pages are
	// handled by src/pages/tags/[tag].astro.
	redirects: {
		"/about": "/",
		"/contact": "/",
		"/contact-success": "/",
		"/tags": "/posts/",
	},
	markdown: {
		processor: unified({
			rehypePlugins: [
				rehypeKatex,
				rehypeUnwrapImages,
				rehypeSidenotes,
				[
					rehypeExternalLinks,
					{
						rel: ["nofollow", "noopener", "noreferrer"],
						target: "_blank",
					},
				],
			],
			remarkPlugins: [remarkMath],
			remarkRehype: {
				footnoteLabel: "Notes",
				footnoteLabelProperties: {
					className: [""],
				},
			},
		}),
	},
	// https://docs.astro.build/en/guides/prefetch/
	prefetch: true,
	site: "https://t-flora.github.io",
	vite: {
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
		plugins: [rawFonts([".ttf", ".woff"])],
	},
});

function rawFonts(ext: string[]) {
	return {
		name: "vite-plugin-raw-fonts",
		// @ts-expect-error:next-line
		transform(_, id) {
			// eslint-disable-next-line
			if (ext.some((e) => id.endsWith(e))) {
				// eslint-disable-next-line
				const buffer = fs.readFileSync(id);
				return {
					code: `export default ${JSON.stringify(buffer)}`,
					map: null,
				};
			}
		},
	};
}
