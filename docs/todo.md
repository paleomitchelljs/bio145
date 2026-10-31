# BIO 145 todo

From the review of 2026-10-31: all 35 lessons against their 2026 outlines and for teaching value. Lessons 1, 3, 5, 8, 11, 12, 14–19, 21, 22, 24 and 31–36 were drafted with Sonnet from the outlines; the other 14 were built earlier from JM's idea list. Rules for doing the work are in `guidelines.md` and `style.md`.

## First

- [x] Bump `version` in lessons 2, 3 and 4. Their bit counts changed when isotopes, pH and polysaccharides went in, and the version did not.
- [x] Re-slot 28–30. Done another way, without moving files: 29 gained bacteria-vs-eukaryote replication and the genetic code (central dogma, 64 codons, universality, introns in bacteria); 30 gained the three polymerases, bacteria vs eukaryotes, and processing (exons, alternative splicing, promoters, enhancers, RNA world). 30's codon wheel stays as lecture 30's translation preview. Revisit if 30 runs long.
- [x] Lesson 25: rewrite the cards "The allele that shows when only one copy is present" (dominant) and its recessive twin. Lecture 25: "Alleles are not dominant -- Phenotypes are."
- [x] Lesson 11: the pump sim drives the membrane potential to −70 mV from pump cycles alone. Most resting potential comes from K⁺ leak. Fix the model or drop the potential.
- [x] Lesson 32: the somite sim is rate × time / 10. Model the clock and the gradient, or cut it. "About 30 somites" for a human is wrong (about 33 vertebrae, roughly 42–44 somite pairs). The frameshift questions give the answer away ("everything after shifts").
- [x] Build `classify` in `kit.js`, on evo lesson 17's Stage D pattern, with a counter per bin (`guidelines.md`).
- [x] Move the jsdom harness into `scripts/` with a `package.json`, so the checks survive the session.
- [ ] Open every lesson in a real browser once. Drawing and dragging are untested.
- [ ] Time a student run of three lessons, including 23, to set a length budget.

## Outline sections missing from the hand-built lessons

- [x] 2: redox, which the outline calls the "Semester throughline". Valence counts ("H 1, O 2, N 3, C 4"). The elements of life.
- [x] 4: the lipid half (saturated, unsaturated, phospholipid, lipoprotein classify) and enzyme naming (cards).
- [x] 6: the second half of lecture 6. Nucleotides, ribose versus deoxyribose, purines and pyrimidines ("Cut pie"), pairing geometry, tRNA's "Frozen accident", ATP and cAMP.
- [x] 7: surface area to volume ("Area squared, volume cubed"), with a cube slider. Large-cell exceptions. Prokaryote versus eukaryote. Endosymbiosis evidence, as a classify.
- [ ] 7: move the levels-of-life ladder to lesson 1 (it is book ch. 1, not lecture 7)? Lesson 7 now has 5 stages before its drill. JM to decide; removing Stage A changes lesson 7's scoring.
- [x] 9: the three filament types, tubulin and plus/minus ends, the 9+2 arrangement, intermediate filaments, extracellular matrix and integrins, plant cell walls. Consider trimming B's energy budget, which runs past the lecture.
- [x] 10: membrane fluidity (saturation, temperature, cholesterol, warm-blooded versus cold-blooded) as a sim. Fluid-mosaic protein types.
- [ ] 23 (needs JM): cut Stage E (polygenic trait under selection; already open in PLAN.md). Move or trim Stage D (dominance rules, lecture 25–26 material). Add cost of sex and when sex pays, ploidy and anisogamy, and alternation of generations.
- [x] 26: epistasis, with Labrador B and E loci making 9:3:4, best as a classify. Phenotypic plasticity. ABO as a stage, not just cards. (Three classify stages, C–E.)
- [x] 27: map-building from pairwise distances ("Pythagoras with fingers").
- [ ] 27: decide on male-fly recombination (PLAN.md).
- [x] 28: DNA structure, damage and repair ("Repair window closes after S phase"), transitions versus transversions, telomeres.

## Kit lessons

- [x] 3: cut the functional-group sort (giveaway bins, a garbled item, duplicates lesson 4). Add the "Correction: Ionic Bonds" point. Seven stages is too many.
- [x] 5: draw the side chains with `atoms.js` instead of naming them.
- [ ] 5 and 6: protein structure levels appear in both. Keep as spacing, or cut one?
- [x] 8: add the Golgi's three destinations. The organelle sort is near one-to-one matching.
- [ ] 11: tonicity questions repeat lesson 10's Stage B. Left as spacing for now (lecture 11 is the tonicity lecture).
- [x] 12: Hedgehog's chain of inhibitors (Patched, Smoothened, Gli) as a predict-the-output stage.
- [x] 15: a hands-on glycolysis ledger (investment, payoff). The drug sort is near one-to-one.
- [x] 16: predict first, then run the ETC sim.
- [ ] 17: six stages; trim once a timed run says how long it takes. The absorption sim overlaps 18.
- [x] 18: the electron's energy path as an uphill/downhill classify. (A drawn energy staircase would be better still.)
- [x] 19: goal 1 silently needs heat above about 38%. Say so or change the test.
- [x] 21: replace the mitosis order (duplicates 23 Stage M) with a mitotic-index classify.
- [x] 22: the spindle photobleaching experiment as a prediction. A cyclin-level trace.
- [ ] 31: the RNA zoo duplicates 33. Left as spacing for now.
- [x] 33: predict all four lac conditions before toggling. Add a repressor-mutant or operator-mutant puzzle.
- [x] 35: make "read top to bottom" one of the Sanger distractors.
- [x] 36: the editing sim is two checkboxes. Predict first.
- [x] Every kit lesson: titles that name the move; solved banners that state the finding; palette colours in canvases. Every kit `sort` is now a `classify`.
- [ ] 25: an F2 classify whose counts build 3:1 (the counts are the data).
- [ ] 27: a recombinant-count classify that gives a map distance.

## Across lessons

- [ ] Rewrite weak distractors in every `pick` stage. Lesson 1's two named examples are fixed; the rest still need a read-through.
- [ ] Decide which overlaps are deliberate spacing and cut the rest: tonicity (10, 11), structure levels (5, 6), functional groups (3, 4), mitosis (21, 23 M), mutation types (30, 32), RNA zoo (31, 33).
- [ ] Spelling: one of American or British throughout (about 118 "color", 23 "colour").
- [ ] Voice: dictation for every draft voice block.

## Open from PLAN.md

- [ ] Lesson 23 Stage E: cut, or end the lesson after D?
- [ ] Simplifications: male flies recombine in 27; ΔG°′ values in 13; polarity by bond pulls only in 2; the four-event kinesin cycle in 9.
- [ ] Spelling strictness in the drill: one free retry on a near miss. Too lenient or too strict?
