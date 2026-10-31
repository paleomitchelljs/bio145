# BIO 145 — interactive lessons

Homework for Coe College's intro biology course (cell and molecular biology, then inheritance). Built on the furniture of
the BIO 202 evolution lessons ([paleomitchelljs/evo](https://github.com/paleomitchelljs/evo), lessons 14–21): progressive
stages that open by being solved, canvas interactives, hover text instead of setup bullets, a low-text voice block, and a
completion code the student hands in.

**What is different from BIO 202:** this course has more to memorize. So nearly every lesson ends in a **typed mastery
drill** (`app/assets/drill.js`): the student types each answer; a card counts as mastered after two right in a row; a miss
comes back two or three cards later. The word bank and the corrected answer are shown as **PNG pictures** of the words,
so students can read the spelling but can't copy and paste it. Pasting into the answer box is blocked too. Many cards are
*drawn*: each time a card comes back it shows a new molecule, fork, cell or cross, so students drill the idea and not one
picture.

**Numbering: lesson N is the homework for lecture N.** `docs/GUIDE.md` maps all 36 lectures to the book and to the lessons; every slot but the unrecorded lecture 20 has a lesson.

**Status: first drafts, thirty-five lessons** (every lecture but the unrecorded 20). The voice blocks are draft bullets for JM to dictate over, as in evo lesson 20
(lesson 23 keeps JM's BIO 202 lesson 9 voice). `docs/PLAN.md` maps JM's idea list to the lessons and lists what is still open.

**House rules for this repo (JM, 2026-10-31):** copy existing engines from BIO 202 wherever possible (the copies may drift;
they are different classes); no real-data panels; no R panels.

## Layout

```
index.html                 landing page (reads LOCKS.txt)
LOCKS.txt                  release gate, one row per lesson (o open / x locked), same as BIO 202
app/lessons/lessonN.html   the lessons
app/assets/
  b145.css                 the BIO 202 lesson stylesheet (same palette), lifted into one shared file, plus drill/tile/cross styles
  stage.js                 gates, task ticks, first-try bits, bypass/study mode, drag tiles (Tiles)
  drill.js                 the typed mastery drill and PNG word bank
  atoms.js                 electronegativity widget: bonds, partial charges, pull arrows (lessons 2, 4, 6, 28-30)
  fork.js                  the replication fork at any step, with any molecule missing (lesson 29)
  quiz.js, sim.js, paths.js, paths.css   copied from BIO 202 for lesson 23 (the meiosis bench)
  code.js                  the genetic code and a clickable codon wheel (lesson 30)
  cross.js                 crosses on lesson 23's meiosis (BIO 202 lesson 9's chromatids / two divisions, copied): gametes,
                           offspring, phenotype ratios, X-linkage, linkage, parent cards (lessons 25-27)
  kit.js, kit.css          builds a lesson from a config of stages (sort / order / pick / sim / drill); lessons 1, 3, 5, 8, 11, 12, 14-19, 21, 22, 24, 31-36
  score.js, lock.js, hover.*, pips.js, score.css   copied from BIO 202 (salt and storage keys renamed to bio145)
instructor/                verify_code.html, aggregate.html (decode student codes)
scripts/
  smoke.js                 every lesson in headless Chromium, as a student and as the instructor bypass
  decode_codes.py, test_codec.py   batch decoding, codec pin (from BIO 202)
docs/guidelines.md         how a lesson is chosen, built and checked (read first)
docs/style.md              what goes on screen and how it is worded
docs/todo.md               open work, from the 2026-10-31 review
docs/GUIDE.md              lecture -> book chapter -> lesson
docs/PLAN.md               the first drafts: idea list -> lessons, measured numbers, open questions
```

## Checks

```
npm install && node scripts/check.js   # every lesson in jsdom: no errors, every stage opens, a code is minted; kit content checked
node scripts/smoke.js            # every lesson: no errors as a student; every stage opens and a code is minted under the bypass
node scripts/smoke.js lesson29   # one lesson
python3 scripts/test_codec.py    # Python decoder agrees with score.js
python3 -m http.server 8000      # then open http://localhost:8000/
```

The instructor bypass (confirm the name as `JMitchell`) and Study Mode work as in BIO 202. Codes are prefixed
`b145_lessonN`, and the salt differs from BIO 202's, so the two courses' codes cannot be confused.
