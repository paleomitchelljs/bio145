/* Lecture 2: Atoms, bonds, and redox. Pacing from refs/outlines/2026_lec02_outline.tex; slide text from
 * lec_chpt02.pptx slides 1-26 and 34, reworded toward the outline. */
(function (root) {
  'use strict';
  const L = [60, 110, 760, 660], R = [860, 110, 700, 660], WIDE = [60, 110, 1480, 660];
  const segments = [
    {
      id: 'title', title: 'Atoms, bonds, and redox', noHead: true, mins: [0, 1],
      builds: [{}],
      items: [{ kind: 'title', box: [100, 180, 1400, 460], kick: 'BIO 145 · Lecture 2 · Chapter 2', text: 'Atoms, bonds, and redox', sub: 'Life is chemistry with a history' }]
    },
    {
      id: 'elements', title: 'Elements of life', mins: [1, 8],
      builds: [
        { prompt: 'About 25 elements matter to life' },
        { prompt: 'Earth is mostly *iron and rock*. You aren\'t.' },
        { prompt: 'Hydrogen from the Big Bang; heavier elements from supernovae' },
        { prompt: 'How many bonds each one makes: *valence*' }
      ],
      items: [
        { kind: 'fig', box: [40, 110, 1520, 640], fig: 'bodyEarth', builds: [0, 1] },
        { kind: 'points', box: L, builds: [2, 3], at: 2, cls: 'big', lines: ['Hydrogen: made in the Big Bang', 'Heavier elements: made in stars and supernovae'] },
        { kind: 'cmp', box: [880, 160, 660, 440], builds: [3], at: 3, together: true, cols: [{ h: 'Valence', lines: ['H: 1', 'O: 2', 'N: 3', 'C: 4'] }] }
      ]
    },
    {
      id: 'atom', title: 'Inside an atom', mins: [8, 17],
      builds: [
        { prompt: 'Protons (+), neutrons (0), electrons (−)' },
        { prompt: 'Change the protons: a *different element*' },
        { prompt: 'Change the neutrons: an *isotope*' },
        { prompt: 'Change the electrons: an *ion*' },
        { prompt: 'Cations (+) and anions (−)' }
      ],
      items: [
        { kind: 'atomBuilder', id: 'a1', box: [40, 110, 1520, 660] }
      ]
    },
    {
      id: 'orbitals', title: 'Where the electrons are', mins: [17, 21],
      builds: [{ prompt: 'Not a perfect analogy: a paddleball' }, { prompt: 'Add energy: farther from the nucleus' }, { prompt: 'An average distance, not a fixed ring' }],
      items: [
        { kind: 'fig', box: [40, 110, 1520, 560], fig: 'paddle', builds: [0, 1] },
        { kind: 'points', box: WIDE, builds: [2], at: 2, cls: 'big', lines: [{ t: 'Shells: roughly how far an electron gets', sub: 'its exact position is unknowable' }, { t: 'A cloud, not the Bohr rings', sub: 'the rings are a bookkeeping device' }, { t: 'Outermost electrons: most energy, weakest held', sub: 'the valence electrons, the ones that bond' }] }
      ]
    },
    {
      id: 'covalent', title: 'Covalent bonds', mins: [21, 26],
      builds: [{ prompt: 'Co-presidents share the office: *co-valence*' }, { prompt: 'Two pairs: a double bond' }, { prompt: 'A real bond: it has to be *broken*' }],
      items: [{ kind: 'fig', box: [40, 120, 1520, 560], fig: 'covalent', builds: [0, 1, 2] }]
    },
    {
      id: 'en', title: 'Electronegativity', mins: [26, 34],
      builds: [
        { prompt: 'Roommates sharing groceries' },
        { prompt: 'Who gets the pair?' },
        { prompt: 'Uneven sharing: partial charges' },
        { prompt: 'Water is bent: a + end and a − end' },
        { prompt: 'Methane is symmetric: no poles' },
        { prompt: 'Oil and water' }
      ],
      items: [
        { kind: 'tug', id: 't1', box: [40, 110, 1520, 660], builds: [0, 1, 2] },
        { kind: 'fig', box: [80, 120, 1440, 560], fig: 'waterMethane', builds: [3, 4, 5] },
        { kind: 'points', box: [80, 690, 1440, 80], builds: [5], cls: 'small plain', lines: [{ t: 'Polar dissolves polar ("like with like"); polar and nonpolar stay apart.', at: 5 }] }
      ]
    },
    {
      id: 'ionic', title: 'Ionic and hydrogen bonds', mins: [34, 42],
      builds: [
        { prompt: 'A balloon stuck to a wall' },
        { prompt: 'In water: pulled apart' },
        { prompt: 'Hydrogen can\'t stand up for itself' },
        {}, {}, {},
        { prompt: 'Weak alone, strong *together*' },
        { prompt: 'Rank them: strongest first?' }
      ],
      items: [
        { kind: 'fig', box: [40, 110, 1520, 600], fig: 'saltWater', builds: [0, 1] },
        { kind: 'fig', box: [80, 110, 1440, 600], fig: 'hbonds', builds: [2, 3, 4, 5, 6] },
        { kind: 'vote', id: 'rank', box: [160, 110, 1280, 660], builds: [7], q: 'In a cell (in water), the strongest is…', opts: ['a covalent bond', 'an ionic bond', 'a hydrogen bond'], ans: 0, why: 'Covalent, by far. Ionic bonds are strong only when dry; in water they\'re weak, near hydrogen bonds.' }
      ]
    },
    {
      id: 'redox', title: 'Redox', mins: [42, 50],
      builds: [
        { prompt: 'Sodium and chlorine' },
        { prompt: 'One electron moves' },
        { prompt: '*OIL RIG*: oxidation is loss, reduction is gain' },
        { prompt: 'The names are backwards' },
        { prompt: 'Always paired' },
        { prompt: 'All semester: electrons moving' }
      ],
      items: [
        { kind: 'fig', box: [40, 110, 1520, 640], fig: 'redox', builds: [0, 1, 2] },
        { kind: 'points', box: WIDE, builds: [3, 4, 5], at: 3, cls: 'big', lines: [{ t: 'Backwards because early electricity assumed the + charges moved', sub: 'the electrons move; a "reduced" atom gained one' }, 'Whatever loses electrons hands them to something that gains them', { t: 'Photosynthesis, respiration, electron transport chains, ATP', sub: 'every one of them is electrons moving between molecules' }] }
      ]
    },
    {
      id: 'check', title: 'Check yourself', mins: [50, 55],
      builds: [{ prompt: 'What makes an atom carbon?' }, { prompt: 'An atom of sodium loses an electron. It is now…' }, { prompt: 'Carbon-12 and carbon-14 are…' }],
      items: [
        { kind: 'vote', id: 'q1', box: [160, 110, 1280, 660], builds: [0], q: 'What decides which element an atom is?', opts: ['the number of protons', 'the number of neutrons', 'the number of electrons'], ans: 0, why: 'Protons. Change them and it is a different element.' },
        { kind: 'vote', id: 'q2', box: [160, 110, 1280, 660], builds: [1], q: 'Sodium loses an electron. It is now…', opts: ['an ion, charge +1', 'an isotope', 'a different element'], ans: 0, why: 'An ion: a cation. It was oxidized.' },
        { kind: 'vote', id: 'q3', box: [160, 110, 1280, 660], builds: [2], q: 'Carbon-12 and carbon-14 are…', opts: ['isotopes: different neutrons', 'ions: different electrons', 'different elements'], ans: 0, why: 'Same protons, same chemistry, different mass.' }
      ]
    }
  ];
  root.LECTURE = { id: 'lec02', short: 'Lecture 2', title: 'Atoms, bonds, and redox', segments };
})(this);
