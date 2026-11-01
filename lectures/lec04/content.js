/* Lecture 4: functional groups again, joining and breaking, carbohydrates, lipids. Order from the 2026 recording
 * (Courses/transcripts/145/transcripts/raw/2026_exam01_lec04_transcript.txt); pictures after lec_chpt02.pptx slides
 * 40-46, lec_chpt03.pptx slides 2-21, and homework 4. The screen follows lecture 1's rules (see the top of
 * lec01/content.js): the slide shows what JM would draw or point at, a prompt is only a question he puts to the room,
 * words on a slide are labels.
 *
 * Lipoproteins (the single-layer ball he starts at the very end, "we'll pick up next time") get one build here; the
 * HDL/LDL trucks belong to lecture 5's opening.
 */
(function (root) {
  'use strict';
  const FULL = [40, 100, 1520, 680];
  const none = (n) => Array.from({ length: n }, () => ({}));
  const os = (fig, who) => `OpenStax Biology 2e, Fig. ${fig}${who ? ` (${who})` : ''}, CC BY 4.0`;
  const segments = [
    {
      id: 'title', title: 'Carbohydrates and lipids', noHead: true, mins: [0, 1],
      builds: [{}],
      items: [{ kind: 'title', box: [100, 180, 1400, 460], kick: 'BIO 145 · Lecture 4 · Chapters 2–3', text: 'Carbohydrates and lipids' }]
    },
    {
      id: 'logistics', title: 'Before we start', mins: [1, 2.4],
      builds: [{}],
      items: [{
        kind: 'points', box: [60, 110, 1480, 660], cls: 'big', noLit: true,
        lines: [{ t: 'Exam 1 next week: 50 questions', sub: 'multiple choice and select-all; the select-alls are labeled', at: 0 }, { t: 'SI sessions are running: add yourself to the SI Moodle page', at: 0 }, { t: 'Lab: microscopy this week, macromolecules next week', at: 0 }]
      }]
    },
    {
      id: 'recap', title: 'Shape and functional groups', mins: [2.4, 4.3],
      builds: none(2),
      items: [{ kind: 'fig', box: FULL, fig: 'shapeGroup' }]
    },
    {
      id: 'groups', title: 'Functional groups', mins: [4.3, 10.4],
      builds: none(8),
      items: [
        { kind: 'fig', box: FULL, fig: 'groups', builds: [0, 1, 2, 3, 4, 6] },
        { kind: 'fig', box: [40, 160, 1520, 440], fig: 'atp', builds: [5] },
        { kind: 'fig', box: FULL, fig: 'fold', builds: [7] }
      ]
    },
    {
      id: 'dehyd', title: 'Dehydration and hydrolysis', mins: [10.4, 15],
      builds: [{}, {}, {}, {}, {}, { prompt: 'Is there any limit to how many times I could do that?' }],
      items: [
        { kind: 'fig', box: FULL, fig: 'words', builds: [0, 1] },
        { kind: 'fig', box: FULL, fig: 'zip', builds: [2, 3, 4] },
        { kind: 'joiner', id: 'j1', box: [40, 110, 1520, 660], builds: [5] }
      ]
    },
    {
      id: 'activity', title: 'On a scrap of paper', mins: [15, 16.8],
      builds: [{ prompt: 'Your name, and: what is this reaction?' }, {}],
      items: [{ kind: 'fig', box: FULL, fig: 'ester' }]
    },
    {
      id: 'macro', title: 'Macromolecules', mins: [16.8, 21.2],
      builds: none(4),
      items: [{ kind: 'fig', box: FULL, fig: 'macro' }]
    },
    {
      id: 'sugars', title: 'Simple sugars', mins: [21.2, 22.7],
      builds: none(4),
      items: [{ kind: 'fig', box: FULL, fig: 'oses' }]
    },
    {
      id: 'ring', title: 'Rings', mins: [22.7, 27.7],
      builds: [{}, {}, {}, {}, { prompt: 'Does that feel like it should matter?' }],
      items: [
        { kind: 'fig', box: FULL, fig: 'ringClose', builds: [0, 1, 2] },
        { kind: 'fig', box: FULL, fig: 'alphaBeta', builds: [3, 4] }
      ]
    },
    {
      id: 'link', title: 'Linking sugars', mins: [27.7, 31],
      builds: none(4),
      items: [{ kind: 'fig', box: FULL, fig: 'glyco' }]
    },
    {
      id: 'starch', title: 'Starch and cellulose', mins: [31, 34.2],
      builds: [{}, { prompt: 'What do we call cellulose when we eat it?' }, {}],
      items: [{ kind: 'fig', box: FULL, fig: 'chains' }]
    },
    {
      id: 'storage', title: 'Storing glucose', mins: [34.2, 35.4],
      builds: none(2),
      items: [{ kind: 'fig', box: FULL, fig: 'storage' }]
    },
    {
      id: 'plants', title: 'Fuel or structure', mins: [35.4, 36.5],
      builds: [{}],
      items: [{ kind: 'fig', box: FULL, fig: 'plantSugar' }]
    },
    {
      id: 'enzymes', title: '-ose and -ase', mins: [36.5, 38.5],
      builds: [{}, {}, { prompt: 'What enzyme breaks down amylose?' }, {}, { prompt: 'What\'s the sugar in milk? What breaks it down?' }, {}],
      items: [
        { kind: 'fig', box: FULL, fig: 'oseAse', builds: [0, 2, 3, 4, 5] },
        { kind: 'photo', box: [300, 110, 1000, 660], builds: [1], img: 'os-34-08-ruminant-stomachs.jpg', credit: os('34.8'), alt: 'A ruminant\'s four stomachs: rumen, reticulum, omasum, abomasum', diagram: true }
      ]
    },
    {
      id: 'structural', title: 'Structural carbohydrates', mins: [38.5, 41.3],
      builds: [{}, { prompt: 'Glucosamine: what does the name tell you?' }, {}, {}],
      items: [
        { kind: 'fig', box: FULL, fig: 'fibers', builds: [0] },
        { kind: 'fig', box: FULL, fig: 'chitin', builds: [1, 2] },
        { kind: 'photo', box: [260, 110, 1080, 640], builds: [3], img: 'os-3-11-chitin-bee.jpg', credit: os('3.11', 'Louise Docker'), alt: 'An insect: its exoskeleton is chitin' }
      ]
    },
    {
      id: 'lipids', title: 'Lipids', mins: [41.3, 41.6],
      builds: none(2),
      items: [{ kind: 'fig', box: FULL, fig: 'steak' }]
    },
    {
      id: 'fatty', title: 'Fatty acids', mins: [41.6, 45],
      builds: none(4),
      items: [
        { kind: 'fig', box: FULL, fig: 'fattyAcids', builds: [0, 1, 2] },
        { kind: 'fatPack', id: 'f1', box: [40, 110, 1520, 660], builds: [3] }
      ]
    },
    {
      id: 'fats', title: 'Fats', mins: [45, 48.1],
      builds: [{}, {}, { prompt: 'Does it matter how big the fatty acid is?' }, {}, {}],
      items: [{ kind: 'fig', box: FULL, fig: 'triglyceride' }]
    },
    {
      id: 'phospho', title: 'Phospholipids', mins: [48.1, 50],
      builds: none(7),
      items: [
        { kind: 'fig', box: FULL, fig: 'philic', builds: [0, 1, 2] },
        { kind: 'fig', box: FULL, fig: 'bilayer', builds: [3, 4, 5] },
        { kind: 'fig', box: FULL, fig: 'micelle', builds: [6] }
      ]
    }
  ];
  root.LECTURE = { id: 'lec04', short: 'Lecture 4', title: 'Carbohydrates and lipids', segments };
})(this);
