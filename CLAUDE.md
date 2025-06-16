# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start local development server at localhost:3000
- `pnpm build` - Production build with type checking (runs astro check && astro build)
- `pnpm postbuild` - Generate search index with Pagefind (run after build)
- `pnpm format` - Format all files with Prettier
- `pnpm check` - Run Astro type checking

## Architecture

This is an Astro blog built on the Cactus theme with content collections for structured blog posts. Key architectural elements:

**Content Management:**
- Blog posts in `/src/content/post/` with Zod schema validation in `/src/content/config.ts`
- Required frontmatter: title (max 200 chars), description (max 160 chars), publishDate
- Auto-generated RSS, sitemap, and OG images via Satori

**Search & Navigation:**
- Static search via Pagefind integration (runs post-build)
- Tag-based filtering with auto-generated tag pages
- Table of contents generation for blog posts

**Theming & Styling:**
- TailwindCSS with custom dark/light mode switching
- Theme state managed via ThemeProvider component
- Expressive Code with dual syntax highlighting themes

**Special Features:**
- Contact form at `/contact/` with success page
- Fun Mode component with fireworks animation
- Webmentions integration for social interactions
- Back-to-top functionality with intersection observer

## Configuration Files

- `/src/site.config.ts` - Site metadata, navigation, theme settings
- `/astro.config.ts` - Build configuration and integrations
- `/src/content/config.ts` - Content collection schemas
- `/netlify.toml` - Deployment configuration

## Component Organization

Components are organized by feature area:
- `/src/layouts/` - Base layout and blog post template
- `/src/components/blog/` - Post-specific components (Hero, TOC, webmentions)
- `/src/components/layout/` - Site-wide components (Header, Footer)

## Content Workflow

1. Create new posts in `/src/content/post/[slug]/` directories
2. Include required frontmatter (title, description, publishDate)
3. Run `pnpm build && pnpm postbuild` to generate search index
4. Tag pages are automatically generated from post frontmatter