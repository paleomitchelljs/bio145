/* Lecture 2: atoms, bonds, and redox. Order from the 2026 recording
 * (Courses/transcripts/145/transcripts/raw/2026_exam01_lec02_transcript.txt); pictures after lec_chpt02.pptx slides
 * 2-27 and homework 2. The screen follows lecture 1's rules (see the top of lec01/content.js): the slide shows what JM
 * would draw or point at, a prompt is only a question he puts to the room, words on a slide are labels.
 *
 * One change from the 2026 recording: there JM ranked ionic bonds below covalent, and corrected it at the start of
 * lecture 3 (ionic bonds are stronger in a dry crystal; dissolved in water they just come apart). This deck says the
 * corrected version: "ionic, in water".
 */
(function (root) {
  'use strict';
  const FULL = [40, 100, 1520, 680];
  const none = (n) => Array.from({ length: n }, () => ({}));
  const segments = [
    {
      id: 'title', title: 'Atoms, bonds, and redox', noHead: true, mins: [0, 1],
      builds: [{}],
      items: [{ kind: 'title', box: [100, 180, 1400, 460], kick: 'BIO 145 · Lecture 2 · Chapter 2', text: 'Atoms, bonds, and redox' }]
    },
    {
      id: 'origins', title: 'Where the elements came from', mins: [1, 4.5],
      builds: none(5),
      items: [{ kind: 'fig', box: FULL, fig: 'ptable', opts: { mode: 'origin' } }]
    },
    {
      id: 'life', title: 'The elements of life', mins: [4.5, 8.5],
      builds: none(6),
      items: [
        { kind: 'fig', box: FULL, fig: 'ptable', opts: { mode: 'life' }, builds: [0, 1, 5] },
        { kind: 'fig', box: FULL, fig: 'valence', builds: [2, 3, 4] }
      ]
    },
    {
      id: 'element', title: 'What is an element?', mins: [8.5, 11],
      builds: [{ prompt: 'Did we know the elements before or after we could see atoms?' }, {}, {}, {}],
      items: [{ kind: 'fig', box: FULL, fig: 'alchemy' }]
    },
    {
      id: 'atom', title: 'Inside an atom', mins: [11, 15.5],
      builds: none(2),
      items: [
        { kind: 'atomBuilder', id: 'a1', box: [40, 110, 1520, 660], builds: [0], start: { p: 2, n: 2, e: 2 } },
        { kind: 'fig', box: [100, 140, 1400, 520], fig: 'particles', builds: [1] }
      ]
    },
    {
      id: 'orbit', title: 'Where the electrons are', mins: [15.5, 22],
      builds: [{}, {}, {}, { prompt: 'What if I add a ton of energy?' }, {}, {}, {}, {}],
      items: [
        { kind: 'fig', box: FULL, fig: 'paddle', builds: [0, 1, 2, 3, 4] },
        { kind: 'fig', box: FULL, fig: 'ringCloud', builds: [5] },
        { kind: 'fig', box: FULL, fig: 'shells', builds: [6, 7] }
      ]
    },
    {
      id: 'covalent', title: 'Covalent bonds', mins: [22, 25.5],
      builds: none(4),
      items: [{ kind: 'fig', box: FULL, fig: 'share' }]
    },
    {
      id: 'en', title: 'Electronegativity', mins: [25.5, 29],
      builds: [{ prompt: 'Do they eat the same amount of food?' }, {}],
      items: [
        { kind: 'fig', box: FULL, fig: 'roommates', builds: [0] },
        { kind: 'tug', id: 't1', box: [40, 110, 1520, 660], builds: [1], start: { a: 'O', b: 'H' } }
      ]
    },
    {
      id: 'polar', title: 'Polar and nonpolar', mins: [29, 32],
      builds: none(3),
      items: [
        { kind: 'bend', id: 'w1', box: [40, 110, 1520, 660], builds: [0] },
        { kind: 'fig', box: FULL, fig: 'waterMethane', builds: [1, 2] }
      ]
    },
    {
      id: 'redox', title: 'Redox', mins: [32, 37],
      builds: none(5),
      items: [
        { kind: 'fig', box: FULL, fig: 'redox', builds: [0, 2, 3] },
        { kind: 'fig', box: [100, 160, 1400, 460], fig: 'backwards', builds: [1] },
        { kind: 'fig', box: FULL, fig: 'throughline', builds: [4] }
      ]
    },
    {
      id: 'ions', title: 'Ions', mins: [37, 40],
      builds: none(4),
      items: [
        { kind: 'fig', box: [150, 160, 1300, 460], fig: 'ions', builds: [0] },
        { kind: 'fig', box: FULL, fig: 'balloon', builds: [1, 2] },
        { kind: 'fig', box: [100, 140, 1400, 520], fig: 'ladder', builds: [3] }
      ]
    },
    {
      id: 'dissolve', title: 'Dissolving', mins: [40, 45],
      builds: none(5),
      items: [
        { kind: 'fig', box: FULL, fig: 'saltWater', opts: { dry: 'salt: the solute', wet: 'water: the solvent' }, builds: [0, 1] },
        { kind: 'fig', box: FULL, fig: 'likeLike', builds: [2, 3, 4] }
      ]
    },
    {
      id: 'hbond', title: 'Hydrogen bonds', mins: [45, 48],
      builds: none(4),
      items: [
        { kind: 'fig', box: FULL, fig: 'hbond', builds: [0, 1] },
        { kind: 'fig', box: FULL, fig: 'fold', builds: [2] },
        { kind: 'fig', box: [100, 140, 1400, 520], fig: 'ladder', builds: [3], all: true }
      ]
    },
    {
      id: 'heat', title: 'Heat', mins: [48, 49.3],
      builds: none(2),
      items: [{ kind: 'fig', box: FULL, fig: 'heat' }]
    },
    {
      id: 'rank', title: 'Strongest to weakest', mins: [49.3, 50],
      builds: [{ prompt: 'On a scrap of paper, with your name: strongest to weakest' }],
      items: [{
        kind: 'sort', id: 'rank', box: [0, 100, 1600, 690],
        bins: [{ t: '1 · strongest', box: [60, 20, 350, 380] }, { t: '2', box: [430, 20, 350, 380] }, { t: '3', box: [800, 20, 350, 380] }, { t: '4 · weakest', box: [1170, 20, 370, 380] }],
        tray: [60, 440, 1480, 200],
        chips: [{ t: 'hydrogen', bin: 3 }, { t: 'single covalent', bin: 1 }, { t: 'ionic, in water', bin: 2 }, { t: 'double covalent', bin: 0 }]
      }]
    }
  ];
  root.LECTURE = { id: 'lec02', short: 'Lecture 2', title: 'Atoms, bonds, and redox', segments };
})(this);
