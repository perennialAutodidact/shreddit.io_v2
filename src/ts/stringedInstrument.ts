import { NrRange, NumbersToN } from "ts-number-range";
import {
  NoteName,
  ScaleName,
  Interval,
  Note,
  OctaveNumber,
  MusicKeys,
} from "ts/musicTheory";
import { MIN_NECK_LENGTH } from "common/constants/stringedInstruments";
export type GuitarTuningNames = "standard" | "drop-d" | "open-d";
export type MandolinTuningNames = "standard";
export type UkuleleTuningNames = "standard";

export type Tunings = {
  guitar: {
    standard: ["e2", "a3", "d3", "g3", "b4", "e4"];
    "drop-d": ["d2", "a3", "d3", "g3", "b4", "e4"];
    dadgad: ["d2", "a3", "d3", "g3", "a4", "d4"];
    "open-d": ["d2", "a3", "d3", "f#3", "a4", "d4"];
  };
  mandolin: {
    standard: ["g2", "d3", "a3", "e4"];
  };
  ukulele: {
    standard: ["g4", "c4", "e4", "a4"];
  };
  bass: { standard: ["e1", "a1", "g2", "d2"] };
};

export interface FretData {
  noteName: NoteName;
  octave: OctaveNumber;
  interval: Interval;
}
export type StringedInstrumentName = keyof Tunings;

export type TuningName =
  | keyof Tunings["guitar"]
  | keyof Tunings["mandolin"]
  | keyof Tunings["ukulele"]
  | keyof Tunings["bass"];

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

export type ScaleData = {
  name: ScaleName;
  notes: NoteName[];
  intervals: Interval[];
};

export interface StringedInstrumentState {
  instrumentType: StringedInstrumentName;
  tuningName: TuningName;
  strings: Tuning;
  currentKey: keyof MusicKeys;
  totalFrets: NrRange<6, 21>;
  scale: {
    name: ScaleName;
    intervals: Interval[];
    notes: NoteName[];
  };
  markedNotes: NoteName[];
  dimensions: StringedInstrumentDimensions;
}
