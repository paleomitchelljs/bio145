/* Lecture 8: Organelles and the endomembrane system. Pacing from refs/outlines/2026_lec08_outline.tex; slide text from
 * lec_chpt04.pptx slides 12-24 and lec_chpt4_exampleCells.pptx, reworded toward the outline. */
(function (root) {
  'use strict';
  const L = [60, 110, 760, 660], R = [860, 110, 700, 660], WIDE = [60, 110, 1480, 660];
  const segments = [
    {
      id: 'title', title: 'Organelles', noHead: true, mins: [0, 1],
      builds: [{}],
      items: [{ kind: 'title', box: [100, 180, 1400, 460], kick: 'BIO 145 · Lecture 8 · Chapter 4', text: 'The rooms of a cell', sub: 'Organelles, and the membrane highways between them' }]
    },
    {
      id: 'plantAnimal', title: 'Animal and plant cells', mins: [1, 9],
      builds: [{ prompt: 'A made-up cell' }, { prompt: 'Plant-only: wall, central vacuole, chloroplasts, plasmodesmata' }, { prompt: 'Animal-only: lysosomes, centrioles' }, { prompt: 'Plants have mitochondria. Common error.' }],
      items: [{ kind: 'cellMap', id: 'm1', box: [40, 110, 1520, 660] }]
    },
    {
      id: 'ribosomes', title: 'Ribosomes and the central dogma', mins: [9, 16],
      builds: [{ prompt: 'DNA: the blueprint' }, { prompt: 'Copied into mRNA' }, { prompt: 'Read by a ribosome' }, { prompt: 'Generic machinery, specific instructions' }, { prompt: 'Two subunits, protein and rRNA, assembled on demand' }],
      items: [
        { kind: 'fig', box: [40, 120, 1520, 520], fig: 'dogma', builds: [0, 1, 2, 3] },
        { kind: 'points', box: WIDE, builds: [4], at: 4, cls: 'big', lines: [{ t: 'Small subunit: binds the mRNA', sub: 'large subunit: forms the peptide bonds' }, 'Made of proteins and rRNA', 'DNA codes only for proteins (and RNAs). Everything else, proteins build.'] }
      ]
    },
    {
      id: 'er', title: 'The endoplasmic reticulum', mins: [16, 22],
      builds: [{ prompt: '"Big inside net"' }, { prompt: 'Rough: studded with ribosomes' }, { prompt: 'Smooth: lipids and detox' }],
      items: [
        { kind: 'points', box: L, lines: [{ t: 'Rough ER', sub: 'ribosomes on the outside; makes proteins; continuous with the nuclear envelope', at: 1 }, { t: 'Smooth ER', sub: 'tubes; makes phospholipids, fats, steroid hormones; detoxifies; lots in liver', at: 2 }, { t: 'Most membranes are first assembled here', at: 0 }] },
        { kind: 'photo', box: R, src: 'ch04/rough-er-tem.jpg', alt: 'Rough ER in an electron micrograph: stacked sheets dotted with ribosomes' }
      ]
    },
    {
      id: 'golgi', title: 'The way out', mins: [22, 30],
      builds: [{ prompt: 'mRNA leaves the nucleus' }, { prompt: 'Made into the ER' }, { prompt: 'A vesicle buds off' }, { prompt: 'Cis face receives; trans face sends' }, { prompt: 'Three destinations' }, { prompt: 'Vesicles merge like soap bubbles' }],
      items: [
        { kind: 'fig', box: [40, 110, 1520, 600], fig: 'secretion', builds: [0, 1, 2, 3, 4, 5] },
        { kind: 'points', box: [80, 700, 1440, 80], builds: [5], cls: 'small plain', lines: [{ t: 'The sugar tag on a glycoprotein is the address label.', at: 5 }] }
      ]
    },
    {
      id: 'lysosomes', title: 'Lysosomes', mins: [30, 35],
      builds: [{ prompt: 'A bag of acid and destructive enzymes' }, { prompt: 'Primary, then secondary' }, { prompt: 'Autophagy: recycling a worn-out mitochondrion' }],
      items: [{ kind: 'points', box: WIDE, cls: 'big', lines: [{ t: 'Hydrolytic enzymes, made in the rough ER', sub: 'sugar-tagged; the Golgi sorts them into lysosomes instead of shipping them out' }, { t: 'A primary lysosome fuses with a vesicle', sub: 'now a secondary lysosome, digesting' }, { t: 'Autophagy', sub: 'a damaged mitochondrion wrapped in a bubble and broken down' }] }]
    },
    {
      id: 'vacuoles', title: 'Vacuoles', mins: [35, 40],
      builds: [{ prompt: 'Vacuoles are big; vesicles are small' }, { prompt: 'Crisp celery' }, { prompt: 'Wilted celery' }, { prompt: 'A hydraulic skeleton' }],
      items: [
        { kind: 'points', box: WIDE, builds: [0], cls: 'big', lines: [{ t: 'Central vacuole: a big bag of water and solutes', sub: 'its membrane is the tonoplast' }] },
        { kind: 'fig', box: [100, 110, 1400, 560], fig: 'turgor', builds: [1, 2, 3] }
      ]
    },
    {
      id: 'peroxisomes', title: 'Peroxisomes', mins: [40, 44],
      builds: [{ prompt: 'Bud off the smooth ER' }, { prompt: 'Catalase' }, { prompt: 'In lab: you\'ll break down peroxide yourself' }],
      items: [{ kind: 'points', box: WIDE, cls: 'big', lines: [{ t: 'Take up harmful things; make hydrogen peroxide', sub: 'liver and kidney are full of them' }, { t: 'Catalase: 2 H~2~O~2~ → 2 H~2~O + O~2~', sub: 'a redundant name: "catalyst" + -ase' }, 'Redox poisons; the lab project'] }]
    },
    {
      id: 'power', title: 'Mitochondria and chloroplasts', mins: [44, 50],
      builds: [{ prompt: 'The mine' }, { prompt: 'Gold' }, { prompt: 'The exchange' }, { prompt: 'Dollars' }, { prompt: 'Next time: inside them' }],
      items: [
        { kind: 'fig', box: [40, 140, 1520, 500], fig: 'money', builds: [0, 1, 2, 3] },
        { kind: 'photo', box: [300, 110, 1000, 640], builds: [4], src: 'ch04/mito-tem.jpg', alt: 'A mitochondrion in an electron micrograph, its folded inner membrane visible' }
      ]
    },
    {
      id: 'why', title: 'Why internal membranes help', mins: [50, 55],
      builds: [{ prompt: 'Highways' }, { prompt: 'mRNA next to its ribosomes' }, { prompt: 'Logistics that catch errors' }],
      items: [
        { kind: 'points', box: L, cls: 'big', lines: ['Delivery highways: vesicles ride between rooms', 'mRNA made near the ribosomes that read it', 'Error-correcting logistics: tags checked at each stop'] },
        { kind: 'photo', box: R, src: 'ch04/pancreas-cell-tem.jpg', alt: 'A pancreas cell in an electron micrograph, packed with rough ER and secretory granules' }
      ]
    }
  ];
  root.LECTURE = { id: 'lec08', short: 'Lecture 8', title: 'The rooms of a cell', segments };
})(this);
