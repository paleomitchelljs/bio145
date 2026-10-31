/* Lecture 7: Cell size, diffusion, and endosymbiosis. Pacing from refs/outlines/2026_lec07_outline.tex; slide text from
 * lec_chpt04.pptx slides 1-13, reworded toward the outline. */
(function (root) {
  'use strict';
  const L = [60, 110, 760, 660], R = [860, 110, 700, 660], WIDE = [60, 110, 1480, 660];
  const segments = [
    {
      id: 'title', title: 'Cells: size, diffusion, origins', noHead: true, mins: [0, 1],
      builds: [{}],
      items: [{ kind: 'title', box: [100, 180, 1400, 460], kick: 'BIO 145 · Lecture 7 · Chapter 4', text: 'Why cells are small', sub: 'Diffusion, surface and volume, and the bacteria living inside you' }]
    },
    {
      id: 'scale', title: 'Scale', mins: [1, 7],
      builds: [{ prompt: 'Small is not one thing' }, {}, { prompt: 'A mitochondrion is bacterium-sized' }],
      items: [{ kind: 'fig', box: [40, 120, 1520, 560], fig: 'ratios', builds: [0, 1, 2] }]
    },
    {
      id: 'diffusion', title: 'Diffusion', mins: [7, 15],
      builds: [
        { prompt: 'Spreading, with no energy spent' },
        { prompt: 'Open the membrane' },
        { prompt: 'Entropy, in space' },
        { prompt: 'A membrane is the difference between water on a table and water in a bowl' },
        { prompt: 'Fast over short distances. *Very* slow over long ones.' }
      ],
      items: [
        { kind: 'diffuse', id: 'd1', box: [40, 110, 1520, 600], builds: [0, 1, 2, 3] },
        { kind: 'points', box: WIDE, builds: [4], at: 4, cls: 'big', lines: [{ t: 'High concentration to low', sub: 'a bigger difference spreads faster' }, { t: 'Non-random distributions: that is homeostasis', sub: 'keeping things where diffusion wouldn\'t' }, 'Slow over distance: a cell can\'t wait on diffusion across a whale'] }
      ]
    },
    {
      id: 'sav', title: 'Surface area and volume', mins: [15, 25],
      builds: [
        { prompt: 'Area squared, volume cubed' },
        { prompt: 'Food comes in through the surface; needs scale with the volume' },
        { prompt: 'Now cut it up' },
        { prompt: 'Why a whale is made of many cells' },
        { prompt: 'Crushed ice melts faster than one big cube' }
      ],
      items: [
        { kind: 'cube', id: 'c1', box: [40, 110, 1520, 600], builds: [0, 1, 2, 3] },
        { kind: 'photo', box: [300, 110, 1000, 600], builds: [4], src: 'ch04/crushed-ice.jpg', alt: 'A drink full of crushed ice' }
      ]
    },
    {
      id: 'big', title: 'The exceptions: big cells', mins: [25, 31],
      builds: [{ prompt: 'Long and skinny' }, { prompt: 'A nerve that loops around the heart' }, { prompt: 'Short and flat' }, { prompt: 'Full of stored food: an ostrich egg is one cell' }],
      items: [
        { kind: 'photo', box: L, builds: [0], src: 'ch04/squid-axon.png', alt: 'A squid and its giant axon, about 1 mm across', diagram: true },
        { kind: 'photo', box: L, builds: [1], src: 'ch04/giraffe-nerve.jpg', alt: 'The recurrent laryngeal nerve: down the neck, around the heart, and back up', diagram: true },
        { kind: 'photo', box: L, builds: [2, 3], src: 'ch04/gromia.png', alt: 'Gromia sphaerica, a single cell about an inch across' },
        { kind: 'points', box: R, at: 0, lines: [{ t: 'Squid giant axon', sub: 'long, about a millimeter wide' }, { t: 'Recurrent laryngeal nerve', sub: 'in a giraffe, or a sauropod: meters' }, { t: 'Valonia, Gromia', sub: 'big, but their contents spread thin' }, { t: 'Eggs', sub: 'mostly stored food' }] }
      ]
    },
    {
      id: 'scopes', title: 'Seeing cells', mins: [31, 37],
      builds: [{ prompt: 'Light' }, { prompt: 'Electrons through a slice' }, { prompt: 'Electrons off the surface' }, { prompt: 'What they show' }],
      items: [
        { kind: 'fig', box: [80, 110, 1440, 600], fig: 'scopes', builds: [0, 1, 2] },
        { kind: 'photo', box: [60, 110, 480, 640], builds: [3], src: 'ch04/stained-cell.jpg', alt: 'A stained cell under the light microscope' },
        { kind: 'photo', box: [560, 110, 480, 640], builds: [3], src: 'ch04/tem-cell.jpg', alt: 'A transmission electron micrograph of a cell' },
        { kind: 'photo', box: [1060, 110, 480, 640], builds: [3], src: 'ch04/sem-surface.jpg', alt: 'A scanning electron micrograph of a surface' }
      ]
    },
    {
      id: 'prok', title: 'Prokaryotes and eukaryotes', mins: [37, 43],
      builds: [{ prompt: 'Karyon: nucleus. Pro: before.' }, { prompt: 'A tent and a house' }, { prompt: 'Internal walls cost something' }],
      items: [
        { kind: 'fig', box: [80, 110, 1440, 560], fig: 'tentHouse', builds: [0, 1, 2] },
        { kind: 'points', box: [80, 690, 1440, 80], builds: [2], cls: 'small plain', lines: [{ t: 'Prokaryotes: a nucleoid region, no internal membranes. Eukaryotes: membrane-bound organelles.', at: 2 }] }
      ]
    },
    {
      id: 'endo', title: 'Endosymbiosis', mins: [43, 53],
      builds: [
        { prompt: 'A membrane folds in' },
        { prompt: 'A bacterium is engulfed' },
        { prompt: 'And kept' },
        { prompt: 'Then again' },
        { prompt: 'The evidence' },
        { prompt: 'Lynn Margulis: dismissed as crazy, proven right' },
        { prompt: 'Prokaryotes with delusions of grandeur' }
      ],
      items: [
        { kind: 'fig', box: [40, 110, 1520, 620], fig: 'endo', builds: [0, 1, 2, 3] },
        { kind: 'points', box: WIDE, builds: [4, 5, 6], at: 4, lines: [{ t: 'Their own circular DNA', sub: 'and they divide by binary fission' }, { t: 'Prokaryote-sized ribosomes; bacterial-style membranes', sub: 'Wolbachia is doing it right now, inside insects' }, { t: 'A plant cell is a chimera of three ancestors', sub: 'host, mitochondrion, chloroplast' }] }
      ]
    }
  ];
  root.LECTURE = { id: 'lec07', short: 'Lecture 7', title: 'Why cells are small', segments };
})(this);
