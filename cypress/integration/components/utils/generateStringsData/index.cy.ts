import { tunings } from "common/constants/stringedInstruments";
import { generateStringsData } from "common/utils";
import { expectedStringsData } from "./expectedStringsData";

describe("generateStringData", () => {
  it("should return string data based on a tuning and fret range", () => {
    const tuning = tunings["mandolin"]["standard"];
    const stringsData = generateStringsData(tuning, 0, 6);

    expect(stringsData).to.eq(expectedStringsData);
  });
});
