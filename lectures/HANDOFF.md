# Lecture decks: handoff for the next pass (written 2026-10-31)

For whoever picks up the lecture decks next: rebuild lecture 2 from its recording, then lectures 3–9, then new decks
for lectures 10 onward. Read this, then `lectures/README.md` (how the decks work), then the lecture's transcript.

## Where things stand

- Nine decks, lectures 1–9 (book chapters 1–4), in `lectures/lecNN/`. All pushed to GitHub, which publishes them at
  jonsmitchell.com/bio145/.
- **Lecture 1 is rebuilt from its transcript** (commit a56628b). It is the model for the rest.
- **Lectures 2–9 are first drafts** written from the 2026 outlines and the PowerPoint text. JM on the lecture 1 first
  draft, which was written the same way: *"It's a lot of words that aren't actually my verbiage, and some of it is
  weirdly out of order (why does the fire example come after the sorting exercise?)"*. Expect the same faults in 2–9.
- JM has looked at lecture 1 (first draft) in a browser. Lecture 2 he hasn't commented on yet.
- Nothing has been checked in a browser by the agent; the sandbox blocks Chrome. `tools/check_decks.js` (jsdom) only
  catches script errors and missing parts. Layout, overlap and text length are unverified.
- The course page (`index.html` at the repo root) lists each lecture's deck beside its homework, by chapter. Each deck
  has a `lecNN` row in `LOCKS.txt` (all `o`).
- Every picture in a deck is an OpenStax _Biology 2e_ figure (CC BY 4.0) in `lectures/img/`, credited in
  `img/CREDITS.md` and under the picture. Everything else is drawn as SVG.

## The rule

**A deck is JM's lecture as he gave it: his words, his order, little text on screen.**

- The words come from the transcript. Each build's bottom-line prompt is one of his lines, trimmed, with
  transcription errors fixed. Lines on the slide itself are short phrases, mostly his.
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
3. One segment per topic shift; one build per beat; the prompt is his line. Lecture 1 is the pattern (it went from 51
   builds to 63 with far less text at each).
4. Figures: redraw what he drew or described (lecture 1: one match lighting three different fires; five pots,
   including less soil and more soil). Colors only from the tokens in `shared/lecture.css`. Never copy a publisher's
   figure. Photos only from OpenStax: see `img/CREDITS.md` for the extraction steps.
5. Clock minutes: a segment's share of the transcript's words times the class length (about 50 minutes) is close
   enough.
6. `node lectures/tools/check_decks.js NN` (needs `npm install` at the repo root once). Commit. Push only when JM asks.
7. Ask JM to look at it in a browser, and say what changed and why.

## Lecture 2 specifically

- Transcript: `2026_exam01_lec02_transcript.txt` (about 48 KB). Outline topics: elements of life; atomic structure
  (protons change the element, neutrons the weight, electrons the charge; cations and anions; the paddleball; a cloud,
  not Bohr rings; valence electrons); bond types (covalent as co-presidents; electronegativity as roommates sharing
  groceries; ionic as a balloon stuck on a wall, latex wallpaper, disrupted by water; hydrogen bonds: "hydrogen cannot
  stand up for itself", weak alone and strong together; ranking bond strength; polar and nonpolar, methane, oil and
  water); redox (OIL RIG, the backwards naming, always paired, the semester throughline).
- Current deck: 9 segments, 39 builds. Demos: `atomBuilder` (protons, neutrons, electrons), `tug` (electronegativity
  tug of war). Figures in `lec02/figs.js`: `bodyEarth`, `paddle`, `covalent`, `waterMethane`, `redox`; from
  `shared/figs-common.js`: `saltWater`, `hbonds`. Ends with three room votes.
- Things to check against the transcript:
  - The ionic-bond figure shows "dry: strong; in water: weak". That is lecture 3's opening correction ("a student
    caught me oversimplifying"). Lecture 2 should say what lecture 2 said; ask JM whether he wants the corrected
    version in lecture 2 instead.
  - The body-against-Earth composition bars come from the PowerPoint; keep them only if he used that comparison.
  - The closing votes are the agent's, not his; keep a vote only where he asked the room something.
  - The PowerPoint's hybrid-orbital slide (chapter 2, slide 12) was left out; leave it out unless the transcript has it.

## Lectures 3–9, then 10 onward

- Same procedure for 3–9. Lecture 3 opens with the ionic-bond correction and reuses `saltWater`.
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
