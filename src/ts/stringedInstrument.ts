import { NoteName, ScaleName, Interval, Note } from "./musicTheory";

export type GuitarTuningNames = "standard" | "drop-d" | "open-d";
export type MandolinTuningNames = "standard";
export type UkuleleTypeNames = "standard";

export interface Fret {
  noteName: NoteName;
}

export type StringedInstrumentName =
  | "guitar"
  | "bass"
  | "mandolin"
  | "ukulele"
  | "piano";

export interface StringData {
  rootNote: NoteName;
  frets: Fret[];
}

type Tuning = Note[];

export interface StringedInstrumentState {
  instrumentType: StringedInstrumentName;
  tuning: GuitarTuningNames | MandolinTuningNames | UkuleleTypeNames;
  currentKey: NoteName;
  scale: {
    name: ScaleName;
    intervals: Interval[];
    notes: Note[];
  };
}
