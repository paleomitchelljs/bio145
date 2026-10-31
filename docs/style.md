# BIO 145 lesson style

What goes on the screen, and how it is worded. Pedagogy and process are in `guidelines.md`.

## Furniture

The same as BIO 202: header, sticky letter nav, name prompt, stage sections, completion-code panel. One stylesheet, `app/assets/b145.css`, with BIO 202's palette byte for byte:

    ground #fafaf7   ink #1d1d1b   muted #6b6b68   rule #e2e0d9
    accent #b23a48   accent2 #2f6b8f   good #4a7a2a   bad #a8331a

Canvas drawings use these. The kit sims currently use their own hexes (#2e6da4, #c0392b, #2e7d32 and others); that is a `todo.md` item, not a precedent.

A stage is two columns, the picture on the left at about 1.45 parts and the controls and task list on the right at 1. One column on a narrow screen.

A stage carries, in order:

    voice block      JM's words
    the picture      with hover text saying what it shows
    the controls
    the task list    what opens the next stage
    solved banner    the conclusion, held back until earned

## Voice

The voice block is JM's lecture prose, trimmed, or dictated. Every voice block in the October drafts is a stand-in: bullets paraphrased from the outlines, waiting for dictation. Lesson 23 keeps BIO 202 lesson 9's real paragraphs.

The voice says why the question is worth asking. It does not explain the picture, define a term, or give away what the stage finds. The finding goes in the solved banner. The kit lessons' banners only say "Stage C is open," which wastes the slot.

## Hover text

Setup lives in tips (`.info` with a hidden `.tip`), not in bullets under the voice. First what is literally on screen, then what to do and watch. A definition may live in a tip.

## Words

- Titles name the move, not the term. "Hold a damaged cell" rather than "Checkpoints".
- Never "land" or "knob" on screen (JM, 2026-09-23). Say hit, set, slider, toggle.
- Verdicts are ✓ Correct or ✗ Incorrect. The evidence is the picture.
- Keep JM's framings, in his words, wherever a lesson touches them. From the outlines:
  - "Alleles are not dominant -- Phenotypes are" (lecture 25).
  - "Wild type is an allele" (28).
  - "Enzyme has no cognition" (28). Kinetochores as velcro: "Chemistry does the sorting" (21).
  - "Default is stop" (22).
  - "Not literally light-independent" (19).
  - "Code is arbitrary but frozen" (29).
  - "Water follows solutes" (10, 11).
- American spelling throughout (JM, 2026-10-31): color, gray, fiber, center, micrometer, labeled, neighbor.

## Typography

- Primes for strand ends: 5′ and 3′, not 5' and 3'.
- Subscripts and superscripts as characters: CO₂, H₂O, Na⁺, Ca²⁺, δ+ and δ−.
- A true minus in numbers (−70 mV). An en dash in ranges (7.35–7.45). × for times.
- Sequences and genotypes in monospace (`<b class='mono'>`).
- A readout line under a picture is `label: value` pairs with units. Invented scales say "relative".

## Drill cards

- The prompt is a picture or one clue. The answer is not in the prompt.
- State the format when it is not a word: "answer as a fraction like 3/4".
- The first answer is the one the word bank and the correction show. The rest are real synonyms.

## Choice questions (`pick`)

- Three or four options, parallel in length and grammar.
- Distractors are things students actually believe. For Sanger, reading the gel top to bottom; for tonicity, "shrinks" where it swells. Not "Light has mass."
- The "why" line runs under 20 words and adds something the right answer did not say.

## Sort and classify bins

A bin label must not contain an item's answer. "Carbonyl (C=O)" next to the card "Acetone's central C=O" is a giveaway (lesson 3).
