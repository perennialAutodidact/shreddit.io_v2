export type NoteName =
  | "C"
  | "C#"
  | "Db"
  | "D"
  | "D#"
  | "Eb"
  | "E"
  | "E#"
  | "F"
  | "F#"
  | "Gb"
  | "G"
  | "G#"
  | "Ab"
  | "A"
  | "A#"
  | "Bb"
  | "B"
  | "Cb"
  | "B#";

export type GuitarTuning = "standard" | "drop-d" | "open-d";
export type MandolinTuning = "standard";
export type UkuleleType = "standard";
export interface Fret {
  noteName: NoteName;
}

export type StringedInstrumentName = "guitar" | "bass" | "mandolin" | "ukulele";

export interface StringData {
  rootNote: NoteName;
  frets: Fret[];
}
export interface StringedInstrumentState {
  instrumentType: StringedInstrumentName;
  strings: StringData[];
  tuning: "";
}
