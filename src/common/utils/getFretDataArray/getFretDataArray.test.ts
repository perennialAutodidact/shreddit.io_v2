import { getFretDataArray } from "common/utils/getFretDataArray";
import { MIN_NECK_LENGTH } from "common/constants/stringedInstruments";
import { Note } from "ts/musicTheory";
import { FretData } from "ts/stringedInstrument";

describe("getFretDataArray()", () => {
  it(`should fail with less than ${MIN_NECK_LENGTH} frets`, () => {
    expect(() => getFretDataArray("c4", 0, "dim")).toThrow(RangeError);
  });

  it("should generate frets with aug 4 interval", () => {
    const rootNote: Note = "c4";
    const aug4: FretData = {
      noteName: "f#",
      octave: "4",
      interval: "A4",
    };

    const frets: FretData[] = getFretDataArray(rootNote, 12, "aug");
    expect(frets).toHaveLength(13);
    expect(frets).toContainEqual<FretData>(aug4);
  });

  it("should generate frets with dim 5 interval", () => {
    const rootNote: Note = "c4";
    const dim5: FretData = {
      noteName: "gb",
      octave: "4",
      interval: "d5",
    };

    const frets: FretData[] = getFretDataArray(rootNote, 12, "dim");

    expect(frets).toHaveLength(13);
    expect(frets).toContainEqual<FretData>(dim5);
  });

  it("should contain intervals into the second octave", () => {
    const rootNote: Note = "c4";
    const aug4: FretData = {
      noteName: "f#",
      octave: "4",
      interval: "A4",
    };
    const aug11: FretData = {
      noteName: "f#",
      octave: "5",
      interval: "A11",
    };

    const fretsWithAug: FretData[] = getFretDataArray(rootNote, 21, "aug");
    expect(fretsWithAug).toHaveLength(22);
    expect(fretsWithAug).toContainEqual(aug11);

    const dim12: FretData = {
      noteName: "gb",
      octave: "5",
      interval: "d12",
    };

    const fretsWithDim: FretData[] = getFretDataArray(rootNote, 21, "dim");
    expect(fretsWithDim).toHaveLength(22);
    expect(fretsWithDim).toContainEqual(dim12);
  });
});
