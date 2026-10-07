# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Tiago Flora's personal site (Astro 7, deployed to GitHub Pages at t-flora.github.io). Read `GLOSSARY.md` for the site's vocabulary (Hub, Pin, Status, Draft, Last reviewed, Aging note, Author's note, Timeline, Project, Explainer, Tag) and `docs/adr/` for decisions that shouldn't be silently reversed. `docs/redesign-brief.md` is the design brief.

## Development Commands

- `pnpm dev` - Local dev server at localhost:4321 (drafts are visible in dev only)
- `pnpm build` - Type check (`astro check`) + production build; `postbuild` then runs Pagefind automatically
- `pnpm format` - Prettier
- `pnpm check` - Astro type checking

Node >= 22.12 and pnpm 12 (pinned in CI). If the dev server shows stale frontmatter after a schema change, delete `.astro/data-store.json` and restart.

## Architecture

**Content** (schemas in `src/content.config.ts`):
- Posts: `src/content/post/` (folder with `index.md` or a flat `.md`). Required: `title`, `description` (<= 200 chars), `publishDate`. Optional: `status` (sketch | evolving | finished), `lastReviewed`, `pinned` (at most one post; the build fails otherwise), `authorNote`, `substack`, `tags`, `coverImage`, `draft`.
- A placeholder `authorNote` starting with "TODO" fails production builds on purpose.
- Timeline: `src/content/timeline.yaml`. Projects: `src/content/projects.yaml`.
- Anything tagged `ai` also appears on the AI Hub (`src/data/hubs.ts`).

**Pages**: `/` (Pin, recent writing, projects), `/ai/` and `/work/` (Hubs), `/posts/` (all writing with multi-select tag chips, filter state in `?tags=`), `/projects/`, `/posts/<id>/`. Old URLs (`/about/`, `/contact/`, `/tags/...`) redirect via `astro.config.ts` and `src/pages/tags/[tag].astro`.

**Markdown**: uses the `unified` processor from `@astrojs/markdown-remark` (not Astro 7's default Sätteri) so remark/rehype plugins work: math (KaTeX), external links, unwrap images, and `src/plugins/rehype-sidenotes.ts`, which turns footnotes into margin sidenotes on wide screens.

**Styling**: plain CSS, no Tailwind (ADR 0003). Tokens and prose styles in `src/styles/global.css`; components use scoped `<style>`. Light/dark via `data-theme` on `<html>` (ThemeProvider/ThemeToggle). Source Serif 4 is self-hosted through Astro's `fonts` config with preload.

**Client scripts**: link previews (`src/components/LinkPreviews.astro`, own posts + Wikipedia, hover devices only), aging-note re-check, tag chips, search (Pagefind), theme toggle. Keep client scripts from importing `@/utils` or `@/site-config` wholesale; that bundles the site config (including the email) into page JS.

**Generated**: RSS (`/rss.xml`), sitemap, social images (`src/pages/og-image/[slug].png.ts`, Satori).

## Content Workflow

1. New post: `src/content/post/<slug>/index.md` with title, description, publishDate, status.
2. Publish on the site first, then cross-post to Substack (Busywaiting) and set `substack:` to the Substack URL (ADR 0002).
3. Rereading a post and standing by it: update `lastReviewed`. Changed your mind: add an `authorNote`.
4. Swapping the Pin: move `pinned: true` to the new post.
