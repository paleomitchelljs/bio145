/* Lecture 1: Introduction, life and science. Pacing from refs/outlines/2026_lec01_outline.tex; slide text from
 * lec_chpt01.pptx, reworded toward the outline. Every word on screen is here.
 *
 * A segment: id, title, mins [from, to] (the clock's plan), builds (one press each: prompt is the line at the bottom),
 * items (what is on stage; see shared/parts.js). Text style: *accent*, _italic_.
 */
(function (root) {
  'use strict';
  const L = [60, 110, 820, 660], R = [920, 110, 640, 660], WIDE = [60, 110, 1480, 660];
  const segments = [
    {
      id: 'title', title: 'What is life?', noHead: true, mins: [0, 1],
      builds: [{}],
      items: [{ kind: 'title', box: [100, 180, 1400, 460], kick: 'BIO 145 · Lecture 1', text: 'What is life?', sub: 'And how would we know?' }]
    },
    {
      id: 'logistics', title: 'The course', mins: [1, 6],
      builds: [{ prompt: 'Where things live' }, {}, {}, {}, { prompt: '*Labs start next week*' }],
      items: [{ kind: 'points', box: WIDE, lines: ['Moodle: everything posted here', 'Textbook: OpenStax _Biology 2e_, free online', 'Supplemental Instruction sessions', { t: 'Syllabus', sub: 'one day on chapter 1; chapters 2–3 next' }, 'Labs start next week'] }]
    },
    {
      id: 'define', title: 'What is life?', mins: [6, 14],
      builds: [
        { prompt: 'Define life. One sentence.' },
        { prompt: '"Made of cells"' },
        { prompt: 'Circular: a cell is the smallest unit *of life*' },
        { prompt: '"Contains DNA"' },
        { prompt: 'That *describes* Earth life. It doesn\'t *define* it.' },
        { prompt: 'Sort them: alive or not?' }
      ],
      items: [
        { kind: 'points', box: L, builds: [1, 2, 3, 4], cls: 'big', lines: [{ t: '"Made of cells"', at: 1 }, { t: 'Then what is a cell?', sub: 'the smallest unit of life. Circular.', at: 2 }, { t: '"Contains DNA"', at: 3 }, { t: 'True of Earth life', sub: 'but would we call a Martian with RNA dead?', at: 4 }] },
        { kind: 'fig', box: R, fig: 'tentHouse', builds: [1, 2] },
        {
          kind: 'sort', id: 'alive', builds: [5], box: [0, 100, 1600, 690],
          bins: [{ t: 'Alive', box: [60, 110, 700, 420] }, { t: 'Not alive', box: [840, 110, 700, 420] }],
          tray: [60, 560, 1480, 200],
          chips: [{ t: 'a bacterium', bin: 0 }, { t: 'a sperm cell', bin: 0 }, { t: 'a seed', bin: 0 }, { t: 'a tardigrade, dried out', bin: 0 }, { t: 'fire', bin: 1 }, { t: 'a photocopy', bin: 1 }, { t: 'a virus', bin: 1 }, { t: 'a computer virus', bin: 1 }]
        }
      ]
    },
    {
      id: 'heredity', title: 'Reproduction with heredity', mins: [14, 22],
      builds: [
        { prompt: 'Fire makes more fire' },
        { prompt: 'A photocopier makes copies' },
        { prompt: '*Heredity is necessary*' },
        { prompt: 'Things that make more of themselves become more common' },
        { prompt: 'Imperfect copying + reproduction + heredity = *evolution*' },
        { prompt: 'Is DNA required?' }
      ],
      items: [
        { kind: 'fig', box: [40, 110, 1520, 570], fig: 'fireCopier', builds: [0, 1, 2] },
        { kind: 'points', box: [80, 130, 1440, 600], builds: [3, 4, 5], cls: 'big', at: 3, lines: ['On Earth, life uses DNA to carry heredity', 'Copies that copy better become more common', { t: 'DNA is contingent', sub: 'RNA could carry heredity. The genetic code evolved. Alien life wouldn\'t share it.' }] }
      ]
    },
    {
      id: 'traits', title: 'Persists, changes, reproduces', mins: [22, 29],
      builds: [
        { prompt: 'Homeostasis: "same stay"' },
        { prompt: 'Grows; responds to stimuli' },
        { prompt: 'Reproduces with heredity, so it evolves' },
        { prompt: 'Nothing stays the same for free' },
        { prompt: 'Metabolism pays for staying the same' },
        {}, {},
        { prompt: 'The book lists eight. *Three will do.*' }
      ],
      items: [
        { kind: 'fig', box: [80, 130, 1440, 520], fig: 'traits', builds: [0, 1, 2] },
        { kind: 'fig', box: [80, 120, 1440, 560], fig: 'bills', builds: [3, 4, 5, 6, 7], from: 3, opts: {} },
        { kind: 'points', box: [80, 690, 1440, 80], builds: [3], cls: 'small plain', lines: [{ t: 'Salt and water balance. Running from a tiger. Repairing a bike.', at: 3 }] }
      ]
    },
    {
      id: 'chain', title: 'An unbroken chain', mins: [29, 34],
      builds: [{ prompt: 'Trace your cells back' }, { prompt: 'Sperm and egg: both alive' }, { prompt: 'A virus breaks the chain' }, { prompt: 'So when does a life begin?' }],
      items: [{ kind: 'fig', box: [40, 120, 1520, 600], fig: 'chain' }]
    },
    {
      id: 'cells', title: 'Built from cells', mins: [34, 38],
      builds: [{ prompt: 'Three domains' }, {}, { prompt: 'Plants, then fungi with animals' }],
      items: [{ kind: 'fig', box: [100, 110, 1400, 600], fig: 'tree' }]
    },
    {
      id: 'science', title: 'What is science?', mins: [38, 46],
      builds: [
        { prompt: 'Where does a plant\'s mass come from?' },
        { prompt: 'Seal it in a vacuum: it dies' },
        { prompt: 'Cover it with paper: it grows less' },
        { prompt: '*Excluding* is easy. Confirming is hard.' },
        { prompt: 'Light has no mass' },
        { prompt: 'Weigh the soil before and after' },
        { prompt: 'Water is harder to exclude' },
        { prompt: 'A tree is made of *air*' },
        {}
      ],
      items: [
        { kind: 'fig', box: [40, 110, 900, 660], fig: 'pots', builds: [0, 1, 2] },
        { kind: 'fig', box: [520, 120, 1000, 560], fig: 'suspects', builds: [3, 4, 5, 6, 7], from: 3 },
        { kind: 'quote', box: [160, 220, 1280, 380], builds: [8], t: 'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.', who: 'Sherlock Holmes. Science is a shrinking pool of options.' }
      ]
    },
    {
      id: 'null', title: 'The null hypothesis', mins: [46, 54],
      builds: [
        { prompt: 'Two lizard populations: same mass?' },
        { prompt: 'The null is *always* false' },
        { prompt: 'Large samples reject *any* null' },
        { prompt: 'p: the chance of data this extreme *if the null were true*' },
        { prompt: 'High p: ~~true~~ close enough' },
        { prompt: '0.049 and 0.051 are the same evidence' },
        { prompt: 'Rejecting the null doesn\'t make *your* idea true' }
      ],
      items: [
        { kind: 'nullhyp', id: 'liz', box: [40, 110, 1520, 600], builds: [0, 1, 2, 3, 4, 5] },
        { kind: 'points', box: WIDE, builds: [6], cls: 'big', at: 6, lines: ['Fail to reject: weak, depends on assumptions', 'Never "proves the null"', 'Low p: a clear difference. Check the setup anyway.', 'Lab reports: say what you tested, and what p means'] }
      ]
    },
    {
      id: 'ahead', title: 'Looking ahead', mins: [54, 57],
      builds: [{ prompt: 'Big organisms, small things' }, { prompt: 'Next: chapter 2, atoms and molecules. Read before lecture.' }],
      items: [{ kind: 'cmp', box: [80, 130, 1440, 520], together: true, cols: [{ h: 'Big organisms', lines: ['Ecologists', 'Anatomists', 'Herpetologists, ornithologists, mammalogists'] }, { h: 'Small things', lines: ['Microbiologists', 'Geneticists', 'Cell and molecular biologists: this course'] }] }]
    }
  ];
  root.LECTURE = { id: 'lec01', short: 'Lecture 1', title: 'What is life?', segments };
})(this);
