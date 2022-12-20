import _ from "lodash";
import Fret from "components/StringedInstrument/Fret";

import { initialState as rootState, RootState } from "store";
import { StringNumber, FretNumber, FretData } from "ts/stringedInstrument";
import { Note } from "ts/musicTheory";
import { getFretDataArray } from "common/utils";
import { buildInitialState } from "../../../support/utils/buildInitialState";

const teoria = require("teoria");

const FRET_CLASS = "bg-fret";
const FRET_INLAY_CLASS = "bg-inlay-fret";

describe("<Fret />", () => {
  it("should render non-inlay fret", () => {
    let initialState = { ...rootState };
    let stringNumber: StringNumber = 0;
    let fretNumber: FretNumber = 1;
    let frets: FretData[] = getFretDataArray("c#4", 12, "aug");
    let _fret: FretData = frets[fretNumber];

    cy.mount(
      <Fret {..._fret} stringNumber={stringNumber} fretNumber={fretNumber} />,
      {
        initialState,
      }
    );

    cy.findByTestId("Fret").should("exist").and("have.class", FRET_CLASS);
  });

  it("should render inlay-fret", () => {
    let initialState = { ...rootState };
    let stringNumber: StringNumber = 0;
    let fretNumber: FretNumber = 3;
    let frets: FretData[] = getFretDataArray("e2", 12, "aug");
    let _fret: FretData = frets[fretNumber];

    cy.mount(
      <Fret {..._fret} stringNumber={stringNumber} fretNumber={fretNumber} />,
      {
        initialState,
      }
    );

    let fret = cy
      .findByTestId("Fret")
      .should("exist")
      .and("have.class", FRET_INLAY_CLASS);
  });

  it("should render note marker if fret note is in marked notes array", () => {
    let initialState = buildInitialState<RootState>({
      instrument: { scale: { notes: ["g", "b", "d"] }, markedNotes: ["g"] },
    });

    let frets: FretData[] = getFretDataArray("e2", 12, "aug");
    let stringNumber: StringNumber = 0;
    let fretNumber: FretNumber = 3;
    let _fret: FretData = frets[fretNumber];

    cy.mount(
      <Fret {..._fret} stringNumber={stringNumber} fretNumber={fretNumber} />,
      {
        initialState,
      }
    );

    cy.findByTestId("NoteMarker").should("exist");
  });

  it("should not render note marker if fret not is note in marked notes array", () => {
    let initialState = buildInitialState<RootState>({
      instrument: {
        scale: {
          notes: teoria
            .note("c")
            .scale("major")
            .notes()
            .map((note: Note) => note.toString()),
        },
        markedNotes: teoria.note("c").scale("major").simple(),
      },
    });

    let frets: FretData[] = getFretDataArray("e2", 12, "aug");
    let stringNumber: StringNumber = 0;
    let fretNumber: FretNumber = 1;
    let _fret: FretData = frets[fretNumber];

    cy.mount(
      <Fret {..._fret} stringNumber={stringNumber} fretNumber={fretNumber} />,
      {
        initialState,
      }
    );

    cy.findByTestId("NoteMarker").should("not.exist");
  });
});
