import String from "components/StringedInstrument/String";
import _ from "lodash";
import { initialState as rootState, RootState } from "store";
import { Note } from "ts/musicTheory";
import { StringNumber } from "ts/stringedInstrument";
import { buildInitialState } from "../../../support/utils/buildInitialState";

describe("<String/>", () => {
  it("should render a string label and Fret component for each fret on the string", () => {
    let initialState: RootState = buildInitialState<RootState>({
      instrument: {
        // fretTotal: 12,
        fretStart: 0,
        fretEnd: 12,
      },
    });

    let rootNote: Note = "e4";
    let stringNumber: StringNumber = 0;
    cy.mount(<String rootNote={rootNote} stringNumber={stringNumber} />, {
      initialState,
    });

    cy.findAllByTestId("Fret").should("have.length", 13);
  });

  it("should render string with no open fret or double border if fretStart > 0", () => {
    let initialState = buildInitialState<RootState>({
      instrument: {
        fretStart: 6,
        fretEnd: 12,
      },
    });

    let rootNote: Note = "e4";
    let stringNumber: StringNumber = 0;
    cy.mount(<String rootNote={rootNote} stringNumber={stringNumber} />, {
      initialState,
    });

    cy.findAllByTestId("Fret").should("have.length", 7);
  });
});
