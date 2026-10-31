/* Lecture 4: Carbohydrates and lipids. Pacing from refs/outlines/2026_lec04_outline.tex; slide text from
 * lec_chpt02.pptx slides 45-46 and lec_chpt03.pptx slides 1-21, reworded toward the outline. */
(function (root) {
  'use strict';
  const L = [60, 110, 760, 660], R = [860, 110, 700, 660], WIDE = [60, 110, 1480, 660];
  const segments = [
    {
      id: 'title', title: 'Carbohydrates and lipids', noHead: true, mins: [0, 1],
      builds: [{}],
      items: [{ kind: 'title', box: [100, 180, 1400, 460], kick: 'BIO 145 · Lecture 4 · Chapter 3', text: 'Carbohydrates and lipids', sub: 'Big molecules from small ones, and what water does to them' }]
    },
    {
      id: 'recap', title: 'Recap', mins: [1, 4],
      builds: [{ prompt: 'Shape controls *where and when*' }, { prompt: 'The functional group controls *what reaction*' }],
      items: [{ kind: 'points', box: WIDE, cls: 'big', lines: ['Shape: where a molecule fits, and when', 'Functional group: what reaction it does'] }]
    },
    {
      id: 'polymers', title: 'Building and breaking polymers', mins: [4, 12],
      builds: [
        { prompt: 'Join two monomers: a water comes out' },
        { prompt: '*Dehydration* synthesis. Not the medical kind.' },
        { prompt: 'Put the water back: *hydrolysis*' },
        { prompt: 'Lysis: break apart. A lysosome is a "breaking body".' }
      ],
      items: [{ kind: 'joiner', id: 'j1', box: [40, 110, 1520, 660] }]
    },
    {
      id: 'sugars', title: 'Carbohydrates', mins: [12, 22],
      builds: [
        { prompt: '-ose: a sugar' },
        { prompt: 'In water, glucose closes into a ring' },
        { prompt: 'The OH on carbon 1 can point down…' },
        { prompt: '…or up. Same atoms.' },
        { prompt: 'Carbon 1 joins carbon 4: a *glycosidic* bond' }
      ],
      items: [
        { kind: 'points', box: WIDE, builds: [0, 1], cls: 'big', lines: [{ t: 'Monosaccharides: glucose, fructose, galactose', sub: 'aldoses carry the C=O at the end; ketoses in the middle' }, { t: 'Rings, with distinct shapes', sub: 'shape = function' }] },
        { kind: 'fig', box: [80, 110, 1440, 600], fig: 'alphaBeta', builds: [2, 3, 4] },
        { kind: 'points', box: [80, 700, 1440, 80], builds: [4], cls: 'small plain', lines: [{ t: 'Maltose: glucose + glucose. Sucrose: glucose + fructose. Lactose: glucose + galactose.', at: 4 }] }
      ]
    },
    {
      id: 'storage', title: 'Storing and building with sugar', mins: [22, 31],
      builds: [
        { prompt: 'Starch: pasta, sticky rice' },
        { prompt: 'Glycogen: the not-plants\' store' },
        { prompt: 'Cellulose: wood, plant fiber' },
        { prompt: 'One OH decides whether you can eat it' },
        { prompt: 'Cellulose and *cellulase*: the -ase breaks the -ose' },
        { prompt: 'Herbivores rent their guts to bacteria' },
        { prompt: 'Chitin: arthropods and fungi' }
      ],
      items: [
        { kind: 'fig', box: [40, 110, 1520, 600], fig: 'polysacc', builds: [0, 1, 2, 3] },
        { kind: 'points', box: L, builds: [4, 5], at: 4, lines: [{ t: 'Amylase breaks starch; lactase breaks lactose', sub: 'no lactase as an adult: lactose intolerance' }, { t: 'No animal makes cellulase', sub: 'cows and termites carry microbes that do' }] },
        { kind: 'photo', box: R, builds: [4, 5], src: 'ch03/cow-gut.png', alt: 'A cow\'s four-chambered stomach', diagram: true },
        { kind: 'photo', box: [260, 110, 1080, 600], builds: [6], src: 'ch03/cicada-molt.jpg', alt: 'A cicada\'s shed exoskeleton, made of chitin' }
      ]
    },
    {
      id: 'lipids', title: 'Lipids', mins: [31, 41],
      builds: [
        { prompt: 'Defined by *hydrophobicity*, not by a monomer' },
        { prompt: 'Straight tails, or kinked ones' },
        { prompt: 'Pack them' },
        { prompt: 'A fat: glycerol and three fatty acids' }, {}, {}, { prompt: 'Ester bonds; three waters out' }
      ],
      items: [
        { kind: 'fig', box: [40, 120, 1520, 600], fig: 'fattyAcids', builds: [0, 1] },
        { kind: 'fatPack', id: 'f1', box: [40, 110, 1520, 660], builds: [2] },
        { kind: 'fig', box: [40, 120, 1520, 600], fig: 'triglyceride', builds: [3, 4, 5, 6] }
      ]
    },
    {
      id: 'phospho', title: 'Phospholipids', mins: [41, 50],
      builds: [
        { prompt: 'A polar head on nonpolar tails' },
        { prompt: 'Put them in water…' },
        { prompt: '…and they build a bilayer themselves' },
        { prompt: 'Soap, detergent, bubbles: the same trick' }
      ],
      items: [
        { kind: 'points', box: WIDE, builds: [0], cls: 'big', lines: [{ t: 'Partly hydrophilic, partly hydrophobic', sub: 'one end loves water, the other hides from it' }] },
        { kind: 'fig', box: [40, 110, 1520, 640], fig: 'bilayer', builds: [1, 2, 3] }
      ]
    },
    {
      id: 'lipoproteins', title: 'Lipoproteins', mins: [50, 54],
      builds: [{ prompt: 'Fat can\'t travel loose in blood' }, { prompt: 'Two container trucks' }],
      items: [{ kind: 'fig', box: [100, 110, 1400, 640], fig: 'trucks', builds: [0, 1] }]
    },
    {
      id: 'check', title: 'Check yourself', mins: [54, 57],
      builds: [{ prompt: 'Why can\'t we digest grass?' }],
      items: [{ kind: 'vote', id: 'q1', box: [160, 110, 1280, 660], q: 'Starch and cellulose are both chains of glucose. We digest only starch because…', opts: ['our enzymes fit α linkages, not β', 'cellulose has no glucose', 'cellulose is a lipid', 'starch is smaller'], ans: 0, why: 'Same sugar, the other turn of one OH. A cow digests grass with its microbes\' cellulase.' }]
    }
  ];
  root.LECTURE = { id: 'lec04', short: 'Lecture 4', title: 'Carbohydrates and lipids', segments };
})(this);
