import { render, screen } from "common/utils/tests/setup";
import { getFretDataArray } from "common/utils/getFretDataArray";
import { StringNumber, FretData, FretNumber } from "ts/stringedInstrument";
import { initialState as rootState, RootState } from "store";
import Fret from "components/StringedInstrument/Fret";

const teoria = require("teoria");

describe("<Fret/>", () => {
  it("should render non-inlay fret", () => {
    let initialState = { ...rootState };
    let stringNumber: StringNumber = 0;
    let fretNumber: FretNumber = 1;
    let frets: FretData[] = getFretDataArray("c#4", 12, "aug");
    let _fret: FretData = frets[fretNumber];

    render(
      <Fret {..._fret} stringNumber={stringNumber} fretNumber={fretNumber} />,
      {
        initialState,
      }
    );

    let fret = screen.getByTestId("Fret");

    expect(fret).toBeInTheDocument();
    expect(fret).toHaveClass("bg-fret");
  });

  it("should render inlay fret", () => {
    let initialState = { ...rootState };
    let stringNumber: StringNumber = 0;
    let fretNumber: FretNumber = 3;
    let frets: FretData[] = getFretDataArray("e2", 12, "aug");
    let _fret: FretData = frets[fretNumber];

    render(
      <Fret {..._fret} stringNumber={stringNumber} fretNumber={fretNumber} />,
      {
        initialState,
      }
    );

    let fret = screen.getByTestId("Fret");

    expect(fret).toBeInTheDocument();
    expect(fret).toHaveClass("bg-inlay-fret");
  });

  it("should render note marker if fret note is in current scale", () => {
    let initialState: RootState = {
      ...rootState,
      instrument: {
        ...rootState.instrument,
        markedNotes: ["g"],
      },
    };

    let frets: FretData[] = getFretDataArray("e2", 12, "aug");
    let stringNumber: StringNumber = 0;
    let fretNumber: FretNumber = 3;
    let _fret: FretData = frets[fretNumber];

    render(
      <Fret {..._fret} stringNumber={stringNumber} fretNumber={fretNumber} />,
      {
        initialState,
      }
    );

    let noteMarker = screen.getByTestId("NoteMarker");

    expect(noteMarker).toBeInTheDocument();
  });

  it("should not render the note marker if the fret note is not in the current scale", () => {
    let initialState: RootState = {
      ...rootState,
      instrument: {
        ...rootState.instrument,
        scale: {
          name: "ionian",
          intervals: teoria.note("c").scale("ionian").scale,
          notes: teoria.note("c").scale("ionian").simple(),
        },
      },
    };

    let frets: FretData[] = getFretDataArray("e2", 12, "aug");
    let stringNumber: StringNumber = 0;
    let fretNumber: FretNumber = 2;
    let _fret: FretData = frets[fretNumber];
    render(
      <Fret {..._fret} stringNumber={stringNumber} fretNumber={fretNumber} />,
      {
        initialState,
      }
    );

    let noteMarker = screen.queryByTestId("NoteMarker");

    expect(noteMarker).toBe(null);
  });

  it("should render fret 0 with no bg or border", () => {
    let initialState: RootState = {
      ...rootState,
    };
    let frets: FretData[] = getFretDataArray("e2", 12, "aug");
    let stringNumber: StringNumber = 0;
    let fretNumber: FretNumber = 0;
    let _fret: FretData = frets[fretNumber];

    render(
      <Fret {..._fret} stringNumber={stringNumber} fretNumber={fretNumber} />,
      {
        initialState,
      }
    );

    let fret = screen.getByTestId("Fret");

    expect(fret).not.toHaveClass("bg-fret");
    expect(fret).not.toHaveClass("border");
    expect(fret).not.toHaveClass("border-fret-border");
  });
});
