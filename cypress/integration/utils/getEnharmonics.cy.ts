import { getEnharmonics } from "common/utils";
import { NoteName } from "ts/musicTheory";

const teoria = require("teoria");

describe("getEnharonics", () => {
  it("should throw an error if not an array", () => {
    expect(() => getEnharmonics(0 as any)).to.throw();
  });

  it("should return enharmonics for an array of notes", () => {
    let notes: NoteName[] = ["db"];
    let expectedEnharmonics = ["c#"];

    expect(getEnharmonics(notes)).to.deep.eq(expectedEnharmonics);

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

    expect(getEnharmonics(notes)).to.deep.eq(expectedEnharmonics);
  });
});

export {};
