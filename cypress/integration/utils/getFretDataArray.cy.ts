import { getFretDataArray } from "common/utils/getFretDataArray";
import { MIN_NECK_LENGTH } from "common/constants/stringedInstruments";
import { Note } from "ts/musicTheory";
import { FretData } from "ts/stringedInstrument";

describe("getFretDataArray()", () => {
  it(`should fail with less than ${MIN_NECK_LENGTH} frets`, () => {
    const startFret = 0;
    const endFret = 1;
    // @ts-ignore
    expect(() => getFretDataArray("c4", startFret, endFret, "dim")).to.throw();
  });

  it("should generate frets with aug 4 interval", () => {
    const rootNote: Note = "c4";
    const aug4: FretData = {
      noteName: "f#",
      octave: "4",
      interval: "A4",
    };

    const frets: FretData[] = getFretDataArray(rootNote, 0, 12, "aug");
    expect(frets).to.have.length(13);
    expect(frets).to.have.deep.include(aug4);
  });

  it("should generate frets with dim 5 interval", () => {
    const rootNote: Note = "c4";
    const dim5: FretData = {
      noteName: "gb",
      octave: "4",
      interval: "d5",
    };

    const frets: FretData[] = getFretDataArray(rootNote, 0, 12, "dim");
    expect(frets).to.have.length(13);
    expect(frets).to.deep.include(dim5);
  });

  it("should contain intervals into the second octave", () => {
    const rootNote: Note = "b4";
    const aug4: FretData = {
      noteName: "e#",
      octave: "5",
      interval: "A4",
    };
    const aug11: FretData = {
      noteName: "e#",
      octave: "6",
      interval: "A11",
    };

    const fretsWithAug: FretData[] = getFretDataArray(rootNote, 0, 20, "aug");
    expect(fretsWithAug).to.have.length(21);

    expect(fretsWithAug).to.deep.include(aug11);

    const dim12: FretData = {
      noteName: "f",
      octave: "6",
      interval: "d12",
    };

    const fretsWithDim: FretData[] = getFretDataArray(rootNote, 0, 20, "dim");

    expect(fretsWithDim).to.have.length(21);
    expect(fretsWithDim).to.deep.include(dim12);
  });
});
