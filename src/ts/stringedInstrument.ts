import { NrRange, NumbersToN } from "ts-number-range";
import {
  NoteName,
  ScaleName,
  Interval,
  Note,
  OctaveNumber,
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
};

export interface FretData {
  noteName: NoteName;
  octave: OctaveNumber;
  interval: Interval;
}
export type StringedInstrumentName =
  | "guitar"
  | "bass"
  | "mandolin"
  | "ukulele"
  | "piano";

export interface StringData {
  rootNote: NoteName;
  frets: FretData[];
}

export type Tuning = Note[];

export type FretNumber = NumbersToN<22>;

export type StringedInstrumentDimensions = {
  [key in "neck" | "string" | "fret"]: {
    height: number;
    width: number;
  };
};

export interface StringedInstrumentState {
  instrumentType: StringedInstrumentName;
  tuningName: GuitarTuningNames | MandolinTuningNames | UkuleleTuningNames;
  strings: Tuning;
  currentKey: NoteName;
  totalFrets: NrRange<6, 21>;
  scale: {
    name: ScaleName;
    intervals: Interval[];
    notes: Note[];
  };
  dimensions: StringedInstrumentDimensions;
}
