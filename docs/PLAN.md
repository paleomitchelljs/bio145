# BIO 145 lesson plan — first drafts

Built 2026-10-31 from JM's idea list, using BIO 202 lessons 14–21 as the format and widget baseline and lesson 20's
low-text style (a short draft voice list per stage, everything else as hover text).

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
| After the meiosis interactive: set parent genotypes, offspring produced; an F1; draw from them for the next generation | 10 | A: set two parents' alleles, Go raises 48 offspring; five targets. B: make an F1, pick two F1 to breed (or breed all at random after predicting the share). C: drill |
| Cross fixed phenotypes, backcross, discern dominant/recessive/etc. | 11 | A: two true-breeding lines of an invented organism; every cross becomes a stock; cross on until you can name the pattern (dominance either way, incomplete, codominance; drawn at random per student). B: test-cross a purple plant to call PP or Pp. C: drill |
| Set parents' alleles to hit target F1 and F2 ratios: monohybrid, dihybrid, sex-linked, recombination | 12 | A: peas, five targets (3:1, 1:1, 9:3:3:1, 1:1:1:1, 3:3:1:1). B: flies, X-linked eye colour (2), then two linked genes with a distance slider and phase set by where the alleles sit (2). Expected ratios are exact, so one hit is enough. C: drill |
| Electronegativity as the mechanism for kinesin walking, filaments sliding | **not built** | See open questions |

## Numbers measured, not picked

- **Lesson 5 A** (200 runs each): a step of 0.035 never mixed in 30 s, so the step is 0.12. Evened (within 12) by 5 s:
  40 dots at 100% 0.88, 60 at 100% 0.70, 60 at 20% 0.19. Still 20+ apart at 30 s: 0.10 at 3%, about 0.01 above 5%.
- **Lesson 10 A** (20,000 runs of 48): a 3/4 cross lands in 60–90% purple 99% of the time, a 1/2 cross 10%; the 1:2:1
  windows hold 93% of Pp × Pp runs.
- **Lesson 6**: best contacts by exhaustive search 3, 3, 4, 3, 5, 5. No single polar→nonpolar swap in chain 5 raises
  its best (on a square grid only residues an odd number apart can touch), so chain 6 is about the nonpolar surface it
  leaves exposed, not more contacts.
- **Lesson 12**: every target checked reachable by brute force over all parent genotypes (and every distance).
- **Lesson 2 B**: four hydrogen bonds to the middle water confirmed reachable by random search under the bond rule.

## Open questions for JM

1. **The motors lesson.** Electronegativity → ATP → kinesin stepping / myosin sliding is not built. The pieces exist
   (`atoms.js` pulls, lesson 4's ATP bill); a lesson 13 could have students time ATP binding, hydrolysis and release to
   walk a kinesin head along a track. Where in the term would it sit?
2. **Voice.** Every voice block is a draft list (as lesson 20's are), for dictation.
3. **Real data.** BIO 202 lands every abstraction on a real dataset; none of these do yet. Candidates: Mendel's own
   counts (lesson 12), Meselson and Stahl's 1958 band photographs (lesson 8), Morgan's white-eyed fly counts (lesson 12 B).
4. **R panels** are kept only where there is a model (lessons 4, 5, 10). Drop them all for an intro course?
5. **Simplifications to check:** male fruit flies don't actually recombine, but lesson 12's engine lets them; lesson 4
   uses standard ΔG°′ values; lesson 2's polarity counts bond pulls only (no lone pairs), so ammonia is drawn
   pyramid-ish to keep it polar.
6. **Spelling strictness.** A near miss gets one free retry ("check the spelling"), then counts as wrong. Too lenient
   or too strict?
