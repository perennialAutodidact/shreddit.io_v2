import { getEnharmonics } from "common/utils";
import { NoteName } from "ts/musicTheory";

describe("getEnharonics", () => {
  it("should throw an error if not an array", () => {
    expect(() => getEnharmonics(0 as any)).toThrow(TypeError);
  });
  it("should return enharmonics for an array of notes", () => {
    let notes: NoteName[] = ["db"];
    let expectedEnharmonics = ["c#"];

    expect(getEnharmonics(notes)).to.eq(expectedEnharmonics);

    notes = ["c", "db", "d", "eb", "e", "f", "f#", "g", "ab", "a", "bb", "b"];
    expectedEnharmonics = [
      "b#",
      "c#",
      "d#",
      "fb",
      "e#",
      "gb",
      "g#",
      "a#",
      "cb",
    ];

    expect(getEnharmonics(notes)).toEqual(expectedEnharmonics);
  });
});
