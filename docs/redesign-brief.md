# Redesign brief

Outcome of the grill-with-docs session (Sep 30 – Oct 5, 2026). Terms are defined in `GLOSSARY.md`; durable decisions in `docs/adr/`.

## Purpose and readers

- The site is both a home for writing and a calling card for software engineering roles in AI and finance.
- The reader to impress most is an AI researcher (capabilities or safety); the site should convey why safety matters without overclaiming.
- Thread: learning about learning.
- "tflora" is lowercase as a username only; everything else uses normal capitalization.

## Structure

- Nav: `tflora` · AI · Work · Writing · Projects. No separate About page.
- **Home:** name and nav, then the Pin, recent writing (title, date, status), a small row of Projects; about-type details at the bottom or in the footer. No tagline. To be revisited.
- **AI Hub:** the Pin first, then a single strand of AI writing, AI-tagged Projects and AI-tagged Timeline entries. Tag-like subdivision may come later.
- **Work Hub:** the Timeline, systems/finance Projects, and a resume download (`resume-qd.pdf`). No intro paragraph for now.
- **Writing:** all published Posts, filterable by multi-select Tag chips; Substack subscribe box.
- **Projects:** a succinct, polished, not flashy list; each entry says what made it hard. Hubs show Projects according to their Tags.

## Posts

- Under the title: publish date, Last reviewed date, Status (sketch · evolving · finished). No confidence field for now.
- Aging note appears automatically when Last reviewed is more than about 12 months old.
- Optional cover image, used on post cards and as the social preview; otherwise a generated card in the new style.
- The Pin is set with one line in a Post's frontmatter.
- Drafts stay in the repo, unpublished.

## Timeline

- One data file. Entry: dates, organization, role, 1–2 lines, optional link, kind (work · education · teaching · community · other), optional Tags.
- Includes items not on the resume. AI-tagged entries also appear on the AI Hub.

## Look

- Gwern: serif body text, sidenotes, hover link previews (own Posts and Wikipedia; most other sites block iframes).
- Maggie Appleton: warm off-white palette and soft touches, no gimmicks.
- Paul Graham: short line lengths, plain words, no clutter.
- Chris Olah: posts can embed interactive figures (MDX + islands); not required.
- Dark mode toggle kept, in a warm palette.
- Removed: Fun Mode fireworks, tech-stack quips, webmentions, EmailJS form, Cactus sample posts.

## Content at launch

- Pinned: "Public writing as a longtermist wager" (ported from Busywaiting) until the pinned essay is ready.
- Ported: Bennett review (Goodreads), "There is 1 good social media service" (Busywaiting). Each ported Substack post links to Substack for discussion.
- Existing: Boom review, "Anecdotes from underdevelopment", Minerva intro. The Minerva stubs are unpublished.
- Also ported, for accountability: "Bitter pills to swallow" (pagefaulted), with an author's note at the top saying where Tiago now thinks it's wrong.
- Projects: fast-options-pricer, fbm-fast-pricers, orderbook-reconstructor, stratum, the_hack_computer.
- Explainers (e.g. model-intelligence) are linked once presentable; embedded later.

## Contact

- Obfuscated mailto link to tiagomflora@gmail.com, plus GitHub, LinkedIn and X in the footer.

## Build order (on a `redesign` branch)

1. Upgrade Astro to current; strip Cactus remnants.
2. Prototype typography, palette, sidenotes and link previews on two real posts (Boom, Bennett review); review and iterate.
3. Hubs, Timeline, Projects, home page.
4. Port content; set Statuses and Last reviewed dates.
5. Swap in the email link, publish stratum to `t-flora.github.io/stratum/` (Pages workflow in its repo), merge.
