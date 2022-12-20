import String from "components/StringedInstrument/String";
import _ from "lodash";
import { initialState as rootState, RootState } from "store";
import { Note } from "ts/musicTheory";
import { StringNumber } from "ts/stringedInstrument";

describe("<String/>", () => {
  it("should render a string label and Fret component for each fret on the string", () => {
    let initialState: RootState = _.merge(rootState, {
      instrument: {
        totalFrets: 12,
      },
    });

    let rootNote: Note = "e4";
    let stringNumber: StringNumber = 0;
    cy.mount(<String rootNote={rootNote} stringNumber={stringNumber} />, {
      initialState,
    });

    cy.findAllByTestId("Fret").should("have.length", 13);

    cy.findByTestId("StringLabel").should("exist");
  });
});
