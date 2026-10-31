/* Lecture 9: Cytoskeleton and extracellular structures. Pacing from refs/outlines/2026_lec09_outline.tex; slide text
 * from lec_chpt04.pptx slides 25-38, reworded toward the outline. */
(function (root) {
  'use strict';
  const L = [60, 110, 760, 660], R = [860, 110, 700, 660], WIDE = [60, 110, 1480, 660];
  const segments = [
    {
      id: 'title', title: 'The cytoskeleton', noHead: true, mins: [0, 1],
      builds: [{}],
      items: [{ kind: 'title', box: [100, 180, 1400, 460], kick: 'BIO 145 · Lecture 9 · Chapter 4', text: 'Tracks, ropes, and walls', sub: 'The cytoskeleton, the matrix outside cells, and plant cell walls' }]
    },
    {
      id: 'inside', title: 'Mitochondria and chloroplasts', mins: [1, 8],
      builds: [{ prompt: 'Double membranes; cristae' }, { prompt: 'Thylakoids, stacked into grana' }, { prompt: 'Photosynthesis in one sentence' }, { prompt: 'Who controls their copying?' }],
      items: [
        { kind: 'fig', box: [40, 120, 1520, 560], fig: 'inside', builds: [0, 1] },
        { kind: 'points', box: WIDE, builds: [2, 3], at: 2, cls: 'big', lines: [{ t: 'Split water and carbon dioxide; join carbon to hydrogen; release oxygen' }, { t: 'Most of their genes moved to the nucleus', sub: 'the Jurassic Park lysine trick: they can\'t live without the host' }] }
      ]
    },
    {
      id: 'overview', title: 'The cytoskeleton', mins: [8, 13],
      builds: [{ prompt: 'Dynamic, not a skeleton' }, {}, {}, { prompt: 'Tubules hollow, filaments solid' }],
      items: [{ kind: 'fig', box: [40, 120, 1520, 560], fig: 'fibers', builds: [0, 1, 2, 3] }]
    },
    {
      id: 'microtubules', title: 'Microtubules', mins: [13, 20],
      builds: [{ prompt: 'Tubulin dimers' }, { prompt: 'Added at the plus end' }, { prompt: 'Removed at the minus end' }],
      items: [{ kind: 'fig', box: [40, 120, 1520, 520], fig: 'tubulin', builds: [0, 1, 2] }]
    },
    {
      id: 'motors', title: 'Motors', mins: [20, 28],
      builds: [{ prompt: 'Kinesin: toward the plus end' }, { prompt: 'Hand over hand' }, { prompt: 'One ATP per step' }, { prompt: 'Dynein: toward the minus end' }],
      items: [
        { kind: 'kinesin', id: 'k1', box: [40, 110, 1520, 660], builds: [0, 1, 2] },
        { kind: 'points', box: WIDE, builds: [3], at: 3, cls: 'big', lines: [{ t: 'Kinesin carries cargo out, toward the plus end', sub: 'anterograde' }, { t: 'Dynein carries it back, toward the minus end', sub: 'retrograde' }] }
      ]
    },
    {
      id: 'cilia', title: 'Cilia and flagella', mins: [28, 35],
      builds: [{ prompt: 'Nine pairs around two' }, { prompt: 'Dynein sliding becomes bending' }, { prompt: 'Anchored in a basal body' }, { prompt: 'Your left and your right' }],
      items: [
        { kind: 'fig', box: [80, 110, 1440, 560], fig: 'cilium', builds: [0, 1, 2] },
        { kind: 'points', box: L, builds: [3], at: 3, lines: [{ t: 'Cilia in the embryo\'s node beat one way', sub: 'and set which side the heart goes on' }, { t: 'Van Gogh proteins', sub: 'cells lining up their cilia the same way' }, { t: 'Centrosome: two centrioles', sub: 'where microtubule minus ends meet' }] },
        { kind: 'photo', box: R, builds: [3], src: 'ch04/urchin-sperm.jpg', alt: 'Sea urchin sperm, each with a flagellum' }
      ]
    },
    {
      id: 'actin', title: 'Microfilaments', mins: [35, 41],
      builds: [{ prompt: 'Twisted actin' }, { prompt: 'Crawl: build at the front' }, { prompt: 'Contract: myosin walks on actin' }, { prompt: 'Cytoplasmic streaming' }],
      items: [
        { kind: 'points', box: L, lines: ['Two twisted strands of actin beads', 'Amoeboid movement: polymerize at the leading edge', 'Muscle: in each sarcomere, myosin walks along actin', 'Cytoplasmic streaming in plant cells'] },
        { kind: 'photo', box: R, src: 'ch04/actin-fluorescence.jpg', alt: 'Cells stained so their actin fluoresces' }
      ]
    },
    {
      id: 'if', title: 'Intermediate filaments', mins: [41, 45],
      builds: [{ prompt: 'Different in different cells' }, { prompt: 'Salt on a slug, a salamander, a lizard' }, { prompt: 'Neurofilaments' }],
      items: [{ kind: 'points', box: WIDE, cls: 'big', lines: [{ t: 'Cell-type specific', sub: 'they bear tension' }, { t: 'Keratin', sub: 'salt kills a slug, hurts a salamander, does nothing to a lizard: keratinized skin' }, { t: 'Neurofilaments', sub: 'holding long axons in shape' }] }]
    },
    {
      id: 'ecm', title: 'Outside the cell', mins: [45, 51],
      builds: [{ prompt: 'The membrane' }, { prompt: 'A sugary coat and a matrix' }, { prompt: 'Integrins grip both sides' }, { prompt: 'Anchor, to push' }, { prompt: 'Cooperation, against pond water' }],
      items: [
        { kind: 'fig', box: [40, 110, 1520, 600], fig: 'ecm', builds: [0, 1, 2, 3] },
        { kind: 'points', box: WIDE, builds: [4], at: 4, cls: 'big', lines: [{ t: 'Your cells hold on to each other and cooperate', sub: 'the cells in pond water are murderers. You saw them in lab.' }] }
      ]
    },
    {
      id: 'walls', title: 'Plant cell walls', mins: [51, 56],
      builds: [{ prompt: 'From the inside out' }, {}, {}, {}, {}, { prompt: 'Plasmodesmata run through all of it' }],
      items: [{ kind: 'fig', box: [40, 120, 1520, 580], fig: 'wall', builds: [0, 1, 2, 3, 4, 5] }]
    }
  ];
  root.LECTURE = { id: 'lec09', short: 'Lecture 9', title: 'Tracks, ropes, and walls', segments };
})(this);
