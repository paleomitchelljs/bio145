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

**Status: first drafts, all twelve.** The voice blocks are draft bullets for JM to dictate over, as in evo lesson 20.
`docs/PLAN.md` maps JM's idea list to the lessons and lists what is still open.

## Layout

```
index.html                 landing page (reads LOCKS.txt)
LOCKS.txt                  release gate, one row per lesson (o open / x locked), same as BIO 202
app/lessons/lessonN.html   the lessons
app/assets/
  b145.css                 the BIO 202 lesson stylesheet (same palette), lifted into one shared file, plus drill/tile/cross styles
  stage.js                 gates, task ticks, first-try bits, bypass/study mode, R panel, drag tiles (Tiles)
  drill.js                 the typed mastery drill and PNG word bank
  atoms.js                 electronegativity widget: bonds, partial charges, pull arrows (lessons 2, 3, 6)
  fork.js                  the replication fork at any step, with any molecule missing (lesson 7)
  code.js                  the genetic code and a clickable codon wheel (lesson 9)
  cross.js                 crosses: gametes, offspring, phenotype ratios, X-linkage, linkage, parent cards (lessons 10-12)
  score.js, lock.js, hover.*, pips.js, score.css   copied from BIO 202 (salt and storage keys renamed to bio145)
instructor/                verify_code.html, aggregate.html (decode student codes)
scripts/
  smoke.js                 every lesson in headless Chromium, as a student and as the instructor bypass
  decode_codes.py, test_codec.py   batch decoding, codec pin (from BIO 202)
docs/PLAN.md               idea list -> lessons, measured numbers, open questions
```

## Checks

```
node scripts/smoke.js            # every lesson: no errors as a student; every stage opens and a code is minted under the bypass
node scripts/smoke.js lesson7    # one lesson
python3 scripts/test_codec.py    # Python decoder agrees with score.js
python3 -m http.server 8000      # then open http://localhost:8000/
```

The instructor bypass (confirm the name as `JMitchell`) and Study Mode work as in BIO 202. Codes are prefixed
`b145_lessonN`, and the salt differs from BIO 202's, so the two courses' codes cannot be confused.
