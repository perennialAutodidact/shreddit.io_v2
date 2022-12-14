import { getScaleData } from "common/utils/getScaleData";
import { ScaleData } from "ts/stringedInstrument";

describe("getScaleData()", () => {
  it("should return scale data", () => {
    const scaleData: ScaleData = getScaleData("c1", "major");

    expect(scaleData).to.deep.eq({
      name: "major",
      notes: ["c", "d", "e", "f", "g", "a", "b"],
      intervals: ["P1", "M2", "M3", "P4", "P5", "M6", "M7"],
    });
  });
});
