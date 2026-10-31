/* Lecture 1: what is life, what is science, kinds of biology. Order from the 2026 recording
 * (Courses/transcripts/145/transcripts/raw/2026_exam01_lec01_transcript.txt).
 *
 * How the screen is used (the model for the other decks, JM 2026-10-31): the slide shows what JM would draw or point
 * at, and he does the talking. So:
 *   - a prompt (the line at the bottom) is only a question he puts to the room, in his words; most builds have none
 *   - no quote cards of his own lines, and no line under a figure that restates what he is saying
 *   - words on a slide are labels, numbers, and the few terms or definitions students should write down, each once
 *   - one picture per idea, built a step at a time in the order he talks
 * A segment marked extra (X) is PowerPoint material the 2026 lecture skipped.
 *
 * A segment: id, title, mins [from, to] (the clock's plan), builds (one press each), items (see shared/parts.js).
 * Text style: *accent*, _italic_.
 */
(function (root) {
  'use strict';
  const WIDE = [60, 110, 1480, 660], FULL = [40, 100, 1520, 680], AGENDA = [300, 150, 1000, 560];
  const none = (n) => Array.from({ length: n }, () => ({}));
  const X = (n) => Array.from({ length: n }, () => ({ extra: true }));
  const os = (fig, who) => `OpenStax Biology 2e, Fig. ${fig}${who ? ` (${who})` : ''}, CC BY 4.0`;
  const segments = [
    {
      id: 'title', title: 'What is life?', noHead: true, mins: [0, 1],
      builds: [{}],
      items: [{ kind: 'title', box: [100, 180, 1400, 460], kick: 'BIO 145 · Lecture 1 · Chapter 1', text: 'What is life?' }]
    },
    {
      id: 'logistics', title: 'Before we start', mins: [1, 3.5],
      builds: [{}],
      items: [{
        kind: 'points', box: WIDE, cls: 'big', noLit: true,
        lines: [{ t: 'Moodle and homework: everyone have access?', at: 0 }, { t: 'SI sessions: starting soon', at: 0 }, { t: 'Chapter 1 is one day. Then chapters 2 and 3.', at: 0 }, { t: 'Labs start next week', at: 0 }]
      }]
    },
    {
      id: 'agenda', title: 'Chapter 1', mins: [3.5, 4],
      builds: [{}],
      items: [{ kind: 'agenda', box: AGENDA }]
    },
    {
      id: 'define', title: 'A definition of life', mins: [4, 6],
      builds: [{ prompt: 'What is life?' }, { prompt: 'What\'s a cell?' }, { prompt: 'Does this work as a definition?' }, { prompt: 'What\'s an organelle?' }, {},
        { prompt: 'What\'s DNA?' }, { prompt: 'Do we have to have encoded proteins that way?' }, {}],
      items: [{ kind: 'fig', box: FULL, fig: 'circular' }]
    },
    {
      id: 'fire', title: 'Fire and the copier', mins: [6, 9],
      builds: [{ prompt: 'I start a fire with a match. How many fires do I have?' }, { prompt: 'I touch it to a piece of paper. How many now?' },
        { prompt: 'I copy a piece of paper. What have I done?' }, { prompt: 'What\'s the difference from the way life reproduces?' }, {}, {},
        { prompt: 'So why is the copy not life?' }, {}, {}],
      items: [{ kind: 'fig', box: FULL, fig: 'fireCopier' }]
    },
    {
      id: 'code', title: 'The code evolved', mins: [9, 12],
      builds: none(4),
      items: [{ kind: 'fig', box: FULL, fig: 'reruns' }]
    },
    {
      id: 'needs', title: 'What life needs', mins: [12, 13],
      builds: [{ prompt: 'What else rules out the copied paper?' }, {}],
      items: [
        { kind: 'points', box: [60, 170, 800, 520], cls: 'big', lines: ['Reproduction, with heredity', { t: 'Persistence', sub: 'keeping the reaction going: metabolism, homeostasis, growth' }] },
        { kind: 'photo', box: [900, 130, 640, 560], builds: [0], img: 'os-1-12-kittens.jpg', credit: os('1.12', 'Rocky Mountain Feline Rescue'), alt: 'A mother cat nursing kittens of different colors' },
        { kind: 'photo', box: [900, 130, 640, 560], builds: [1], img: 'os-1-13-polar-bear.jpg', credit: os('1.13', '"longhorndave"/Flickr'), alt: 'A polar bear, which holds its body temperature steady in the cold' }
      ]
    },
    {
      id: 'chain', title: 'An unbroken chain', mins: [13, 16.5],
      builds: [{ prompt: 'When does ~~life begin~~ something count as a human?' }, {}, {}, {}, {}],
      items: [
        { kind: 'fig', box: FULL, fig: 'chain', builds: [0, 1, 2, 3] },
        { kind: 'fig', box: FULL, fig: 'divide', builds: [4] }
      ]
    },
    {
      id: 'homeo', title: 'Homeostasis', mins: [16.5, 18],
      builds: none(2),
      items: [{ kind: 'fig', box: FULL, fig: 'homeo' }]
    },
    {
      id: 'entropy', title: 'Staying the same costs energy', mins: [18, 19],
      builds: none(2),
      items: [{ kind: 'fig', box: FULL, fig: 'repair' }]
    },
    {
      id: 'metab', title: 'Metabolism', mins: [19, 20.5],
      builds: none(6),
      items: [{ kind: 'fig', box: FULL, fig: 'bills' }]
    },
    {
      id: 'edges', title: 'Edge cases', mins: [20.5, 22],
      builds: [{}, {}, {}, { prompt: 'A virus: alive?' }, {}, { prompt: 'A program that copies and maintains itself?' }, {}, {}],
      items: [
        { kind: 'fig', box: FULL, fig: 'scorecard', builds: [0, 1, 2, 3, 4, 5, 6] },
        { kind: 'photo', box: [260, 100, 1080, 680], builds: [7], img: 'os-1-17-woese-tree.jpg', diagram: true, credit: os('1.17', 'Eric Gaba; NASA Astrobiology Institute'), alt: 'Carl Woese\'s tree of life: Bacteria, Archaea and Eukarya branching from one root' }
      ]
    },
    {
      id: 'science', title: 'What is science?', mins: [22, 24.5],
      builds: [{}, { prompt: 'What\'s the point of the test? Of the class?' }, {}],
      items: [
        { kind: 'agenda', box: AGENDA, builds: [0], done: 1, now: 1 },
        { kind: 'photo', box: [80, 110, 420, 660], builds: [1], img: 'os-1-05-bacon.jpg', credit: os('1.5', 'Paul van Somer'), alt: 'Portrait of Sir Francis Bacon' },
        { kind: 'points', box: [580, 230, 960, 400], builds: [1], noLit: true, lines: [{ t: 'What Sir Francis Bacon thought about science', sub: 'homework: yes. Test: no.', at: 1 }, { t: 'Whether a statement is scientific', sub: 'test: yes', at: 1 }] },
        { kind: 'points', box: [100, 250, 1400, 320], builds: [2], cls: 'big plain', lines: [{ t: '*Science:* a structured and organized way of figuring out what we think is true', at: 2 }] }
      ]
    },
    {
      id: 'pots', title: 'Where does a plant\'s mass come from?', mins: [24.5, 37],
      builds: [{ prompt: 'What is the seed going to do?' }, { prompt: 'Where does that extra mass come from? How do we know?' }, {},
        { prompt: 'A tree is made of air. How would you test that?' }, {}, { prompt: 'Does anything here tell us it has to come from the air?' },
        { prompt: 'Is it trivial to come up with how to test this?' },
        {}, {}, { prompt: 'How do we rule out soil?' }, {}, {}, { prompt: 'We tried to confirm air a bunch of ways. Did it ever work?' }],
      items: [
        { kind: 'fig', box: FULL, fig: 'pots', builds: [0, 1, 2, 3, 4, 5, 6] },
        { kind: 'fig', box: FULL, fig: 'suspects', builds: [7, 8, 9, 10, 11, 12] }
      ]
    },
    {
      id: 'null', title: 'The null hypothesis', mins: [37, 46.5],
      builds: [{ prompt: 'Two populations of lizards. What\'s the null hypothesis?' }, {}, { prompt: 'Do two real dice land on six at precisely the same rate?' }, {}, {}, {},
        { prompt: 'Are the two drugs different from each other?' }, {}],
      items: [
        { kind: 'fig', box: FULL, fig: 'nullFig', builds: [0, 1, 2] },
        { kind: 'nullhyp', id: 'liz', box: [40, 100, 1520, 560], builds: [3, 4] },
        { kind: 'points', box: [60, 690, 1480, 90], builds: [4], cls: 'plain', lines: [{ t: '*p:* if the null were true, the chance I\'d see a difference like the one I saw', at: 4 }] },
        { kind: 'fig', box: FULL, fig: 'ptable', builds: [5, 7] },
        { kind: 'fig', box: FULL, fig: 'drugs', builds: [6] }
      ]
    },
    {
      id: 'remains', title: 'Whatever remains', mins: [46.5, 49],
      builds: none(4),
      items: [
        { kind: 'quote', box: [160, 200, 1280, 420], builds: [0], t: 'When you have eliminated the impossible, whatever remains, however improbable, must be the truth.', who: 'Sherlock Holmes, in Arthur Conan Doyle\'s _The Sign of the Four_' },
        { kind: 'fig', box: FULL, fig: 'pool', builds: [1, 2, 3] }
      ]
    },
    {
      id: 'kinds', title: 'Kinds of biology', mins: [49, 50],
      builds: none(3),
      items: [
        { kind: 'agenda', box: AGENDA, builds: [0], done: 2, now: 2 },
        { kind: 'cmp', box: [200, 140, 1200, 400], builds: [1, 2], together: true, at: 1, cols: [{ h: 'Big', lines: ['ecologists', 'anatomists', 'herpetologists', 'ornithologists', 'mammalogists'] }, { h: 'Small', lines: ['microbiologists', 'geneticists'] }] },
        { kind: 'points', box: [200, 600, 1200, 100], builds: [2], cls: 'plain', lines: [{ t: 'Next: atoms, chapter 2. Read it before lecture.', at: 2 }] }
      ]
    },
    {
      id: 'cells', title: 'Extra: built from cells', extra: true, mins: [50, 51],
      builds: X(1),
      items: [{ kind: 'fig', box: [80, 110, 1440, 560], fig: 'tentHouse', all: true }]
    }
  ];
  root.LECTURE = { id: 'lec01', short: 'Lecture 1', title: 'What is life?', segments };
})(this);
