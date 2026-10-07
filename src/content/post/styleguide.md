---
title: "Style guide"
description: "Every element the site styles, on one page. Draft-only: visible in dev, never published."
publishDate: "5 Oct 2026"
lastReviewed: "5 Oct 2026"
status: "sketch"
draft: true
tags: ["meta"]
---

This page exists to check the design. It shows every element posts can use, with placeholder text. It is a draft, so it only appears when running the site locally.

## Paragraphs and sidenotes

Body text is set in Source Serif at a comfortable measure, with old-style figures like 1984 and 2026 blending into running text.[^figures] Footnotes written in Markdown become sidenotes: on a wide screen they sit in the right margin next to the line that references them; on a phone they collect at the end of the post.[^phone]

A second paragraph shows how consecutive sidenotes stack without overlapping.[^stack] Links look like [this internal link to the Boom review](/posts/boom-review/) and like this [Wikipedia link on spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition). Hover either one on a desktop to see a preview.

### A third-level heading

Lists read like this:

- An unordered item with **bold** and _italic_ text.
- A second item with `inline code`.
  - A nested item.

1. An ordered item.
2. Another one.

> A blockquote is quieter than the surrounding text, for quoting other people. It can run onto several lines without becoming a wall.

#### A fourth-level heading

Math renders inline, like $e^{i\pi} + 1 = 0$, and as display:

$$
\mathbb{E}[X] = \int_{-\infty}^{\infty} x \, f(x) \, dx
$$

## Code

```cpp
// Code blocks keep their own syntax colors in both themes.
template <typename T>
T clamp(T value, T lo, T hi) {
    return value < lo ? lo : (value > hi ? hi : value);
}
```

```bash
pnpm dev
```

## Tables

| Method        | Paths  | Time (ms) |
| ------------- | -----: | --------: |
| Monte Carlo   | 10,000 |     412.7 |
| Quasi-MC      | 10,000 |      98.3 |
| Closed form   |      — |       0.4 |

---

The end of a post. The aging note does not show here because this page was reviewed recently; it appears automatically on posts not reviewed for over a year.

[^figures]: Tables and metadata switch to lining, tabular figures so columns of numbers line up.

[^phone]: Screen readers always get the regular footnote list, since the margin copies are hidden from assistive technology.

[^stack]: If two notes would collide, the second one is pushed down below the first instead of overlapping it. Notes can include [links](https://en.wikipedia.org/wiki/Marginalia) and _emphasis_.
