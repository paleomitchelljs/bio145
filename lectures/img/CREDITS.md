# Images in the lecture decks

Every image here comes from OpenStax, _Biology 2e_ (Clark, Douglas and Choi, 2018; updated printing), licensed
under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Access for free at
https://openstax.org/details/books/biology-2e. They were extracted from the book's PDF (`refs/book/Biology2e-WEB.pdf`)
with `pdfimages`; three are single panels cropped out of multi-panel figures. The Woese tree (1.17) is the same image the
chapter 1 PowerPoint used. The decks show a short credit under each.

| File | Figure | Original credit (from the book) | Used in |
|---|---|---|---|
| os-1-05-bacon.jpg | 1.5 | Paul van Somer | lecture 1 |
| os-1-12-kittens.jpg | 1.12 | Rocky Mountain Feline Rescue | lecture 1 |
| os-1-13-polar-bear.jpg | 1.13 | "longhorndave"/Flickr | lecture 1 |
| os-1-17-woese-tree.jpg | 1.17 | Eric Gaba; NASA Astrobiology Institute | lecture 1 |
| os-2-18-water-strider.jpg | 2.18 | Tim Vickers | lecture 3 |
| os-33-22b-evaporation.jpg | 33.22, panel b (cropped) | modification of work by "Kullez"/Flickr | lecture 3 |
| os-3-11-chitin-bee.jpg | 3.11 | Louise Docker | lecture 4 |
| os-34-08-ruminant-stomachs.jpg | 34.8 | OpenStax | lecture 4 |
| os-4-01a-nasal-cells-light.jpg | 4.1, panel a (cropped) | modification of work by Ed Uthman, MD; scale-bar data from Matt Russell | lecture 7 |
| os-4-03b-salmonella-sem.jpg | 4.3, panel b (cropped) | modification of work by NIAID, NIH; scale-bar data from Matt Russell | lecture 7 |
| os-4-19-pancreas-rough-er-tem.jpg | 4.19 | modification of work by Louisa Howard | lectures 7, 8 |
| os-4-14-mitochondrion-tem.jpg | 4.14 | modification of work by Matthew Britton; scale-bar data from Matt Russell | lecture 8 |
| os-4-20-golgi-tem.jpg | 4.20 | modification of work by Louisa Howard | lecture 8 |
| os-4-26-flagella-9plus2-tem.jpg | 4.26 | modification of work by Dartmouth Electron Microscope Facility, Dartmouth College; scale-bar data from Matt Russell | lecture 9 |

To add one: find the figure's page (`pdftotext` the PDF and search the caption), list its images with
`pdfimages -f N -l N -list`, extract with `pdfimages -f N -l N -j`, crop if it's one panel of several, save it here as
`os-<figure>-<what>.jpg`, add a row to this table, and give the deck's `photo` item `img:` and `credit:`.
