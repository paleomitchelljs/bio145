# BIO 145 lecture decks

Interactive presentations to replace the PowerPoints, one per lecture. Chapters 1–4 (lectures 1–9) are drafted. Each
deck follows its lecture's 2026 outline (`refs/outlines/2026_lecNN_outline.tex`) for topics and order, and takes its
slide text from the matching PowerPoint (`refs/lectures/lec_chptNN.pptx`), reworded toward the outline's phrasing.

Open `lectures/index.html`, or a deck's `lecNN/index.html`, straight from the file. No build step.

## Running a deck

The engine is fs110's (`infernogallus/js/deck.js`, copied 2026-10-31), so the keys are the same:

| Key | Does |
|---|---|
| → space, page down | next build (a clicker works) |
| ← | back |
| `[` `]` | previous / next segment |
| T | whiteboard or chalkboard (remembered across decks) |
| P | answers: right answers on votes, right or wrong on sorted chips |
| 1–9 | add a hand to the vote on screen; shift takes one back |
| C | clock against the plan (each segment's minutes) |
| B | blank screen |
| X | extras (none used yet) |

Votes, sorted chips and demo settings survive a reload but not a new tab, so the next section starts clean. The circular
arrow (clicked twice) clears them.

## What's in a deck

    lecNN/content.js   every word on screen: segments, builds (one press each), items, the bottom-line prompt
    lecNN/figs.js      that lecture's drawn figures (Deck.figs) and its interactive demos (Deck.parts)
    shared/deck.js     the engine
    shared/parts.js    title, points, fig, photo, vote, cmp (columns), sort (chips into bins), quote
    shared/chem.js     drawing helpers: structural formulas, ball-and-stick, Bohr atoms, water
    shared/figs-common.js   figures more than one lecture uses
    shared/lecture.css      science colors as tokens, redefined for the chalkboard

Every diagram is drawn as SVG with colors taken from CSS tokens, so it recolors with the theme. The textbook figures
in the PowerPoints are redrawn (simplified), not copied. Three diagrams are still shown from local media instead of
redrawn: the cow's stomach (lecture 4), the squid axon and the giraffe's nerve (lecture 7).

Photos and micrographs (a water strider, crushed ice, TEMs of organelles) come from the PowerPoints into `media/`,
which is gitignored because most are someone else's copyright. Make it with:

    python3 lectures/tools/pull_media.py

A photo that isn't there shows as a dashed box with its description. A `photo` item marked `diagram: true` is inverted
on the chalkboard; a photo is left alone.

## Interactive pieces, by lecture

| Lecture | Demo |
|---|---|
| 1 | sort: alive or not; the null hypothesis (true difference, sample size, p) |
| 2 | atom builder (protons, neutrons, electrons → element, isotope, ion); electronegativity tug of war |
| 3 | pH scale (tenfold per unit); blood buffer (acid added, CO₂ from breathing) |
| 4 | join and split monomers (water counted); packing fatty-acid tails |
| 5 | the steroid key blank (six hormones on one core); sort: protein jobs |
| 6 | fold a chain in water, then heat it; base-pair widths |
| 7 | diffusion between two chambers; surface area and volume of a cube, cut up |
| 8 | the cell map (animal or plant; click a part) |
| 9 | kinesin walks, one ATP a step |

Every deck ends or pauses on room votes (P shows the answer).

## Checks

    node lectures/tools/check_decks.js        every deck in jsdom: walks every build, presses every button, both themes

Needs `npm install` at the repo root once (jsdom). It catches script errors and missing parts or figures. It does
**not** see layout or drawings: nothing here has been looked at in a browser yet.

## Adding a lecture

    python3 lectures/tools/make_page.py 10 "Title" "one-line description"

then write `lec10/content.js` and `lec10/figs.js` (copy a neighbor's), and add a card to `lectures/index.html`.

## Draft status and things to check

- Nothing has been opened in a browser. Expect overlaps, text that runs long, and figures that need nudging.
- The prompts and points are drafts in your lecture register, built from the outline bullets and the slide text. They
  are not your words yet; edit `content.js`.
- Clock minutes assume a 55–57 minute class.
- Simplified chemistry to check: the steroid demo places groups schematically (the right groups, not exact
  positions); the Bohr drawings place electrons in pairs; the fold demo is a cartoon of hydrophobic collapse.
- Some PowerPoint content was left out where the 2026 outline doesn't cover it, such as hybrid orbitals (ch. 2, slide
  12) and the protein-folding GIF.
