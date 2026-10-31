# BIO 145 lesson plan — first drafts

> **Lesson numbers below are the original draft order (1-14).** They were renumbered to match lecture numbers; see `docs/GUIDE.md` (old → new: 1→7, 2→2, 3→4, 4→13, 5→10, 6→6, 7→29, 8→28, 9→30, 10→23, 11→25, 12→26, 13→27, 14→9).

Built 2026-10-31 from JM's idea list, using BIO 202 lessons 14–21 as the format and widget baseline and lesson 20's
low-text style (a short draft voice list per stage, everything else as hover text).

## House rules (JM, 2026-10-31)

- Copy existing BIO 202 engines wherever possible. The copies can drift: they are different classes.
- No real-data panels. No R panels.
- Motors go at the end. Once everything is drafted JM will reorganize, rearrange and add material, so the order and
  numbering here are provisional.

## The pattern every lesson follows

1. **One or two manipulation stages**: the student builds, sets or runs something and hits targets (pips, retry
   forever, first try recorded). Targets are about where the process ends up, not what a slider reads.
2. **A drill stage last**: typed answers, PNG word bank, two right in a row per card. Drawn cards come back with a new
   picture each time. This is where the memorization lives. The completion code is earned when the drill is done.

## Idea list → lessons

| JM's idea | Lesson | What the student does |
|---|---|---|
| Scale and the hierarchy of life | 1 | A: drag levels into a ladder (4 rounds, 6→12 levels). B: drag a marker on a ×10 ruler to place ten things, atom to hummingbird; at the end, bands show what eye, light microscope and electron microscope can see. C: drill |
| Electronegativity: oxygen is greedy | 2 A | Pick two atoms; the shared pair slides toward the greedier one (δ+/δ−, or + and − when it leaves). Seven targets, then rank five bonds |
| Electronegativity → polar and nonpolar | 2 B | Bend CO₂ until its pulls stop cancelling; straighten water until they cancel; drag waters until the middle one has four hydrogen bonds; find that methane makes none; sort ten molecules polar/nonpolar, twice each |
| Electronegativity and hydrogen bonds as the recurring widget | `atoms.js` | The same pulls (δ halos, arrows) drawn in lessons 2, 3 (functional groups) and 6 (side chains); the dashed hydrogen bond in 2 and 6 |
| Functional groups and linkage types; click bonds to change number, drag groups, build a target | 3 | A: click C–C bonds (single/double/triple), drag –OH, =O, –NH₂, –SH, –OPO₃, –CH₃ onto a skeleton; carbons with more than four bonds turn red; eight targets (alcohol, aldehyde, ketone, carboxylic acid, amino acid, ...). B: a bench of sugars, amino acids, fatty acids, glycerol and nucleotides; drag one end onto another to join them (glycosidic, peptide, ester, phosphodiester; each join counts a water); "Add water" splits a join. C: drill, with drawn molecules |
| Gibbs free energy and -gonic reactions | 4 | A: drag the products' level and the hill's top; Go runs 60 molecules hopping for 30 s. Targets on where they end and how fast (an enzyme lowers the hill, not the valleys). B: pay for uphill reactions with downhill ones (ATP, PEP), fewest cards. C: drill, with drawn energy diagrams |
| Diffusion: set concentrations and permeability | 5 A | Two chambers, a membrane slider, channels for ions. Five targets: even out, keep a gap (only a sealed membrane can), even out fast, let one kind through and not the other |
| (osmosis, follows naturally) | 5 B | Set the outside solution; an animal cell shrinks, holds or bursts; a plant cell goes turgid or plasmolysed |
| Protein folding | 6 | A: trace a chain of nonpolar and polar residues through a grid; the target is the best fold, found by trying every fold. Six chains; the last is a polar→nonpolar swap. B: drill (levels, bonds, side chains drawn with the atoms widget) |
| DNA replication: pick the enzyme at each step, several times through | 7 A | Nine steps, three passes: hints on the first, the picture alone on the second and third; one clean picture-only pass required |
| ...then flash cards: next molecule, or which one is broken | 7 B | Each card is the fork drawn at a step ("which acts next?") or finished with one molecule missing ("which was missing?"), plus terms |
| Meselson–Stahl: predict by dragging, run, pick the semiconservative prediction | 8 | A: for each idea, a strand cartoon; drag thin/thick bands into tubes for generations 1 and 2. B: spin, pick the prediction that matches, then predict generation 3 and the experiment run backwards. C: drill |
| Codon decoding | 9 | A: type the mRNA for a template, click the start, click each codon's amino acid on the codon wheel (four genes). B: one change to the DNA for silent, missense, nonsense, frameshift, broken start. C: drill (codons come back new each time; the wheel is shown as a picture) |
| (the meiosis interactive itself) | 10 | **Copied from BIO 202 lesson 9** (the bench: replicate, drag through two divisions, crossovers, 500 gametes, fuse embryos, the Punnett square, Stage D's three rules, Stage E's polygenic trait), R panels removed, with two stages added: **M** mitosis on the same bench (one division, each chromosome lines up alone, sisters part, two cells like the first; two questions) and **F** a drill (phases drawn as cells, parts, chromosome counts) |
| After the meiosis interactive: set parent genotypes, offspring produced; an F1; draw from them for the next generation | 11 | A: set two parents' alleles, Go raises 48 offspring; five targets. B: make an F1, pick two F1 to breed (or breed all at random after predicting the share). C: drill |
| Cross fixed phenotypes, backcross, discern dominant/recessive/etc. | 12 | A: two true-breeding lines of an invented organism; every cross becomes a stock; cross on until you can name the pattern (named in lesson 10 Stage D's words: one masks the other, both show side by side, they blend; drawn at random per student). B: test-cross a purple plant to call PP or Pp. C: drill |
| Set parents' alleles to hit target F1 and F2 ratios: monohybrid, dihybrid, sex-linked, recombination | 13 | A: peas, five targets (3:1, 1:1, 9:3:3:1, 1:1:1:1, 3:3:1:1). B: flies, X-linked eye colour (2), then two linked genes with a distance slider and phase set by where the alleles sit (2). Expected ratios are exact, so one hit is enough. C: drill |
| Electronegativity as the mechanism for kinesin walking, filaments sliding | 14 (last) | A: walk kinesin event by event (ATP binds, the rear head swings, the new front head grips and drops ADP, the rear head splits ATP and lets go), three trips, hints on the first. B: set load and ATP, Go walks 3 s; targets on how far it gets, with an energy bar (one ATP 83 pN·nm against a step's work, 8 nm × load). C: a sarcomere with calcium and ATP toggles: contract, rigor, relax. D: drill |

The genetics lessons (11-13) now draw every gamete from lesson 10's meiosis: `cross.js` copies lesson 9's `chromatids()` (a crossover joins the inner two chromatids), `newPlan()` and `dealOrder()` (homologs to opposite poles in division I, each pair on its own; sisters in division II). Exact ratios enumerate the same chromatids the sampler deals, as lesson 9's Punnett square does.

## Numbers measured, not picked

- **Lesson 5 A** (200 runs each): a step of 0.035 never mixed in 30 s, so the step is 0.12. Evened (within 12) by 5 s:
  40 dots at 100% 0.88, 60 at 100% 0.70, 60 at 20% 0.19. Still 20+ apart at 30 s: 0.10 at 3%, about 0.01 above 5%.
- **Lesson 14 B** (2,000 runs each): 100-150 steps in 3 s, 4 pN with plenty of ATP 0.97, no load at ATP 0.045 mM 0.97;
  all 250 steps in 3 s, no load 0.999, 1 pN 0.56; stall (fewer than 10 steps) at 7 pN every run, 6.5 pN 0.002.
- **Lesson 11 A** (20,000 runs of 48): a 3/4 cross lands in 60–90% purple 99% of the time, a 1/2 cross 10%; the 1:2:1
  windows hold 93% of Pp × Pp runs.
- **Lesson 6**: best contacts by exhaustive search 3, 3, 4, 3, 5, 5. No single polar→nonpolar swap in chain 5 raises
  its best (on a square grid only residues an odd number apart can touch), so chain 6 is about the nonpolar surface it
  leaves exposed, not more contacts.
- **Lesson 13**: every target checked reachable by brute force over all parent genotypes (and every distance).
- **Lesson 2 B**: four hydrogen bonds to the middle water confirmed reachable by random search under the bond rule.

## Open questions for JM

1. **Lesson 10's Stage E** is BIO 202 lesson 9's polygenic stage, which ends with a population under selection. Kept as
   copied; cut it, or end the lesson after D?
2. **Voice.** Every voice block outside lesson 10 is a draft list (as lesson 20's are), for dictation. Lesson 10 keeps
   the BIO 202 lesson 9 paragraphs, which are longer than the rest of BIO 145.
3. **Simplifications to check:** male fruit flies don't actually recombine, but lesson 13's engine lets them; lesson 4
   uses standard ΔG°′ values; lesson 2's polarity counts bond pulls only (no lone pairs), so ammonia is drawn
   pyramid-ish to keep it polar; lesson 14's kinesin cycle is the four-event textbook version.
4. **Spelling strictness.** A near miss gets one free retry ("check the spelling"), then counts as wrong. Too lenient
   or too strict?
