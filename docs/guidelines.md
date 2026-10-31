# BIO 145 lesson guidelines

How a BIO 145 lesson is chosen, built and checked. `style.md` covers what goes on the screen. `todo.md` is the open work. `GUIDE.md` maps lectures to lessons.

The parent documents are evo's `structurephilosophy.md` and `docs/LESSON_STYLE.md`. Where BIO 145 differs, this file says so and this file wins. JM's own rulings, quoted and dated, outrank everything here.

## What a lesson is

One homework per lecture. Lesson N is the homework for lecture N. Lecture 20 was not recorded and has no lesson.

A lesson does two jobs. It makes the student work the lecture's logic with their hands, and it locks in the lecture's vocabulary. The first job is the manipulation stages. The second is the drill, which comes last and earns the completion code.

## Where BIO 145 differs from BIO 202

1. Vocabulary is taught. Evo says "No vocabulary should be taught in the lessons." This course has more to memorize, so nearly every lesson ends in a typed drill.
2. Lessons follow lectures. Evo lessons justify themselves by a process, "never by covering a lecture topic." Here, covering the lecture is the job, and the outline is the checklist.
3. No R panels. No real-data panels (JM, 2026-10-31).
4. Copy engines from BIO 202 wherever possible. The copies may drift; they are different classes (JM, 2026-10-31).

## Coverage

Sources, in order:

1. The 2026 outline, `refs/outlines/2026_lecNN_outline.tex`. Every section gets a stage, a drill card, or a line in `todo.md` saying why not.
2. Biology 2e (`refs/book/`). A major book concept the lecture skips goes in, marked "(book, ch. N)" in a title or tip, and listed in `GUIDE.md`.
3. The slide decks, for examples and pictures.

Content from another lecture is a flag, not a bonus. Lesson 30 currently teaches lecture 29. Lesson 23's Stage E teaches evolution. Both happened because the drafts were built from JM's idea list, not from the outlines.

## Shape

Two to five manipulation stages, then the drill. One idea per stage. Time on task is unmeasured; until it is, treat seven stages as too many.

## Manipulation stages

These carry over from evo, and most of the weak stages in the current drafts break one of them.

- The target is where the process ends up, not what a control reads. JM, 2026-09-29: *"The targets are often much too directly tied to the sliders themselves."*
- Predict before you run. A goal that names the switch to flip ("Add cyanide... the chain still stops") tests reading, not the model. Have the student commit a picture first, then run it.
- A window beats a floor. Cranking a slider to its stop should fail as hard as doing nothing.
- Repeat where the process is random: 3 to 10 hits. Where it is deterministic, one hit is enough.
- Nothing shuts a door. The first try is recorded; retries are free forever.
- Let something break. Some setting should make the model fall over in view.
- A ladder beats a bar. Each rung adds one control and takes away the cheap route that cleared the last one.
- A sim that reduces to one formula (somites = rate × time) or a truth table (the lac operon's two checkboxes) is a sort in disguise. Make it a prediction or a classify, or cut it.
- Measure every bar by sweeping the controls. The jsdom harness's grid check proves a goal is reachable. It does not prove the goal is hard to reach by accident.
- Every number on screen comes off the model. Made-up parameters are labelled "relative", and the code comment says they are invented.

## The interactive menu

What exists:

- Builders: lesson 4's molecule bench.
- Relays: lesson 29's fork, lesson 9's kinesin walk.
- The meiosis bench: lesson 23, and `cross.js` for 25–27.
- Rolls: lesson 25's 48 offspring, lesson 10's diffusion chamber.
- Hit-the-ratio: lesson 27.
- Kit stages (`app/assets/kit.js`): `sort`, `order`, `pick`, `sim`, `drill`. `Kit.extra` adds kit stages to a hand-built lesson.

Planned: `classify`, after evo lesson 17's Stage D. One item at a time in a card. Drag it to a bin or click the bin. Right or wrong at once, a row of dots, and a counter on each bin. It replaces `sort` wherever items can be drawn or generated. It earns its keep where the counts are the data: F2 phenotypes building 3:1 (25), Labrador puppies building 9:3:4 (26), recombinant counts giving map distance (27), cells by phase giving the mitotic index (21, 22).

## The drill

Typed answers. Two right in a row masters a card. A miss comes back two or three cards later. The word bank and the corrected answer are PNGs, and paste is blocked.

- Prefer drawn or generated cards (`make`) to definitions. A card that comes back with a new picture tests the idea; a definition tests the wording.
- One fact per card. 12 to 25 cards.
- Accepted answers list real synonyms only.
- No card may teach a framing the lecture rejects. Lesson 25 currently defines "dominant" as an allele property; lecture 25 says "Alleles are not dominant -- Phenotypes are."
- Yes/no cards are coin flips. Use them only when generated.

## Scoring

One bit per first try. Bump `version` in `Lesson.init` or `Kit.run` whenever the bit count changes. `Kit.extra` appends its bits after the drill's, so old bits keep their positions, but the total still changes.

## Checks

- `node scripts/smoke.js` needs Playwright, which is not installed on JM's machine.
- The jsdom harness used for the October drafts lives in a scratch folder. It loads every lesson, opens every stage under the bypass, mints a code, and grid-checks every sim goal. It belongs in `scripts/` (see `todo.md`).
- Nothing has been looked at in a real browser since the kit lessons were drafted. Drawing and dragging are untested.

## Before editing a lesson

Find or add its items in `todo.md`. Mark them done in the same commit as the edit. A lesson that needs more than a few lines of planning gets its own `docs/overhauls/lessonNN.md`, on evo's `_TEMPLATE.md`.
