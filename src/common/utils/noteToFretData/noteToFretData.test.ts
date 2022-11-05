import { noteToFretData } from "common/utils/noteToFretData";
const teoria = require("teoria");

describe("noteToFretData", () => {
  it("should fail if the note is not of type Note", () => {
    const note = teoria.note("c#4");

    expect(() => noteToFretData(note)).toThrow(TypeError);
  });

  it("should convert a note name into fret data", () => {
    const fretData = noteToFretData("c#4");

    expect(fretData).toEqual({
      noteName: "c#",
      octave: "4",
    });
  });
});
