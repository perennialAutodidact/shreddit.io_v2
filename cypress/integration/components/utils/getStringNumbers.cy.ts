import { generateStringsData, getStringNumbers } from "common/utils";
import {
  INITIAL_INSTRUMENT,
  INITIAL_STRINGS,
} from "common/constants/stringedInstruments";
import { tunings } from "common/constants/stringedInstruments";

describe("getStringNumbers function", () => {
  it("returns array of 6 string numbers for guitar", () => {
    expect(getStringNumbers(INITIAL_STRINGS, INITIAL_INSTRUMENT)).toBe([
      0, 1, 2, 3, 4, 5,
    ]);
  });

  it("returns array of 4 string numbers for mandolin, ukulele, bass", () => {
    const tuning = tunings["mandolin"]["standard"];
    const strings = generateStringsData(tuning, 0, 12);
    expect(getStringNumbers(strings, "mandolin")).toBe([0, 1, 2, 3]);
  });
});
