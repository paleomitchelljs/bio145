/* Lecture 1: what is life, what is science, kinds of biology. Order and wording from the 2026 recording
 * (Courses/transcripts/145/transcripts/raw/2026_exam01_lec01_transcript.txt); the lines are JM's, trimmed and with
 * transcription errors fixed. A segment marked extra (X) is PowerPoint material the 2026 lecture skipped.
 *
 * A segment: id, title, mins [from, to] (the clock's plan), builds (one press each: prompt is the line at the bottom),
 * items (what is on stage; see shared/parts.js). Text style: *accent*, _italic_.
 */
(function (root) {
  'use strict';
  const L = [60, 110, 820, 660], R = [920, 110, 640, 660], WIDE = [60, 110, 1480, 660];
  const X = (n) => Array.from({ length: n }, () => ({ extra: true }));
  const segments = [
    {
      id: 'title', title: 'What is life?', noHead: true, mins: [0, 1],
      builds: [{}],
      items: [{ kind: 'title', box: [100, 180, 1400, 460], kick: 'BIO 145 · Lecture 1 · Chapter 1', text: 'What is life?', sub: 'What is life, what is science, and kinds of biology' }]
    },
    {
      id: 'logistics', title: 'Before we start', mins: [1, 4],
      builds: [{}, {}, {}, {}, { prompt: 'Labs start next week' }],
      items: [{ kind: 'points', box: WIDE, lines: ['Moodle: everyone have access?', 'The learner: the two-week trial works for now', 'SIs: out-of-class study sessions. Starting soon.', 'Today is the only day on chapter one. Then two and three.', 'Labs start next week'] }]
    },
    {
      id: 'define', title: 'What is life?', mins: [4, 10],
      builds: [
        { prompt: 'What is life? What do we got?' },
        { prompt: '"Made up of cells." What\'s a cell?' },
        { prompt: '"The smallest unit of life."' },
        { prompt: 'You see the problem pretty quickly' },
        { prompt: '"Contains DNA"' },
        { prompt: 'Not wrong. But we\'re less *defining* and more accurately *describing*.' }
      ],
      items: [
        { kind: 'fig', box: [60, 110, 1480, 600], fig: 'circular', builds: [0, 1, 2, 3] },
        { kind: 'points', box: WIDE, builds: [4, 5], at: 4, cls: 'big plain', lines: [{ t: 'DNA: one specific way of encoding proteins', sub: 'a particular chemical a particular group of things uses' }, { t: 'True of life on Earth as we know it', sub: 'describing, not defining' }] }
      ]
    },
    {
      id: 'heredity', title: 'Reproduction with heredity', mins: [10, 17],
      builds: [
        { prompt: 'I start a fire with a match. How many fires do I have?' },
        { prompt: 'The fire reproduced. With *zero* inheritance.' },
        { prompt: 'I copy a piece of paper: *pure* inheritance' },
        { prompt: 'Why is that not life?' },
        { prompt: 'Fire has no heredity. It can\'t evolve, beyond sputtering out.' }
      ],
      items: [
        { kind: 'fig', box: [40, 110, 1520, 570], fig: 'fireCopier', builds: [0, 1, 2, 3] },
        { kind: 'quote', box: [160, 200, 1280, 400], builds: [4], t: 'Fire does a lot of the things we associate with life, because fire is a chemical reaction, and life is a chemical reaction.', who: 'The big difference: fire has no form of heredity.' }
      ]
    },
    {
      id: 'dna', title: 'Is DNA required?', mins: [17, 22],
      builds: [{ prompt: 'You can have life with RNA' }, { prompt: 'The genetic code evolved' }, { prompt: 'Start life over: you would not get the code we have' }, { prompt: 'A complete accident of evolution' }],
      items: [{ kind: 'points', box: WIDE, cls: 'big', lines: ['Metabolism came before DNA', { t: 'The code is not a fixed feature of the universe', sub: 'it evolved, here' }, { t: 'A Mars rover finds nucleotides?', sub: 'not used the way we use them; not the same code' }, { t: 'ACT makes the same amino acid in you, a bacterium, a mushroom', sub: 'that it does is an accident' }] }]
    },
    {
      id: 'persist', title: 'Persistence', mins: [22, 30],
      builds: [
        { prompt: 'A chemical reaction that tries really hard to keep going' },
        { prompt: 'Homeostasis: *homeo*, same; *stasis*, stay' },
        { prompt: 'Entropy is going to win in the end' },
        { prompt: 'So we keep adding energy' },
        {}, {}, { prompt: 'This little diagram here is life' },
        { prompt: 'Running from a tiger is homeostasis' },
        { prompt: 'The book has eight subcategories. You don\'t need them.' }
      ],
      items: [
        { kind: 'quote', box: [160, 200, 1280, 400], builds: [0], t: 'We are a chemical reaction that tries really hard to keep going, persist, and reproduces to spread it on into the future.' },
        { kind: 'points', box: WIDE, builds: [1, 2], at: 1, cls: 'big', lines: [{ t: 'Salt goes up: bring it down. Too much water: add solutes.', sub: 'stay the same, hold steady' }, { t: 'A car, a bike, a computer: it gets worse, you pay to repair it', sub: 'you don\'t want a new one for you. A new one means you died.' }] },
        { kind: 'fig', box: [60, 110, 1480, 600], fig: 'bills', builds: [3, 4, 5, 6, 7, 8] }
      ]
    },
    {
      id: 'chain', title: 'An unbroken chain', mins: [30, 35],
      builds: [
        { prompt: '"When does life begin?" Really: when does something count as a human. Not this class.' },
        { prompt: 'Live parents, live cells, back to the origin' },
        { prompt: 'Never not alive' },
        { prompt: 'Heredity *is* persistence: the reaction keeps going in a kid' },
        { prompt: 'Get in a time machine: watch the cell in your father divide' }
      ],
      items: [{ kind: 'fig', box: [40, 120, 1520, 560], fig: 'chain' }]
    },
    {
      id: 'edges', title: 'Edge cases', mins: [35, 40],
      builds: [
        { prompt: 'A virus: reproduction with heredity, no metabolism, no homeostasis' },
        { prompt: 'One origin of life. We describe what it left us.' },
        { prompt: 'A computer program that reproduces and grows?' },
        { prompt: 'Alive or not?' }
      ],
      items: [
        { kind: 'points', box: WIDE, builds: [0, 1, 2], cls: 'big', lines: [{ t: 'A virus: so not really alive', sub: 'at least by some definitions' }, { t: 'Not carved in stone', sub: 'the best definition we\'ve got, from the one origin we know' }, 'Programs that reproduce, grow, maintain themselves'] },
        {
          kind: 'sort', id: 'alive', builds: [3], box: [0, 100, 1600, 690],
          bins: [{ t: 'Alive', box: [60, 110, 700, 420] }, { t: 'Not alive', box: [840, 110, 700, 420] }],
          tray: [60, 560, 1480, 200],
          chips: [{ t: 'a sperm cell', bin: 0 }, { t: 'an egg', bin: 0 }, { t: 'a bacterium', bin: 0 }, { t: 'fire', bin: 1 }, { t: 'a photocopy', bin: 1 }, { t: 'a virus', bin: 1 }, { t: 'a computer program that copies itself', bin: 1 }]
        }
      ]
    },
    {
      id: 'science', title: 'What is science?', mins: [40, 42],
      builds: [{ prompt: 'A structured and organized way of figuring out what we think is true' }, { prompt: 'The point of the class is to learn, not to be told what\'s on the test' }],
      items: [{ kind: 'points', box: WIDE, cls: 'big', lines: ['A structured, organized way of figuring out what we think is true', { t: 'Chapter one\'s history of science: the learner will ask about it', sub: 'Sir Francis Bacon won\'t be on the test. Telling a scientific statement from one that isn\'t will.' }] }]
    },
    {
      id: 'pots', title: 'Where does a plant\'s mass come from?', mins: [42, 48],
      builds: [
        { prompt: 'Does that tell me it\'s pulling it out of the air? It sure doesn\'t.' },
        { prompt: 'Vacuum tube: dead. Air matters.' },
        { prompt: 'Paper over it: less light, less air, grows less' },
        { prompt: 'Less soil: grows less. More soil: no more.' },
        { prompt: 'A tree is made of *air*. How would you show it?' },
        { prompt: 'Not confirm it. *Rule things out.*' },
        {}, {},
        { prompt: 'Was it really easy to just rule out soil? Yeah.' }
      ],
      items: [
        { kind: 'fig', box: [40, 110, 1520, 600], fig: 'pots', builds: [0, 1, 2, 3, 4] },
        { kind: 'fig', box: [300, 120, 1000, 560], fig: 'suspects', builds: [5, 6, 7, 8, 9], from: 5 }
      ]
    },
    {
      id: 'null', title: 'The null hypothesis', mins: [48, 55],
      builds: [
        { prompt: 'Two populations of lizards. What\'s the null hypothesis?' },
        { prompt: 'Perfectly identical: 0.0000 repeating, onto infinity' },
        { prompt: 'The null hypothesis is always wrong. It is set up to be wrong.' },
        { prompt: 'Big enough sample: you\'ll reject it' },
        { prompt: 'p: if the null were true, the chance I\'d see a difference like I saw' },
        { prompt: 'High p: ~~true~~ close enough' },
        { prompt: 'Drug 1: p = 0.051. Drug 2: p = 0.049. Are they different?' },
        { prompt: 'Fail to reject: weak, and kind of pointless to say' }
      ],
      items: [
        { kind: 'nullhyp', id: 'liz', box: [40, 110, 1520, 600], builds: [0, 1, 2, 3, 4, 5] },
        { kind: 'points', box: WIDE, builds: [6, 7], at: 6, cls: 'big', lines: [{ t: 'P values aren\'t transitive', sub: 'statistical significance is not itself statistically significant' }, { t: 'No clear effect, given my sample size, my assumptions, my setup', sub: 'it never proves the null. Don\'t write that in a lab report.' }] }
      ]
    },
    {
      id: 'ruleout', title: 'Rule things out', mins: [55, 57],
      builds: [{ prompt: 'Sherlock Holmes' }, { prompt: 'All oxygen, all nitrogen: dead. Carbon dioxide: lives.' }, { prompt: 'Rejecting or not: how *clear* a difference is, not whether one exists' }],
      items: [
        { kind: 'quote', box: [160, 200, 1280, 400], builds: [0], t: 'When you\'ve excluded everything, whatever remains, no matter how improbable, must be the explanation.', who: 'A smaller and smaller pool of options' },
        { kind: 'points', box: WIDE, builds: [1, 2], at: 1, cls: 'big', lines: [{ t: 'Confirming, done right, sets up the next thing to falsify', sub: 'gas tanks: oxygen, nitrogen and carbon dioxide ruled in or out' }, { t: 'Same idea as the p values', sub: 'you\'re rejecting the null, not confirming your alternative' }] }
      ]
    },
    {
      id: 'kinds', title: 'Kinds of biology', mins: [57, 59],
      builds: [{ prompt: 'Big things, small things' }, { prompt: 'Wednesday: atoms. Read chapter two before lecture.' }],
      items: [{ kind: 'cmp', box: [80, 130, 1440, 520], together: true, cols: [{ h: 'Big', lines: ['ecologists', 'anatomists', 'herpetologists, ornithologists, mammalogists'] }, { h: 'Small', lines: ['microbiologists', 'geneticists'] }] }]
    },
    {
      id: 'cells', title: 'Extra: built from cells', extra: true, mins: [59, 60],
      builds: X(4),
      items: [
        { kind: 'fig', box: [100, 110, 1400, 600], fig: 'tree', builds: [0, 1, 2] },
        { kind: 'fig', box: [80, 110, 1440, 560], fig: 'tentHouse', builds: [3], all: true }
      ]
    }
  ];
  root.LECTURE = { id: 'lec01', short: 'Lecture 1', title: 'What is life?', segments };
})(this);
