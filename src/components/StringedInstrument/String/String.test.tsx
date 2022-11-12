import { getFretDataArray } from "common/utils/getFretDataArray";
import { render, screen } from "common/utils/tests/setup";
import { initialState as rootState, RootState } from "store";
import String from "components/StringedInstrument/String";
import { Note } from "ts/musicTheory";
import { FretData } from "ts/stringedInstrument";

describe("<String/>", () => {
  it("should render a string label and Fret component for each fret on the string", () => {
    let initialState: RootState = {
      ...rootState,
      instrument: {
        ...rootState.instrument,
        totalFrets: 12,
      },
    };

    let rootNote: Note = "e4";
    render(<String rootNote={rootNote} />, { initialState });

    let frets = screen.getAllByTestId("Fret");

    expect(frets).toHaveLength(13);
  });
});
