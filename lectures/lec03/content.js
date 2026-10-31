/* Lecture 3: Water, pH, and the shape principle. Pacing from refs/outlines/2026_lec03_outline.tex; slide text from
 * lec_chpt02.pptx slides 20-44, reworded toward the outline. */
(function (root) {
  'use strict';
  const L = [60, 110, 740, 660], R = [840, 110, 720, 660], WIDE = [60, 110, 1480, 660];
  const segments = [
    {
      id: 'title', title: 'Water, pH, and shape', noHead: true, mins: [0, 1],
      builds: [{}],
      items: [{ kind: 'title', box: [100, 180, 1400, 460], kick: 'BIO 145 · Lecture 3 · Chapters 2–3', text: 'Water, pH, and shape', sub: 'Why a bent molecule runs the planet, and why shape decides what a molecule does' }]
    },
    {
      id: 'correction', title: 'A correction: ionic bonds', mins: [1, 4],
      builds: [{ prompt: 'A student caught me oversimplifying' }, { prompt: 'Dry: strong. In water: weak.' }],
      items: [{ kind: 'fig', box: [40, 110, 1520, 600], fig: 'saltWater', builds: [0, 1] }]
    },
    {
      id: 'water', title: 'Water is sticky', mins: [4, 15],
      builds: [
        { prompt: 'Hydrogen bonds: everything else follows' },
        { prompt: 'Surface tension' },
        { prompt: 'High specific heat' },
        { prompt: 'Evaporative cooling' },
        { prompt: 'Ice floats' },
        { prompt: 'Lakes freeze top down. Cedar River fish survive.' }
      ],
      items: [
        { kind: 'fig', box: [80, 110, 1440, 600], fig: 'hbonds', builds: [0], all: true },
        { kind: 'points', box: L, builds: [1, 2, 3], at: 1, cls: 'big', lines: [{ t: 'Surface tension', sub: 'surface molecules hold tighter to the ones beside and below' }, { t: 'High specific heat', sub: 'temperature is how fast molecules move; sticky ones are hard to speed up. Three-year-olds linked by arms.' }, { t: 'Evaporative cooling', sub: 'only the fastest escape; the rest are cooler' }] },
        { kind: 'photo', box: R, builds: [1], img: 'os-2-18-water-strider.jpg', credit: 'OpenStax Biology 2e, Fig. 2.18 (Tim Vickers), CC BY 4.0', alt: 'A water strider standing on the surface of the water' },
        { kind: 'photo', box: R, builds: [2, 3], img: 'os-33-22b-evaporation.jpg', credit: 'OpenStax Biology 2e, Fig. 33.22b (Kullez/Flickr), CC BY 4.0', alt: 'Sweat beading on a shoulder: evaporation carries heat away' },
        { kind: 'fig', box: [40, 110, 1520, 600], fig: 'ice', builds: [4, 5] }
      ]
    },
    {
      id: 'ph', title: 'Acids, bases, and pH', mins: [15, 24],
      builds: [
        { prompt: 'Acids *donate* protons. Bases *accept* them.' },
        { prompt: 'Water splits itself, a little: H⁺ and OH⁻' },
        { prompt: 'Each step is *ten times*' },
        { prompt: 'Poisons and medicines: both are chemistry' }
      ],
      items: [
        { kind: 'phScale', id: 'p1', box: [40, 120, 1520, 560], builds: [0, 1, 2] },
        { kind: 'points', box: WIDE, builds: [3], at: 3, cls: 'big', lines: ['Both react with your chemistry', 'Both pull you away from homeostasis', { t: 'The dose decides which it is', sub: 'and whether it matters' }] }
      ]
    },
    {
      id: 'buffer', title: 'Buffers', mins: [24, 30],
      builds: [
        { prompt: 'A weak acid, sitting in equilibrium' },
        { prompt: 'Add acid: the buffer soaks it up' },
        { prompt: 'Hyperventilate: blow off CO₂, pH *rises*' }
      ],
      items: [{ kind: 'buffer', id: 'b1', box: [40, 120, 1520, 640] }]
    },
    {
      id: 'shape', title: 'Organic molecules: shape', mins: [30, 38],
      builds: [
        { prompt: 'Carbon backbones' },
        {}, {},
        { prompt: 'Shape matters. *Underline that.*' },
        { prompt: 'Chain length' }, { prompt: 'Branching' }, { prompt: 'Where the double bond is' }, { prompt: 'Rings' }
      ],
      items: [
        { kind: 'fig', box: [40, 110, 1520, 600], fig: 'represent', builds: [0, 1, 2, 3] },
        { kind: 'fig', box: [40, 110, 1520, 640], fig: 'skeletons', builds: [4, 5, 6, 7] }
      ]
    },
    {
      id: 'isomers', title: 'Isomers', mins: [38, 45],
      builds: [{ prompt: 'Same atoms, different bonds' }, { prompt: 'Same bonds, flipped' }, { prompt: 'Mirror images. Receptors read shape.' }],
      items: [{ kind: 'fig', box: [40, 110, 1520, 640], fig: 'isomers', builds: [0, 1, 2] }]
    },
    {
      id: 'groups', title: 'Functional groups', mins: [45, 53],
      builds: [
        { prompt: 'Memorize by writing them out' }, {}, {}, {}, {}, {},
        { prompt: 'Vitamins: "vital amines". The name outlived the chemistry.' },
        { prompt: 'The group decides more than the chain length' }
      ],
      items: [{ kind: 'fig', box: [40, 110, 1520, 660], fig: 'groups', builds: [0, 1, 2, 3, 4, 5, 6, 7] }]
    },
    {
      id: 'check', title: 'Check yourself', mins: [53, 56],
      builds: [{ prompt: 'Which is polar?' }, { prompt: 'Ethanol and dimethyl ether are…' }],
      items: [
        { kind: 'vote', id: 'q1', box: [160, 110, 1280, 660], builds: [0], q: 'Which will dissolve in water?', opts: ['table salt', 'olive oil', 'methane'], ans: 0, why: 'Salt: its ions are pulled apart and wrapped in waters. Oil and methane are nonpolar.' },
        { kind: 'vote', id: 'q2', box: [160, 110, 1280, 660], builds: [1], q: 'Ethanol and dimethyl ether (both C₂H₆O) are…', opts: ['structural isomers', 'geometric isomers', 'mirror images', 'the same molecule'], ans: 0, why: 'Same atoms, connected differently.' }
      ]
    }
  ];
  root.LECTURE = { id: 'lec03', short: 'Lecture 3', title: 'Water, pH, and shape', segments };
})(this);
