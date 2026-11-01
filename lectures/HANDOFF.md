# Lecture decks: handoff for the next pass (written 2026-10-31)

For whoever picks up the lecture decks next: rebuild lecture 2 from its recording, then lectures 3–9, then new decks
for lectures 10 onward. Read this, then `lectures/README.md` (how the decks work), then the lecture's transcript.

## Where things stand

- Nine decks, lectures 1–9 (book chapters 1–4), in `lectures/lecNN/`. All pushed to GitHub, which publishes them at
  jonsmitchell.com/bio145/.
- **Lecture 1 is rebuilt from its transcript, then reworked so the screen illustrates what JM says instead of repeating
  it** (2026-10-31, second pass; see "The rule"). It is the model for the rest.
- **Lectures 2 and 3 are rebuilt the same way** (2026-10-31), uncommitted at first, for JM to review alongside lecture 1
  and look for common issues. Their decisions and open questions are under "Lectures 2 and 3" below.
- **Lecture 4 is rebuilt the same way** (2026-10-31), a draft for JM's review; see "Lecture 4" below.
- **Lectures 5–9 are first drafts** written from the 2026 outlines and the PowerPoint text. JM on the lecture 1 first
  draft, which was written the same way: *"It's a lot of words that aren't actually my verbiage, and some of it is
  weirdly out of order (why does the fire example come after the sorting exercise?)"*. Expect the same faults in 5–9.
- The sandbox blocks Chrome, so the agent can't open a deck in a browser. `tools/check_decks.js` (jsdom) catches script
  errors and missing parts. For layout, this session rendered every build to PNG with resvg (`@resvg/resvg-js`) and the
  Source Sans 3 fonts (npm `source-sans`), both installed in the session scratchpad, not the repo: figures render
  exactly, HTML parts (points, photos, demos' controls) approximately. Worth adding to `tools/` if JM wants it.
- The course page (`index.html` at the repo root) lists each lecture's deck beside its homework, by chapter. Each deck
  has a `lecNN` row in `LOCKS.txt` (all `o`).
- Every picture in a deck is an OpenStax _Biology 2e_ figure (CC BY 4.0) in `lectures/img/`, credited in
  `img/CREDITS.md` and under the picture. Everything else is drawn as SVG.

## The rule

**A deck is JM's lecture as he gave it: his order, and a screen that shows what he is talking about while he says it.**

JM on the second lecture 1 draft (2026-10-31): *"pasting a near-verbatim quote on a slide blocked off as a quote with a
single-line summary repeating the short quote's point is redundant and unnecessary given I will be there speaking. The
slides should complement & illustrate what I say, rather than repeat it."* His words shape the slides and the word
choice; they are not printed back at the room. So:

- **The slide shows what he would draw or point at**: the diagram he sketches, the table of numbers he writes, the
  thing being sorted or crossed off, a photo. Not a sentence he is about to say.
- **The prompt (the bottom line) is only a question he puts to the room**, in his words, short: "How many fires do I
  have?", "Where does that extra mass come from?". Most builds have no prompt.
- **No quote cards of his own lines, and nothing under a figure that restates his point.** A quote card only for a real
  quotation that is itself the object (lecture 1: Sherlock Holmes, in Doyle's wording, attributed).
- **Words on a slide are labels, numbers, and the few terms or definitions students should write down**, each once
  (lecture 1: homeo/stasis; science as "a structured and organized way of figuring out what we think is true"; what
  p means).
- When he asks a question, the build shows the question; the next build shows the answer.
- The order is the transcript's order. An activity (a sort, a vote, a demo) comes after the idea it tests.
- PowerPoint material he didn't use in 2026 goes in an extra segment (`extra: true`, builds `X(n)`; shown only with X),
  not the main run.
- The outlines are a map of topics, not a source of wording. They flatten his phrasing.

## Sources, most important first

All of these are outside git (`refs/` is gitignored; the transcripts are elsewhere in Dropbox).

1. **Transcript**: `~/Library/CloudStorage/Dropbox/Professional/Courses/transcripts/145/transcripts/raw/2026_examNN_lecNN_transcript.txt`.
   Every lecture has one except 20 (not recorded). Lectures 31 and 32 also have a `_studentQuestions` file.
   Transcription errors to expect: "no hypothesis" = null hypothesis, "the learner" = the homework platform, "Adams" =
   atoms, "theood" = Moodle, broken words like "homeosthesis". Student names appear (SI leaders, students he calls
   on): leave them off the slides.
2. **Per-lecture notes**: `Courses/transcripts/145/notes/individual/2026_lecNN_notes.tex`, written from the transcripts.
   A good second map of the sequence.
3. **Outline**: `refs/outlines/2026_lecNN_outline.tex`. Topics only.
4. **PowerPoint**: `refs/lectures/lec_chptNN.pptx`. Examples and figures to redraw. Extract text and images with the
   scripts in this session's history or `unzip -p deck.pptx ppt/slides/slideN.xml`.
5. **Book**: `refs/book/Biology2e-WEB.pdf` (OpenStax). Images to reuse, and book concepts the lecture skipped.

## Procedure for one lecture

1. Read the transcript end to end. Write the sequence of moves: each question to the room, each example, each thing
   drawn on the board, each demo, with his key line for each, verbatim.
2. Lay the current deck beside that list. Keep the demos and figures that match a move he made; move or cut the rest.
   Cut every line that is a paraphrase where he has his own words.
3. One segment per topic shift; one build per beat; a prompt only where he asks the room something. Lecture 1 is the
   pattern: 80 builds, most of them a step in a drawing, almost no sentences on screen.
4. Figures: redraw what he drew or described (lecture 1: one match lighting four different fires beside a copier; the
   pots as a table at times 0, 1 and 2; the suspects struck off; the gas tanks; two drugs against a control). Colors only from the tokens in `shared/lecture.css`. Never copy a publisher's
   figure. Photos only from OpenStax: see `img/CREDITS.md` for the extraction steps.
5. Clock minutes: a segment's share of the transcript's words times the class length (about 50 minutes) is close
   enough.
6. `node lectures/tools/check_decks.js NN` (needs `npm install` at the repo root once). Commit. Push only when JM asks.
7. Ask JM to look at it in a browser, and say what changed and why.

## Lectures 2 and 3 (rebuilt 2026-10-31)

- Built from the transcripts with lecture 1's rules; pictures after `lec_chpt02.pptx` (lecture 2: slides 2-27;
  lecture 3: slides 27-44) and homework 2 and 3. Lecture 2: 15 segments, 56 builds. Lecture 3: 18 segments, 52 builds.
- Interactives: lecture 2 keeps the atom builder (now starts on helium, his example) and the tug of war (starts on O-H),
  adds `bend` (drag a hydrogen: straight water's two pulls cancel, bent water's add up; after homework 2, stage B) and
  ends on a sort, bonds strongest to weakest (his closing activity). Lecture 3 keeps the pH scale and the blood buffer.
- Decided, and flagged for JM:
  - The ionic-bond correction he made at the start of lecture 3 is built into lecture 2 ("ionic, in water"; a dry
    crystal is stronger than covalent). Lecture 3 keeps a two-build reminder.
  - Left out because the transcript doesn't support them, or they are wrong: OIL RIG (he never said it); the agent's
    closing votes; the body-against-Earth bars; the "an-ion means not-ion" etymology (anion is from Greek _ana_, up,
    Faraday's coinage; cation from _kata_, down).
  - Linalool: the slide's left = orange, right = lavender is drawn only as "one hand smells like orange, its mirror
    image like lavender", with no left/right or R/S labels, because the assignment looks reversed ((R)-(−)-linalool is
    the lavender one) and his claim that linalool isn't found in lavender is wrong (lavender oil is rich in it).
  - SI logistics are kept generic (no room or times).
- Shared change: `saltWater` in `shared/figs-common.js` takes `opts.dry` and `opts.wet` for its two captions.
- Style pass (JM asked for one, 2026-10-31): topic headings, not punch lines or repeats of what's on screen; each taught
  term on screen once (valence, electronegativity, surface tension, specific heat, structural and geometric isomers,
  chiral); no doubled labels; agenda builds get their own segment.

## Lecture 4 (rebuilt 2026-10-31)

- 19 segments, 71 builds. Pictures after `lec_chpt02.pptx` slides 40-46, `lec_chpt03.pptx` slides 2-21 and homework 4.
  Keeps the joiner and fat-packing demos; homework 4's bench (drag monomer ends together) is the fuller version.
- `groups` (lecture 3) and `fold` (lecture 2) moved to `shared/figs-common.js`; he recaps both here.
- Decided, and flagged for JM:
  - He called α and β glucose "structural isomers"; by lecture 3's definitions they aren't (same bonds). The slide
    says only "carbon 1's OH: down / up".
  - "Mammals don't make unsaturated fats": mammals do make monounsaturated ones (oleic acid); what you must eat are
    omega-3s and omega-6s. The slide says that. Palm oil, his unsaturated example, is about half saturated; the slide
    uses corn oil.
  - Slips not carried over: "unsaturated fats are normally solid"; fats as "carbs and a protein stuck together".
  - The lab announcement (microscopy, then macromolecules) moved to the opening logistics.
  - The HDL/LDL trucks are cut: he only starts lipoproteins in the last minute ("we'll pick up next time"), so they
    belong to lecture 5's opening. The marbled steak is drawn (the PowerPoint photo isn't openly licensed).

## Lectures 5–9, then 10 onward

- Same procedure for 5–9. Lecture 5 should open with the lipoprotein trucks.
- New decks (10–36): `python3 lectures/tools/make_page.py NN "Title" "description"`, write `content.js` and
  `figs.js`, add a `lecNN` row to `LOCKS.txt`, and replace the lecture's "deck not built yet" placeholder on the course
  page with a link (copy lecture 9's card). `docs/GUIDE.md` maps lectures to book chapters.
- Engine changes go in `shared/` and affect every deck: rerun the checks on all of them.

## Working with JM

- His standing instructions (`~/.claude/CLAUDE.md`): no flattery or filler words, push back where warranted, say how
  sure you are, quote him verbatim when summarizing his material. The `/mitchell` voice skill applies to anything
  written in his voice.
- American spelling throughout.
- Commit when asked; push when asked.
- The site is public, so only openly licensed images go in the repo. He asked about fair use on 2026-10-31; the answer
  and the reasoning are in this session's history, short version: classroom display is fine, public posting is a
  different act.
