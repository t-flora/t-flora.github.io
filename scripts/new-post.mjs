#!/usr/bin/env node
// Scaffold a new post: `pnpm new-post "My post title"`.
// Creates src/content/post/<slug>/index.md as an unpublished draft with today's date.
import fs from "node:fs";
import path from "node:path";

const title = process.argv.slice(2).join(" ").trim();
if (!title) {
	console.error('Usage: pnpm new-post "My post title"');
	process.exit(1);
}

const slug = title
	.normalize("NFKD")
	.replace(/[̀-ͯ]/g, "")
	.toLowerCase()
	.replace(/['’]/g, "")
	.replace(/[^a-z0-9]+/g, "-")
	.replace(/^-+|-+$/g, "");

const dir = path.join("src", "content", "post", slug);
if (fs.existsSync(dir) || fs.existsSync(`${dir}.md`)) {
	console.error(`A post with the slug "${slug}" already exists.`);
	process.exit(1);
}

const today = new Date().toLocaleDateString("en-GB", {
	day: "numeric",
	month: "short",
	year: "numeric",
});
const frontmatter = `---
title: ${JSON.stringify(title)}
description: ""
publishDate: "${today}"
status: "sketch"
tags: []
draft: true
---

`;

fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, "index.md"), frontmatter);
console.log(`Created ${path.join(dir, "index.md")}`);
console.log("It's a draft: visible in `pnpm dev`, not published. Remove `draft: true` to publish.");
