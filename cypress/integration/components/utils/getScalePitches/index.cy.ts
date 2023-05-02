import { getScalePitches } from "common/utils/getScalePitches";

describe("getScalePitches()", () => {
  it("should return Notes based on a scale", () => {
    const key = "c3";
    const scale = "major";
    const expected = ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"];

    const pitches = getScalePitches(key, scale);

    expect(pitches).to.deep.eq(expected);
  });
});
