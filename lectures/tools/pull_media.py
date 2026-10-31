"""Copy pictures out of JM's PowerPoints into lectures/media/ (gitignored), for any a deck needs that can't be public.
Most are textbook or web images under someone else's copyright, so they stay local; every diagram the decks need is
redrawn in figs.js instead. Run from anywhere:

    python3 lectures/tools/pull_media.py

Reads refs/lectures/*.pptx (also gitignored). A missing deck or image is reported and skipped; the deck then shows a
dashed placeholder where the photo would be."""
import os, zipfile

HERE = os.path.dirname(os.path.abspath(__file__))
REFS = os.path.join(HERE, "..", "..", "refs", "lectures")
OUT = os.path.join(HERE, "..", "media")

# (pptx, image inside ppt/media, saved as media/<path>). Empty: since 2026-10-31 no deck uses media/. Every photo the
# decks show is an openly licensed OpenStax image in lectures/img/ (see img/CREDITS.md). Add rows here only for a picture
# that has no open equivalent and should stay off the public site, e.g.
#   ("lec_chpt04.pptx", "image8.png", "ch04/gromia.png"),
WANT = []

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
