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
        // totalFrets: 12,
        startFret: 0,
        endFret: 12,
      },
    });

    let rootNote: Note = "e4";
    let stringNumber: StringNumber = 0;
    cy.mount(<String rootNote={rootNote} stringNumber={stringNumber} />, {
      initialState,
    });

    cy.findAllByTestId("Fret").should("have.length", 13);

    cy.findByTestId("StringLabel").should("exist");
    cy.findByTestId("StringLabel").should("have.text", "E");
  });

  it("should render string with no open fret or double border if startFret > 0", () => {
    let initialState = buildInitialState<RootState>({
      instrument: {
        startFret: 6,
        endFret: 12,
      },
    });

    let rootNote: Note = "e4";
    let stringNumber: StringNumber = 0;
    cy.mount(<String rootNote={rootNote} stringNumber={stringNumber} />, {
      initialState,
    });

    cy.findAllByTestId("Fret").should("have.length", 7);
    cy.findByTestId("StringLabel").should("have.text", "E");
  });
});
