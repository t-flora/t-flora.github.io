# Plain CSS instead of Tailwind

Tailwind was removed during the Astro 7 upgrade rather than migrated: `@astrojs/tailwind` doesn't support Astro 6+, and the redesign replaces all of the Cactus styling anyway. The new look (serif text, sidenotes, a warm palette) is mostly typography, which is easier to read and maintain as a small global stylesheet of CSS custom properties plus Astro's scoped `<style>` blocks than as utility classes.
