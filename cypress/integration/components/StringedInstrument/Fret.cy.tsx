import _, { divide } from "lodash";
import Fret from "components/StringedInstrument/Fret";
import String from "components/StringedInstrument/String";
import { initialState as rootState, RootState } from "store";
import {
  StringNumber,
  FretNumber,
  FretData,
  FretTotal,
  FretStart,
  FretEnd,
} from "ts/stringedInstrument";
import { Note } from "ts/musicTheory";
import { getFretDataArray } from "common/utils";
import { buildInitialState } from "../../../support/utils/buildInitialState";
import { getScaleData } from "common/utils/getScaleData";
import styles from "components/StringedInstrument/Fret/Fret.module.scss";

const teoria = require("teoria");

const FRET_CLASS = "bg-fret";
const FRET_INLAY_CLASS = "bg-inlay-fret";

describe("<Fret />", () => {
  let initialState: RootState;
  let stringNumber: StringNumber;
  let fretNumber: FretNumber;
  let fretStart: FretStart = 0;
  let fretEnd: FretEnd = 12;
  let frets: FretData[];
  let _fret: FretData;

  it("should render non-inlay fret", () => {
    initialState = { ...rootState };
    stringNumber = 0;
    fretNumber = 1;
    frets = getFretDataArray("c#4", fretStart, fretEnd, "aug");
    _fret = frets[fretNumber];

    cy.mount(
      <Fret {..._fret} stringNumber={stringNumber} fretNumber={fretNumber} />,
      {
        initialState,
      }
    );

    cy.findByTestId("Fret").should("exist").and("have.class", FRET_CLASS);
  });

  it("should render inlay-fret", () => {
    initialState = { ...rootState };
    stringNumber = 0;
    fretNumber = 3;
    frets = getFretDataArray("e2", fretStart, fretEnd, "aug");
    _fret = frets[fretNumber];

    cy.mount(
      <Fret {..._fret} stringNumber={stringNumber} fretNumber={fretNumber} />,
      {
        initialState,
      }
    );

    cy.findByTestId("Fret").should("exist").and("have.class", FRET_INLAY_CLASS);
  });

  it("should render note marker if fret note is in marked notes array", () => {
    initialState = buildInitialState<RootState>({
      musicTheory: { scale: { notes: ["g", "b", "d"] } },
      instrument: { markedNotes: ["g"] },
    });

    stringNumber = 0;
    fretNumber = 3;
    frets = getFretDataArray("e2", fretStart, fretEnd, "aug");
    _fret = frets[fretNumber];

    cy.mount(
      <Fret {..._fret} stringNumber={stringNumber} fretNumber={fretNumber} />,
      {
        initialState,
      }
    );

    cy.findByTestId("NoteMarker").should("exist");
  });

  it("should not render note marker if fret not is note in marked notes array", () => {
    initialState = buildInitialState<RootState>({
      instrument: {
        markedNotes: teoria.note("c").scale("major").simple(),
      },
      musicTheory: {
        ...rootState.musicTheory,
        scale: {
          notes: teoria
            .note("c")
            .scale("major")
            .notes()
            .map((note: Note) => note.toString()),
        },
      },
    });

    stringNumber = 0;
    fretNumber = 1;
    frets = getFretDataArray("e2", fretStart, fretEnd, "aug");
    _fret = frets[fretNumber];

    cy.mount(
      <Fret {..._fret} stringNumber={stringNumber} fretNumber={fretNumber} />,
      {
        initialState,
      }
    );

    cy.findByTestId("NoteMarker").should("not.exist");
  });

  it("should render larger marker when fret note is the active pitch", () => {
    initialState = buildInitialState<RootState>({
      musicTheory: { scale: getScaleData("c1", "major") },
      instrument: {
        markedNotes: ["g", "c"],
        dimensions: {
          fret: { height: 50, width: 100 },
        },
      },
      audioClient: { activePitch: "c3" },
    });

    stringNumber = 0;
    frets = getFretDataArray("e2", fretStart, fretEnd, "aug");

    let activeFretNumber: FretNumber = 8;
    let _activeFret: FretData = frets[activeFretNumber];

    let inactiveFretNumber: FretNumber = 3;
    let _inactiveFret: FretData = frets[inactiveFretNumber];

    cy.mount(
      <div style={{ display: "flex" }}>
        <Fret
          {..._activeFret}
          stringNumber={stringNumber}
          fretNumber={activeFretNumber}
        />
        <Fret
          {..._inactiveFret}
          stringNumber={stringNumber}
          fretNumber={inactiveFretNumber}
        />
      </div>,
      { initialState }
    );

    cy.get(".bg-P1")
      .invoke("outerWidth")
      .then((activeMarkerWidth) => {
        cy.get(".bg-P5")
          .invoke("outerWidth")
          .then((inactiveMarkerWidth) => {
            expect(activeMarkerWidth).to.be.gt(inactiveMarkerWidth);
          });
      });
  });

  it("should render start fret with first fret style if fretStart is 1", () => {
    fretStart = 1;
    initialState = buildInitialState<RootState>({
      instrument: {
        fretStart,
        fretEnd,
      },
    });

    frets = getFretDataArray("e2", fretStart, fretEnd, "dim");
    stringNumber = 0;

    cy.mount(
      <div>
        {frets.map((fret, i) => (
          <Fret
            {...fret}
            stringNumber={stringNumber}
            fretNumber={(fretStart + i) as FretNumber}
          />
        ))}
      </div>,
      { initialState }
    );

    cy.get(".fret-start").first().should("not.have.class", styles.openFret);
    cy.get(".fret-start").first().should("have.class", styles.firstFret);
  });
});
