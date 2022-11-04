import { noteToFretData } from "common/utils/noteToFretData";

describe("noteToFretData", () => {
  it("should convert a note name into fret data", () => {
    const fretData = noteToFretData("c#4");

    expect(fretData).toEqual({
      noteName: "c#",
      octave: "4",
    });
  });
});
