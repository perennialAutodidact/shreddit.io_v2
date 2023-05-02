import { getTuning } from "common/utils/getTuning";
import { tunings } from "common/constants/stringedInstruments";
import { Tuning } from "ts/stringedInstrument";

describe("getTuning()", () => {
  it("should return an array of strings representing a tuning on a particular instrument", () => {
    const tuning: Tuning = getTuning("guitar", "drop-d");

    expect(tuning).to.be(tunings["guitar"]["drop-d"]);
  });
});
