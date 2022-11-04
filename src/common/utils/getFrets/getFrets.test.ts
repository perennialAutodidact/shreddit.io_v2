import { getFrets } from "common/utils/getFrets";
import { MIN_NECK_LENGTH } from "common/constants";
import { Note } from "ts/musicTheory";

describe("getFrets", () => {
  it(`should fail with less than ${MIN_NECK_LENGTH} frets`, () => {
    expect(() => getFrets("c4", 0, "dim5")).toThrow(RangeError);
  });

  it("should generate frets with aug 4 interval", () => {
    const rootNote: Note = "c4";
    const aug4: Note = "f#4";

    const frets = getFrets(rootNote, 12, "aug4");
    expect(frets).toHaveLength(12);
    expect(frets).toContain(aug4);
  });
});
