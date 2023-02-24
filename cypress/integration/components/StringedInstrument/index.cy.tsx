import _ from "lodash";
import StringedInstrument from "components/StringedInstrument";
import { initialState as rootState, RootState } from "store";
import { tunings } from "common/constants/stringedInstruments";
import { buildInitialState } from "../../../support/utils/buildInitialState";

const teoria = require("teoria");

let initialState: RootState = buildInitialState({
  instrument: {
    instrumentType: "guitar",
    tuningName: "standard",
    strings: tunings["guitar"]["standard"],
    currentKey: "c1",
    fretTotal: 12,
    scale: {
      name: "chromatic",
      intervals: teoria.note("c").scale("chromatic").scale,
      notes: teoria.note("c").scale("chromatic").simple(),
    },
  },
});

describe("<StringedInstrument />", () => {
  it("should render a guitar neck with six strings", () => {
    cy.mount(<StringedInstrument />, { initialState });

    let strings = cy.findAllByTestId("String");
    strings.should("have.length", 6);
  });

  it("should render a mandolin neck with four strings", () => {
    initialState = buildInitialState<RootState>({
      instrument: {
        instrumentType: "mandolin",
        strings: tunings["mandolin"]["standard"],
      },
    });

    cy.mount(<StringedInstrument />, { initialState });
    let strings = cy.findAllByTestId("String");
    strings.should("have.length", 4);
  });
});

export {};
