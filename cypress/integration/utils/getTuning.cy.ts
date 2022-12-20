import { tunings } from "common/constants/stringedInstruments";
import { getTuning } from "common/utils/getTuning";

describe("getTuning()", () => {
  it("should return an array of strings representing a tuning on a particular instrument", () => {
    const tuning = getTuning("guitar", "drop-d");

    expect(tuning).to.eq(tunings["guitar"]["drop-d"]);
  });
});
