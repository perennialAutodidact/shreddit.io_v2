import _, { divide } from "lodash";
import Fret from "components/StringedInstrument/Fret";
import String from "components/StringedInstrument/String";
import { initialState as rootState, RootState } from "store";
import {
  StringNumber,
  FretNumber,
  FretData,
  StringedInstrumentState,
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
  it("should render non-inlay fret", () => {
    let initialState = { ...rootState };
    let stringNumber: StringNumber = 0;
    let fretNumber: FretNumber = 1;
    let frets: FretData[] = getFretDataArray("c#4", 0, 12, "aug");
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
    let frets: FretData[] = getFretDataArray("e2", 0, 12, "aug");
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
      musicTheory: { scale: { notes: ["g", "b", "d"] } },
      instrument: { markedNotes: ["g"] },
    });

    let frets: FretData[] = getFretDataArray("e2", 0, 12, "aug");
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

    let frets: FretData[] = getFretDataArray("e2", 0, 12, "aug");
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

  it("should render larger marker when fret note is the active pitch", () => {
    let initialState = buildInitialState<RootState>({
      musicTheory: { scale: getScaleData("c1", "major") },
      instrument: {
        markedNotes: ["g", "c"],
        dimensions: {
          fret: { height: 50, width: 100 },
        },
      },
      audioClient: { activePitch: "c3" },
    });

    let frets: FretData[] = getFretDataArray("e2", 0, 12, "aug");

    let stringNumber: StringNumber = 0;

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

  it("should render start fret with first fret style if startFret is 1", () => {
    const startFret: StringedInstrumentState["startFret"] = 1;
    const endFret: StringedInstrumentState["endFret"] = 12;
    let initialState = buildInitialState<RootState>({
      instrument: {
        startFret,
        endFret,
      },
    });

    const frets: FretData[] = getFretDataArray("e2", startFret, endFret, "dim");
    const stringNumber: StringNumber = 0;

    cy.mount(
      <div>
        {frets.map((fret, i) => (
          <Fret
            {...fret}
            stringNumber={stringNumber}
            fretNumber={(startFret + i) as FretNumber}
          />
        ))}
      </div>,
      { initialState }
    );

    cy.get(".start-fret").first().should("not.have.class", styles.openFret);
    cy.get(".start-fret").first().should("have.class", styles.firstFret);
  });
});
