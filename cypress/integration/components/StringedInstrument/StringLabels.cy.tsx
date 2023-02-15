import { buildInitialState } from "../../../support/utils/buildInitialState";
import { tunings } from "common/constants/stringedInstruments";
import StringLabels from "components/StringedInstrument/StringLabels";

const teoria = require("teoria");

describe("<StringLabels/>", () => {
  it("should render labels for each string", () => {
    const strings = tunings["guitar"]["standard"];
    const initialState = buildInitialState({
      instrument: {
        strings,
      },
    });

    cy.mount(<StringLabels />, { initialState });

    const stringLabels = cy.findAllByTestId("StringLabel");
    stringLabels.each((stringLabel, index) => {
      const stringName = teoria.note(strings[index]).name().toUpperCase();
      cy.wrap(stringLabel).should("have.text", stringName);
    });
  });
});

export {};
