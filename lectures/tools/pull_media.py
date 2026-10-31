"""Copy the photos and micrographs the decks use out of JM's PowerPoints into lectures/media/ (gitignored).
Most are textbook or web images under someone else's copyright, so they stay local; every diagram the decks need is
redrawn in figs.js instead. Run from anywhere:

    python3 lectures/tools/pull_media.py

Reads refs/lectures/*.pptx (also gitignored). A missing deck or image is reported and skipped; the deck then shows a
dashed placeholder where the photo would be."""
import os, zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
REFS = os.path.join(HERE, "..", "..", "refs", "lectures")
OUT = os.path.join(HERE, "..", "media")

# (pptx, image inside ppt/media, saved as media/<path>)
WANT = [
    ("lec_chpt01.pptx", "image14.jpeg", "ch01/plant-jars.jpg"),
    ("lec_chpt01.pptx", "image10.jpeg", "ch01/cells-em.jpg"),
    ("lec_chpt02.pptx", "image20.jpeg", "ch02/water-strider.jpg"),
    ("lec_chpt02.pptx", "image29.jpeg", "ch02/iceberg.jpg"),
    ("lec_chpt02.pptx", "image27.jpeg", "ch02/hot-spring.jpg"),
    ("lec_chpt02.pptx", "image22.jpeg", "ch02/oil-water.jpg"),
    ("lec_chpt02.pptx", "image19.jpeg", "ch02/salt.jpg"),
    ("lec_chpt03.pptx", "image16.jpeg", "ch03/cicada-molt.jpg"),
    ("lec_chpt03.pptx", "image17.gif", "ch03/marbled-steak.gif"),
    ("lec_chpt03.pptx", "image11.jpeg", "ch03/termite-gut.jpg"),
    ("lec_chpt03.pptx", "image12.png", "ch03/cow-gut.png"),
    ("lec_chpt03.pptx", "image13.gif", "ch03/cellulose-fiber.gif"),
    ("lec_chpt03.pptx", "image43.jpeg", "ch03/protein-ribbon.jpg"),
    ("lec_chpt04.pptx", "image4.jpeg", "ch04/crushed-ice.jpg"),
    ("lec_chpt04.pptx", "image5.jpeg", "ch04/giraffe-nerve.jpg"),
    ("lec_chpt04.pptx", "image6.png", "ch04/squid-axon.png"),
    ("lec_chpt04.pptx", "image8.png", "ch04/gromia.png"),
    ("lec_chpt04.pptx", "image9.jpeg", "ch04/plant-cells-light.jpg"),
    ("lec_chpt04.pptx", "image10.png", "ch04/tem-column.png"),
    ("lec_chpt04.pptx", "image11.jpeg", "ch04/tem-cell.jpg"),
    ("lec_chpt04.pptx", "image12.jpeg", "ch04/sem-surface.jpg"),
    ("lec_chpt04.pptx", "image15.jpeg", "ch04/stained-cell.jpg"),
    ("lec_chpt04.pptx", "image38.jpeg", "ch04/urchin-sperm.jpg"),
    ("lec_chpt04.pptx", "image40.jpeg", "ch04/actin-fluorescence.jpg"),
    ("lec_chpt04.pptx", "image42.jpeg", "ch04/microvilli-sem.jpg"),
    ("lec_chpt4_exampleCells.pptx", "image2.jpeg", "ch04/mito-tem.jpg"),
    ("lec_chpt4_exampleCells.pptx", "image3.jpeg", "ch04/golgi-tem.jpg"),
    ("lec_chpt4_exampleCells.pptx", "image4.jpeg", "ch04/chloroplast-tem.jpg"),
    ("lec_chpt4_exampleCells.pptx", "image5.jpeg", "ch04/rough-er-tem.jpg"),
    ("lec_chpt4_exampleCells.pptx", "image6.jpeg", "ch04/nucleus-tem.jpg"),
    ("lec_chpt4_exampleCells.pptx", "image14.jpeg", "ch04/plant-cell-tem.jpg"),
    ("lec_chpt4_exampleCells.pptx", "image16.jpeg", "ch04/pancreas-cell-tem.jpg"),
    ("lec_chpt4_exampleCells.pptx", "image18.jpeg", "ch04/nuclear-pores.jpg"),
]

def main():
    done = miss = 0
    zips = {}
    for deck, name, dest in WANT:
        path = os.path.join(REFS, deck)
        if not os.path.exists(path):
            print("no deck:", deck); miss += 1; continue
        z = zips.get(deck) or zips.setdefault(deck, zipfile.ZipFile(path))
        try:
            data = z.read("ppt/media/" + name)
        except KeyError:
            print("not in", deck + ":", name); miss += 1; continue
        out = os.path.join(OUT, dest)
        os.makedirs(os.path.dirname(out), exist_ok=True)
        with open(out, "wb") as f:
            f.write(data)
        done += 1
    print(f"{done} images copied to {os.path.normpath(OUT)}; {miss} missing")

if __name__ == "__main__":
    main()
