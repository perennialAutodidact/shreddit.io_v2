import { NrRange, NumbersToN } from "ts-number-range";
import {
  NoteName,
  ScaleName,
  Interval,
  Note,
  OctaveNumber,
} from "ts/musicTheory";

export type Tunings = {
  guitar: {
    standard: ["e2", "a3", "d3", "g3", "b4", "e4"];
    "drop-d": ["d2", "a3", "d3", "g3", "b4", "e4"];
    dadgad: ["d2", "a3", "d3", "g3", "a4", "d4"];
    "open-d": ["d2", "a3", "d3", "f#3", "a4", "d4"];
  };
  mandolin: {
    standard: ["g2", "d3", "a3", "e4"];
    gdad: ["g2", "d3", "a3", "d4"];
  };
  ukulele: {
    standard: ["g4", "c4", "e4", "a4"];
  };
  bass: {
    standard: ["e1", "a1", "g2", "d2"];
  };
};

export interface FretData {
  noteName: NoteName;
  octave: OctaveNumber;
  interval: Interval;
}
export type StringedInstrumentName = keyof Tunings;

export type GuitarTuningName = keyof Tunings["guitar"];
export type MandolinTuningName = keyof Tunings["mandolin"];
export type UkuleleTuningName = keyof Tunings["ukulele"];
export type BassTuningName = keyof Tunings["bass"];

export type TuningName =
  | GuitarTuningName
  | MandolinTuningName
  | UkuleleTuningName
  | BassTuningName;

// ToDo: Find a way to express the Tunings as a union
// of all possible values from the Tunings object
// instead of general arrays of Notes
export type Tuning = Note[];

export interface StringData {
  rootNote: NoteName;
  frets: FretData[];
}

export type StringNumber = NumbersToN<6>;
export type FretNumber = NumbersToN<22>;

export type StringedInstrumentDimensions = {
  [key in "neck" | "string" | "fret"]: {
    height: number;
    width: number;
  };
};

export interface StringedInstrumentState {
  instrumentType: StringedInstrumentName;
  tuningName: TuningName;
  strings: Tuning;
  fretTotal: NrRange<6, 22>;
  fretStart: NrRange<0, 16>;
  fretEnd: NrRange<6, 22>;
  markedNotes: NoteName[];
  dimensions: StringedInstrumentDimensions;
}

export type FretStart = StringedInstrumentState["fretStart"];
export type FretEnd = StringedInstrumentState["fretEnd"];
export type FretTotal = StringedInstrumentState["fretTotal"];
