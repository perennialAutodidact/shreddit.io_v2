// i
import { getFretDataArray } from "common/utils";
import { MIN_NECK_LENGTH } from "common/constants/stringedInstruments";
import { Note } from "ts/musicTheory";
import { Fret } from "ts/stringedInstrument";

describe("getFretDataArray()", () => {
  it(`should fail with less than ${MIN_NECK_LENGTH} frets`, () => {
    const fretStart = 0;
    const fretEnd = 1;
    // @ts-ignore
    expect(() => getFretDataArray("c4", fretStart, fretEnd, "dim")).to.throw();
  });

  it("should generate frets with aug 4 interval", () => {
    const rootNote: Note = "c4";
    const aug4: Fret = {
      noteName: "f#",
      octave: "4",
      interval: "A4",
      markerEnabled: true,
      ref: { current: null },
    };

    const frets: Fret[] = getFretDataArray(rootNote, 0, 12, "aug");
    expect(frets).to.have.length(13);
    expect(frets).to.include(aug4);
  });

  it("should generate frets with dim 5 interval", () => {
    const rootNote: Note = "c4";
    const dim5: Fret = {
      noteName: "gb",
      octave: "4",
      interval: "d5",
      markerEnabled: true,
      ref: { current: null },
    };

    const frets: Fret[] = getFretDataArray(rootNote, 0, 12, "dim");
    expect(frets).to.have.length(13);
    expect(frets).to.include(dim5);
  });

  it("should contain intervals into the second octave", () => {
    const rootNote: Note = "b4";
    const aug11: Fret = {
      noteName: "e#",
      octave: "6",
      interval: "A11",
      markerEnabled: true,
      ref: { current: null },
    };

    const fretsWithAug: Fret[] = getFretDataArray(rootNote, 0, 20, "aug");
    expect(fretsWithAug).to.have.length(21);

    expect(fretsWithAug).to.include(aug11);

    const dim12: Fret = {
      noteName: "f",
      octave: "6",
      interval: "d12",
      markerEnabled: true,
      ref: { current: null },
    };

    const fretsWithDim: Fret[] = getFretDataArray(rootNote, 0, 20, "dim");

    expect(fretsWithDim).to.have.length(21);
    expect(fretsWithDim).to.include(dim12);
  });
});
