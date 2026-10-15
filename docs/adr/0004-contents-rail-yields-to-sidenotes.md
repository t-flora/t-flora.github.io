# The contents rail yields the right margin to sidenotes

Posts with three or more sections get a sticky Contents rail in the margin (after felixrieseberg.com, whose rail sits on the left). The right margin already belongs to sidenotes, so the rail only takes it when a post has none: there it uses the sidenote column itself (same width, same shift of the reading column), so posts with and without sidenotes keep the same frame. On a post with sidenotes the rail moves to the left margin, which needs a wider screen (82rem against 72rem) because both margins are then reserved (`--frame-extra-start` alongside `--frame-extra`).

Between those widths a post with sidenotes shows no rail; it keeps the inline Contents block, and the Reading strip's section button opens the same list. We accepted that gap rather than squeezing a rail and sidenotes into one margin, moving sidenotes off the right (they are the Gwern-style feature from the brief), or putting the rail on the left for every post (it reads better on the right when that side is free).

The footnotes' "Notes" heading is left out of the contents: it isn't a section, and on wide screens the footnote list is hidden behind the sidenotes.
