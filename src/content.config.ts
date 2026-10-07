import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

function removeDupsAndLowerCase(array: string[]) {
	if (!array.length) return array;
	const lowercaseItems = array.map((str) => str.toLowerCase());
	const distinctItems = new Set(lowercaseItems);
	return Array.from(distinctItems);
}

const date = z
	.string()
	.or(z.date())
	.transform((val) => new Date(val));

const post = defineCollection({
	loader: glob({ base: "./src/content/post", pattern: "**/*.{md,mdx}" }),
	schema: ({ image }) =>
		z.object({
			// Shown above the text; usually where the author now disagrees with the post.
			authorNote: z.string().optional(),
			coverImage: z
				.object({
					alt: z.string(),
					src: image(),
				})
				.optional(),
			description: z.string().max(200),
			// Unpublished: built in dev only. Not the same thing as status "sketch".
			draft: z.boolean().default(false),
			// When the author last reread the post and stood by it. Drives the aging note.
			lastReviewed: date.optional(),
			ogImage: z.string().optional(),
			// The one post featured at the top of the AI Hub.
			pinned: z.boolean().default(false),
			publishDate: date,
			status: z.enum(["sketch", "evolving", "finished"]).optional(),
			// The Substack copy of the post, where discussion happens.
			substack: z.url().optional(),
			tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
			title: z.string().max(200), // set max title value to 200 chars
		}),
});

const yearMonth = z.string().regex(/^\d{4}-\d{2}$/, "Use YYYY-MM");

// The Work Hub's record of work, education and everything else. Edit src/content/timeline.yaml.
const timeline = defineCollection({
	loader: file("src/content/timeline.yaml"),
	schema: z.object({
		end: yearMonth.or(z.literal("present")).optional(),
		kind: z.enum(["work", "education", "teaching", "community", "other"]),
		lines: z.array(z.string()).min(1).max(2),
		link: z.url().optional(),
		org: z.string(),
		place: z.string().optional(),
		role: z.string(),
		start: yearMonth.optional(),
		tags: z.array(z.string()).default([]),
	}),
});

// Built work shown in Projects. Edit src/content/projects.yaml.
const project = defineCollection({
	loader: file("src/content/projects.yaml"),
	schema: z.object({
		// What made it hard: the line an interviewer should ask about.
		hard: z.string(),
		// Lower numbers come first.
		order: z.number().default(100),
		repo: z.url(),
		stack: z.array(z.string()).default([]),
		summary: z.string(),
		tags: z.array(z.string()).default([]),
		title: z.string(),
		url: z.url().optional(),
	}),
});

export const collections = { post, project, timeline };
