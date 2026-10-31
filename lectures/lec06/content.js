/* Lecture 6: Protein folding, nucleic acids, and exam 1 review. Pacing from refs/outlines/2026_lec06_outline.tex;
 * slide text from lec_chpt03.pptx slides 33-44, reworded toward the outline. */
(function (root) {
  'use strict';
  const WIDE = [60, 110, 1480, 660];
  const segments = [
    {
      id: 'title', title: 'Folding, and nucleic acids', noHead: true, mins: [0, 1],
      builds: [{}],
      items: [{ kind: 'title', box: [100, 180, 1400, 460], kick: 'BIO 145 · Lecture 6 · Chapter 3', text: 'Folding, and nucleic acids', sub: 'Shapes nobody assembles, and the molecule that stores the instructions' }]
    },
    {
      id: 'study', title: 'How memory works', mins: [1, 4],
      builds: [{ prompt: 'You remember what you think matters' }, { prompt: 'Biology versus football' }],
      items: [{ kind: 'points', box: WIDE, cls: 'big', lines: [{ t: 'Memory follows perceived importance', sub: 'the football fan who knows every stat' }, { t: 'So decide this matters', sub: 'then the details stick' }] }]
    },
    {
      id: 'forces', title: 'What holds a fold', mins: [4, 12],
      builds: [{ prompt: 'Disulfide bridges' }, { prompt: 'Ionic bonds' }, { prompt: 'Hydrogen bonds' }, { prompt: 'Hydrophobic interactions' }],
      items: [{ kind: 'fig', box: [80, 110, 1440, 600], fig: 'forces' }]
    },
    {
      id: 'fold', title: 'Self-assembly', mins: [12, 22],
      builds: [
        { prompt: 'A chain in water' },
        { prompt: 'No origami master' },
        { prompt: 'Energy is spent making the chain. The fold is free.' },
        { prompt: 'Heat it: *denaturation*' },
        { prompt: 'Sequence intact, shape lost. Frying an egg.' }
      ],
      items: [
        { kind: 'fold', id: 'f1', box: [40, 110, 1520, 660] }
      ]
    },
    {
      id: 'diversity', title: 'Shape is function', mins: [22, 26],
      builds: [{ prompt: 'Binding changes charges, and shape' }, { prompt: 'Hemoglobin and collagen' }],
      items: [
        { kind: 'cmp', box: [80, 130, 1440, 520], together: true, cols: [{ h: 'Hemoglobin', lines: ['four chains', 'binds oxygen; changes shape as it does'] }, { h: 'Collagen', lines: ['three chains, wound into a rope', 'skin, tendon, bone'] }] }
      ]
    },
    {
      id: 'nucleotides', title: 'Nucleotides', mins: [26, 37],
      builds: [
        { prompt: 'Phosphate' }, { prompt: 'Sugar' }, { prompt: 'Base' }, { prompt: 'One oxygen: RNA or DNA' },
        { prompt: 'Purines: two rings' }, { prompt: 'Pyrimidines: one ring' },
        { prompt: 'Try every pair' },
        { prompt: 'Geometry, not chemistry' }
      ],
      items: [
        { kind: 'fig', box: [40, 120, 1520, 600], fig: 'nucleotide', builds: [0, 1, 2, 3] },
        { kind: 'fig', box: [80, 120, 1440, 600], fig: 'purPyr', builds: [4, 5] },
        { kind: 'basePair', id: 'b1', box: [40, 110, 1520, 660], builds: [6, 7] }
      ]
    },
    {
      id: 'trna', title: 'tRNA and the code', mins: [37, 43],
      builds: [{ prompt: 'A cloverleaf' }, { prompt: 'The anticodon reads the message' }, { prompt: 'DNA stores information only because the tRNAs never change' }],
      items: [{ kind: 'fig', box: [80, 110, 1440, 640], fig: 'trna', builds: [0, 1, 2] }]
    },
    {
      id: 'atp', title: 'Nucleotides with other jobs', mins: [43, 46],
      builds: [{ prompt: 'ATP' }, { prompt: 'Cyclic AMP' }],
      items: [{ kind: 'fig', box: [80, 140, 1440, 520], fig: 'atp', builds: [0, 1] }]
    },
    {
      id: 'review', title: 'Exam 1 questions', mins: [46, 56],
      builds: [{ prompt: 'Bonds by macromolecule' }, { prompt: 'α and β glucose' }, { prompt: 'Bases and pairing' }, { prompt: 'Protein structure' }, { prompt: 'Cows and cellulose' }],
      items: [
        { kind: 'vote', id: 'r1', box: [160, 110, 1280, 660], builds: [0], q: 'A phosphodiester bond joins…', opts: ['nucleotides', 'amino acids', 'sugars', 'fatty acids to glycerol'], ans: 0, why: 'Glycosidic: sugars. Peptide: amino acids. Ester: fats. Phosphodiester: nucleotides.' },
        { kind: 'vote', id: 'r2', box: [160, 110, 1280, 660], builds: [1], q: 'Starch is built from ___ glucose; cellulose from ___ glucose.', opts: ['α; β', 'β; α', 'α; α', 'β; β'], ans: 0, why: 'One OH on carbon 1, turned the other way.' },
        { kind: 'vote', id: 'r3', box: [160, 110, 1280, 660], builds: [2], q: 'G pairs with…', opts: ['C', 'A', 'T', 'U'], ans: 0, why: 'A purine with a pyrimidine: G–C, A–T (A–U in RNA).' },
        { kind: 'vote', id: 'r4', box: [160, 110, 1280, 660], builds: [3], q: 'Heat unfolds a protein. What survives?', opts: ['primary structure', 'secondary structure', 'tertiary structure', 'nothing'], ans: 0, why: 'Peptide bonds are covalent; the fold is held by weaker bonds.' },
        { kind: 'vote', id: 'r5', box: [160, 110, 1280, 660], builds: [4], q: 'A cow digests grass because…', opts: ['microbes in its stomach chambers make cellulase', 'cows make cellulase', 'grass is mostly starch', 'it chews longer'], ans: 0, why: 'One stomach, several chambers, full of fermenting microbes. The enzyme\'s active site fits β linkages.' }
      ]
    }
  ];
  root.LECTURE = { id: 'lec06', short: 'Lecture 6', title: 'Folding, and nucleic acids', segments };
})(this);
