/* Lecture 5: Steroids, proteins, and protein structure. Pacing from refs/outlines/2026_lec05_outline.tex; slide text
 * from lec_chpt03.pptx slides 22-35, reworded toward the outline. */
(function (root) {
  'use strict';
  const WIDE = [60, 110, 1480, 660];
  const segments = [
    {
      id: 'title', title: 'Steroids and proteins', noHead: true, mins: [0, 1],
      builds: [{}],
      items: [{ kind: 'title', box: [100, 180, 1400, 460], kick: 'BIO 145 · Lecture 5 · Chapter 3', text: 'Steroids and proteins', sub: 'A key blank with different teeth, and the molecules that do things' }]
    },
    {
      id: 'steroids', title: 'Steroids', mins: [1, 11],
      builds: [
        { prompt: 'Four fused rings: the key blank' },
        { prompt: 'Change the teeth, change the hormone' },
        {}, {},
        { prompt: 'Cholesterol is useful. Your liver makes what you need.' }
      ],
      items: [
        { kind: 'fig', box: [40, 110, 1520, 600], fig: 'steroidCore', builds: [0] },
        { kind: 'steroid', id: 's1', box: [40, 110, 1520, 660], builds: [1, 2, 3] },
        { kind: 'points', box: WIDE, builds: [4], at: 4, cls: 'big', lines: ['Hormones, vitamin D, membranes, repair', 'The liver makes all you need', 'Dietary surplus builds up'] }
      ]
    },
    {
      id: 'bonds', title: 'Bonds by macromolecule', mins: [11, 15],
      builds: [{ prompt: 'Four macromolecules, four joins' }, {}, {}, { prompt: 'Every one: dehydration to make, hydrolysis to break' }],
      items: [{ kind: 'fig', box: [100, 110, 1400, 620], fig: 'bondTable', builds: [0, 1, 2, 3] }]
    },
    {
      id: 'jobs', title: 'Proteins do stuff', mins: [15, 22],
      builds: [{ prompt: 'A verb in the cell needs a protein noun' }, { prompt: 'Match each protein to its job' }],
      items: [
        { kind: 'points', box: WIDE, builds: [0], cls: 'big', lines: ['Enzymes, transport, motion, regulation, defense, structure, storage'] },
        {
          kind: 'sort', id: 'jobs', builds: [1], box: [0, 100, 1600, 690],
          bins: [{ t: 'Enzyme', box: [60, 110, 340, 230] }, { t: 'Transport', box: [420, 110, 340, 230] }, { t: 'Motion', box: [780, 110, 340, 230] }, { t: 'Regulation', box: [1140, 110, 400, 230] },
            { t: 'Defense', box: [60, 360, 460, 210] }, { t: 'Structure', box: [540, 360, 460, 210] }, { t: 'Storage', box: [1020, 360, 520, 210] }],
          tray: [60, 590, 1480, 170],
          chips: [{ t: 'amylase', bin: 0 }, { t: 'ion channels', bin: 1 }, { t: 'actin and myosin', bin: 2 }, { t: 'insulin', bin: 3 }, { t: 'antibodies', bin: 4 }, { t: 'collagen', bin: 5 }, { t: 'keratin', bin: 5 }, { t: 'egg white (ovalbumin)', bin: 6 }]
        }
      ]
    },
    {
      id: 'amino', title: 'Amino acids', mins: [22, 32],
      builds: [
        { prompt: 'Amino group, carboxyl group, a side chain' },
        { prompt: 'Only R varies' },
        { prompt: '"Essential": named backwards. Essential to *eat*.' },
        { prompt: 'Same twenty in bacteria and trees: a frozen accident' },
        { prompt: 'Nonpolar' }, { prompt: 'Polar' }, { prompt: 'Charged' }
      ],
      items: [
        { kind: 'fig', box: [40, 110, 1520, 620], fig: 'aminoAcid', builds: [0, 1, 2] },
        { kind: 'points', box: WIDE, builds: [3], at: 3, cls: 'big', lines: [{ t: 'Every living thing uses the same 20', sub: 'the tRNA anticodons lock the matching in: change it and everything breaks' }] },
        { kind: 'fig', box: [80, 110, 1440, 620], fig: 'sideChains', builds: [4, 5, 6] }
      ]
    },
    {
      id: 'peptide', title: 'The peptide bond', mins: [32, 38],
      builds: [{ prompt: 'Two amino acids' }, { prompt: 'Carboxyl meets amino' }, { prompt: 'A chain, as long as you like' }],
      items: [{ kind: 'fig', box: [40, 110, 1520, 600], fig: 'peptide', builds: [0, 1, 2] }]
    },
    {
      id: 'levels', title: 'Four levels of structure', mins: [38, 50],
      builds: [
        { prompt: 'Primary: the sequence' },
        { prompt: 'Secondary: helices and sheets' },
        { prompt: 'Tertiary: the whole 3D fold' },
        { prompt: 'Quaternary: more than one chain' },
        { prompt: 'Quaternary depends on what else is around' }
      ],
      items: [
        { kind: 'fig', box: [60, 140, 1480, 420], fig: 'levels', builds: [0, 1, 2, 3, 4] },
        { kind: 'points', box: [80, 600, 1440, 160], builds: [4], cls: 'small', lines: [{ t: 'Same gene, different complexes, depending on which partner proteins the cell has made', at: 4 }] }
      ]
    },
    {
      id: 'check', title: 'Check yourself', mins: [50, 54],
      builds: [{ prompt: 'Which level is a helix?' }, { prompt: 'Which bond joins two amino acids?' }],
      items: [
        { kind: 'vote', id: 'q1', box: [160, 110, 1280, 660], builds: [0], q: 'An α helix is which level of structure?', opts: ['primary', 'secondary', 'tertiary', 'quaternary'], ans: 1, why: 'Secondary: a local shape held by hydrogen bonds along the backbone.' },
        { kind: 'vote', id: 'q2', box: [160, 110, 1280, 660], builds: [1], q: 'Two amino acids are joined by a…', opts: ['peptide bond', 'glycosidic bond', 'ester bond', 'hydrogen bond'], ans: 0, why: 'A peptide bond, made by dehydration between a carboxyl and an amino group.' }
      ]
    }
  ];
  root.LECTURE = { id: 'lec05', short: 'Lecture 5', title: 'Steroids and proteins', segments };
})(this);
