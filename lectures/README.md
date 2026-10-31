# BIO 145 lecture decks

Interactive presentations to replace the PowerPoints, one per lecture. Chapters 1–4 (lectures 1–9) are drafted.

**Source of the words and the order: the recording transcripts**
(`Dropbox/Professional/Courses/transcripts/145/transcripts/raw/2026_examNN_lecNN_transcript.txt`). A deck uses JM's
own lines, trimmed, in the order he gave them, with sparse text on screen; activities come after the ideas they test.
PowerPoint material the lecture skipped goes in an extra (X) segment. Lecture 1 is built this way (2026-10-31).
Lectures 2–9 are still the first drafts, written from the outlines and PowerPoint text, and need the same rebuild. `HANDOFF.md` has the procedure and the state of each deck for that pass.

Open the course page (`index.html` at the repo root: each lecture's deck on the left, its homework on the right), or a
deck's `lectures/lecNN/index.html`, straight from the file. No build step.

## Locking

Each deck has a row in `LOCKS.txt` (`lec01` … `lec09`), next to the homework rows, and loads `app/assets/lock.js`, so
it locks exactly like a lesson: change `o` to `x`, commit, push. A locked deck shows the "Not open yet" notice (with the
instructor passphrase box), and its card on the course page goes gray. Everything is open now.

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
in the PowerPoints are redrawn (simplified), not copied.

The photos and micrographs (a water strider, sweat evaporating, electron micrographs of organelles) are OpenStax
_Biology 2e_ figures, CC BY 4.0, in `img/`, committed, so the decks work from the website in any room. Each carries
its credit under it; `img/CREDITS.md` lists them all and says how to add another. A `photo` item marked
`diagram: true` (line art on white) is inverted on the chalkboard; a photo is left alone.

`media/` (gitignored) and `tools/pull_media.py` remain for a picture with no open equivalent that should stay off the
public site. No deck uses it now; a missing local photo shows as a dashed box with its description.

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

then write `lec10/content.js` and `lec10/figs.js` (copy a neighbor's), add a `lec10` row to `LOCKS.txt`, and swap the
"deck not built yet" placeholder on the course page for a link (copy lecture 9's card).

## Draft status and things to check

- Nothing has been opened in a browser. Expect overlaps, text that runs long, and figures that need nudging.
- The prompts and points are drafts in your lecture register, built from the outline bullets and the slide text. They
  are not your words yet; edit `content.js`.
- Clock minutes assume a 55–57 minute class.
- Simplified chemistry to check: the steroid demo places groups schematically (the right groups, not exact
  positions); the Bohr drawings place electrons in pairs; the fold demo is a cartoon of hydrophobic collapse.
- Some PowerPoint content was left out where the 2026 outline doesn't cover it, such as hybrid orbitals (ch. 2, slide
  12) and the protein-folding GIF.
