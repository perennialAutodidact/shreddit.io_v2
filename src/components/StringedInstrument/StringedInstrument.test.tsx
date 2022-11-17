import { render, screen } from "common/utils/tests/setup";
import { initialState as rootState, RootState } from "store";
import { tunings } from "common/constants/stringedInstruments";
import StringedInstrument from "components/StringedInstrument";
const teoria = require("teoria");

describe("<StringedInstrument/>", () => {
  it("should render with a guitar Neck and Strings", () => {
    const initialState: RootState = {
      ...rootState,
      instrument: {
        ...rootState.instrument,
        instrumentType: "guitar",
        tuningName: "standard",
        strings: tunings["guitar"]["standard"],
        currentKey: "c1",
        totalFrets: 12,
        scale: {
          name: "chromatic",
          intervals: teoria.note("c").scale("chromatic").scale,
          notes: teoria.note("c").scale("chromatic").simple(),
        },
      },
    };

    render(<StringedInstrument />, { initialState });

    const strings = screen.getAllByTestId("String");

    expect(strings).toHaveLength(6);
  });
  it("should render with a mandolin Neck and Strings", () => {
    const initialState: RootState = {
      ...rootState,
      instrument: {
        ...rootState.instrument,
        instrumentType: "guitar",
        tuningName: "standard",
        strings: tunings["guitar"]["standard"],
        currentKey: "c1",
        totalFrets: 12,
        scale: {
          name: "chromatic",
          intervals: teoria.note("c").scale("chromatic").scale,
          notes: teoria.note("c").scale("chromatic").simple(),
        },
      },
    };

    render(<StringedInstrument />, { initialState });

    const strings = screen.getAllByTestId("String");

    expect(strings).toHaveLength(6);
  });
});
