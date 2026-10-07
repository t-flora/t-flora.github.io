import type { SiteConfig } from "@/types";
import type { AstroExpressiveCodeOptions } from "astro-expressive-code";

export const siteConfig: SiteConfig = {
	// Used as both a meta property (src/components/BaseHead.astro L:31 + L:49) & the generated satori png (src/pages/og-image/[slug].png.ts)
	author: "Tiago Flora",
	// Shown (obfuscated) in the footer.
	email: "tiagomflora@gmail.com",
	// GoatCounter site code (the "<code>" in <code>.goatcounter.com). Empty disables analytics.
	goatcounter: "",
	// Date.prototype.toLocaleDateString() parameters, found in src/utils/date.ts.
	date: {
		locale: "en-US",
		options: {
			day: "numeric",
			month: "short",
			year: "numeric",
		},
	},
	// Meta property used as the default description meta property
	description: "Tiago Flora's writing and projects",
	// HTML lang property, found in src/layouts/Base.astro L:18
	lang: "en-US",
	// Meta property, found in src/components/BaseHead.astro L:42
	ogLocale: "en_US",
	// Meta property used to construct the meta title property, found in src/components/BaseHead.astro L:11
	title: "tflora",
};

// Used to generate links in both the Header & Footer.
export const menuLinks: { path: string; title: string }[] = [
	{ path: "/ai/", title: "AI" },
	{ path: "/work/", title: "Work" },
	{ path: "/posts/", title: "Writing" },
	{ path: "/projects/", title: "Projects" },
];

// Used in the footer.
export const socialLinks: { link: string; name: string }[] = [
	{ link: "https://github.com/t-flora", name: "GitHub" },
	{ link: "https://linkedin.com/in/tiago-flora", name: "LinkedIn" },
	{ link: "https://x.com/__tflora__", name: "X" },
	{ link: "https://busywaiting.substack.com", name: "Substack" },
];

// https://expressive-code.com/reference/configuration/
export const expressiveCodeOptions: AstroExpressiveCodeOptions = {
	styleOverrides: {
		borderRadius: "3px",
		codeBackground: "var(--bg-raised)",
		codeFontFamily:
			'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;',
		codeFontSize: "0.875rem",
		codeLineHeight: "1.7142857rem",
		codePaddingInline: "1rem",
		borderColor: "var(--rule)",
		frames: {
			editorActiveTabBackground: "var(--bg-raised)",
			editorTabBarBackground: "var(--bg-raised)",
			frameBoxShadowCssValue: "none",
			terminalBackground: "var(--bg-raised)",
			terminalTitlebarBackground: "var(--bg-raised)",
		},
		uiLineHeight: "inherit",
	},
	themeCssSelector(theme, { styleVariants }) {
		// If one dark and one light theme are available
		// generate theme CSS selectors compatible with cactus-theme dark mode switch
		if (styleVariants.length >= 2) {
			const baseTheme = styleVariants[0]?.theme;
			const altTheme = styleVariants.find((v) => v.theme.type !== baseTheme.type)?.theme;
			if (theme === baseTheme || theme === altTheme) return `[data-theme='${theme.type}']`;
		}
		// return default selector
		return `[data-theme="${theme.name}"]`;
	},
	// One dark, one light theme => https://expressive-code.com/guides/themes/#available-themes
	themes: ["github-dark-dimmed", "github-light"],
	useThemedScrollbars: false,
};
