/* Lecture 3: water, pH, and the shape of organic molecules. Order from the 2026 recording
 * (Courses/transcripts/145/transcripts/raw/2026_exam01_lec03_transcript.txt); pictures after lec_chpt02.pptx slides
 * 27-44 and homework 3. The screen follows lecture 1's rules (see the top of lec01/content.js): the slide shows what JM
 * would draw or point at, a prompt is only a question he puts to the room, words on a slide are labels.
 *
 * In 2026 this lecture opened with a correction to lecture 2 (ionic bonds are stronger than covalent in a dry crystal;
 * dissolved in water they just come apart). Lecture 2's deck now says that, so here it is a short reminder.
 */
(function (root) {
  'use strict';
  const FULL = [40, 100, 1520, 680];
  const none = (n) => Array.from({ length: n }, () => ({}));
  const os = (fig, who) => `OpenStax Biology 2e, Fig. ${fig}${who ? ` (${who})` : ''}, CC BY 4.0`;
  const segments = [
    {
      id: 'title', title: 'Water, pH, and shape', noHead: true, mins: [0, 1],
      builds: [{}],
      items: [{ kind: 'title', box: [100, 180, 1400, 460], kick: 'BIO 145 · Lecture 3 · Chapter 2', text: 'Water, pH, and shape' }]
    },
    {
      id: 'si', title: 'Before we start', mins: [1, 3.5],
      builds: [{}],
      items: [{
        kind: 'points', box: [60, 110, 1480, 660], cls: 'big', noLit: true,
        lines: [{ t: 'SI sessions start this weekend, in the evenings', at: 0 }, { t: 'Go about once a week', at: 0 }, { t: 'On exams, they\'re worth about double their points', at: 0 }]
      }]
    },
    {
      id: 'ionic', title: 'Ionic bonds, dry and in water', mins: [3.5, 4.7],
      builds: none(2),
      items: [{ kind: 'fig', box: FULL, fig: 'saltWater', opts: { dry: 'a dry crystal: stronger than covalent', wet: 'dissolved in water: just ions' } }]
    },
    {
      id: 'sticky', title: 'Surface tension', mins: [4.7, 7.1],
      builds: none(2),
      items: [
        { kind: 'fig', box: [40, 100, 960, 680], fig: 'surface' },
        { kind: 'photo', box: [1020, 160, 520, 520], builds: [1], img: 'os-2-18-water-strider.jpg', credit: os('2.18', 'Tim Vickers'), alt: 'A water strider standing on the surface of the water' }
      ]
    },
    {
      id: 'heat', title: 'Specific heat', mins: [7.1, 11.6],
      builds: [{ prompt: 'What is a temperature?' }, {}, {}, {}],
      items: [
        { kind: 'fig', box: FULL, fig: 'speed', builds: [0, 1] },
        { kind: 'fig', box: FULL, fig: 'kids', builds: [2] },
        { kind: 'fig', box: FULL, fig: 'heatCurve', builds: [3] }
      ]
    },
    {
      id: 'evap', title: 'Evaporative cooling', mins: [11.6, 12.3],
      builds: [{}],
      items: [{ kind: 'photo', box: [400, 120, 800, 640], img: 'os-33-22b-evaporation.jpg', credit: os('33.22b', 'Kullez/Flickr'), alt: 'Sweat beading on a shoulder: evaporation carries heat away' }]
    },
    {
      id: 'ice', title: 'Ice', mins: [12.3, 14.2],
      builds: none(4),
      items: [
        { kind: 'fig', box: FULL, fig: 'river', builds: [0, 1, 2] },
        { kind: 'fig', box: FULL, fig: 'states', builds: [3] }
      ]
    },
    {
      id: 'ph', title: 'Acids and bases', mins: [14.2, 15.7],
      builds: none(3),
      items: [
        { kind: 'fig', box: [150, 160, 1300, 420], fig: 'hplus', builds: [0] },
        { kind: 'phScale', id: 'p1', box: [40, 120, 1520, 560], builds: [1] },
        { kind: 'fig', box: FULL, fig: 'neutralize', builds: [2] }
      ]
    },
    {
      id: 'poison', title: 'Poisons and medicines', mins: [15.7, 18.7],
      builds: [{ prompt: 'What makes something a poison?' }, {}, {}],
      items: [{ kind: 'fig', box: FULL, fig: 'dial' }]
    },
    {
      id: 'split', title: 'Pure water', mins: [18.7, 20.4],
      builds: [{}],
      items: [{ kind: 'fig', box: [40, 160, 1520, 440], fig: 'waterSplit' }]
    },
    {
      id: 'buffer', title: 'Buffers', mins: [20.4, 23.4],
      builds: [{}],
      items: [{ kind: 'buffer', id: 'b1', box: [40, 120, 1520, 640] }]
    },
    {
      id: 'quiz', title: 'From last time', mins: [23.4, 24.1],
      builds: [{ prompt: 'On a scrap of paper, with your name: two words each' }],
      items: [{
        kind: 'points', box: [60, 130, 1480, 640], cls: 'big', noLit: true,
        lines: [{ t: 'What about an atom decides which element it is?', at: 0 }, { t: 'What is an ion?', at: 0 }, { t: 'What is an isotope?', at: 0 }, { t: 'Is water polar?', at: 0 }]
      }]
    },
    {
      id: 'organic', title: 'Carbon-based life', mins: [24.1, 25.3],
      builds: none(2),
      items: [{ kind: 'fig', box: FULL, fig: 'lookFor' }]
    },
    {
      id: 'represent', title: 'One molecule, many drawings', mins: [25.3, 29.8],
      builds: none(5),
      items: [{ kind: 'fig', box: FULL, fig: 'represent' }]
    },
    {
      id: 'carbons', title: 'Adding carbons', mins: [29.8, 32.1],
      builds: none(3),
      items: [{ kind: 'fig', box: FULL, fig: 'count' }]
    },
    {
      id: 'variants', title: 'Same carbons, different shapes', mins: [32.1, 37.1],
      builds: [{}, {}, { prompt: 'Why can\'t there be a 3-butene?' }, {}, {}],
      items: [{ kind: 'fig', box: FULL, fig: 'skeletons' }]
    },
    {
      id: 'isomers', title: 'Isomers', mins: [37.1, 40.3],
      builds: none(2),
      items: [{ kind: 'fig', box: FULL, fig: 'isomers' }]
    },
    {
      id: 'chiral', title: 'Mirror images', mins: [40.3, 45.7],
      builds: [{}, {}, {}, { prompt: 'What does it mean to say something smells like orange?' }, {}],
      items: [
        { kind: 'fig', box: FULL, fig: 'hands', builds: [0, 1] },
        { kind: 'fig', box: FULL, fig: 'linalool', builds: [2, 3, 4] }
      ]
    },
    {
      id: 'groups', title: 'Functional groups', mins: [45.7, 50],
      builds: [{}, {}, {}, { prompt: 'The vital amines: what do we call them now?' }, {}, {}],
      items: [{ kind: 'fig', box: FULL, fig: 'groups' }]
    }
  ];
  root.LECTURE = { id: 'lec03', short: 'Lecture 3', title: 'Water, pH, and shape', segments };
})(this);
