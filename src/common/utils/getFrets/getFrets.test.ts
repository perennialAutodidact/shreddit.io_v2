import { getFrets } from "common/utils/getFrets";
import { MIN_NECK_LENGTH } from "common/constants/stringedInstruments";
import { Note } from "ts/musicTheory";
import { FretData } from "ts/stringedInstrument";

describe("getFrets", () => {
  it(`should fail with less than ${MIN_NECK_LENGTH} frets`, () => {
    expect(() => getFrets("c4", 0, "dim5")).toThrow(RangeError);
  });

  it("should generate frets with aug 4 interval", () => {
    const rootNote: Note = "c4";
    const aug4: FretData = {
      noteName: "f#",
      octave: "4",
    };

    const frets: FretData[] = getFrets(rootNote, 12, "aug4");
    expect(frets).toHaveLength(12);
    expect(frets).toContainEqual<FretData>(aug4);
  });

  it("should generate frets with dim 5 interval", () => {
    const rootNote: Note = "c4";
    const dim5: FretData = {
      noteName: "gb",
      octave: "4",
    };

    const frets: FretData[] = getFrets(rootNote, 12, "dim5");

    expect(frets).toHaveLength(12);
    expect(frets).toContainEqual<FretData>(dim5);
  });
});
