// Titles and descriptions for the site's top-level pages. Used for each page's <head>
// and for its social preview image (src/pages/og/[page].png.ts), so the two stay in sync.
export const PAGES = {
	ai: {
		description:
			"Tiago Flora on AI: interpretability, safety, and what we owe the systems we build.",
		title: "AI",
	},
	home: {
		description: "Writing and projects on AI, software engineering and finance.",
		title: "Tiago Flora",
	},
	projects: {
		description: "Things Tiago Flora has built, and what made each one hard.",
		title: "Projects",
	},
	work: {
		description: "Tiago Flora's work, education and projects.",
		title: "Work",
	},
	writing: {
		description: "Essays, reviews and notes by Tiago Flora.",
		title: "Writing",
	},
} as const;

export type PageKey = keyof typeof PAGES;

export function pageMeta(key: PageKey) {
	return { ...PAGES[key], ogImage: `/og/${key}.png` };
}
