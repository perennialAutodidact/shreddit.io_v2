import { getTuning } from "common/utils/getTuning";
import { tunings } from "common/constants/stringedInstruments";

describe("getTuning()", () => {
  it("should return an array of strings representing a tuning on a particular instrument", () => {
    const tuning = getTuning("guitar", "drop-d");

    expect(tuning).toBe(tunings["guitar"]["drop-d"]);
  });
});
