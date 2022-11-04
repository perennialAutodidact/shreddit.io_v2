export type NoteName =
  | "cbb"
  | "cb"
  | "c"
  | "c#"
  | "cx"
  | "dbb"
  | "db"
  | "d"
  | "d#"
  | "dx"
  | "ebb"
  | "eb"
  | "e"
  | "e#"
  | "ex"
  | "fbb"
  | "fb"
  | "f"
  | "f#"
  | "fx"
  | "gbb"
  | "gb"
  | "g"
  | "g#"
  | "gx"
  | "abb"
  | "ab"
  | "a"
  | "a#"
  | "ax"
  | "bbb"
  | "bb"
  | "b"
  | "b#"
  | "bx";

export type ScaleName =
  | "aeolian"
  | "blues"
  | "chromatic"
  | "dorian"
  | "doubleharmonic"
  | "harmonicminor"
  | "ionian"
  | "locrian"
  | "lydian"
  | "majorpentatonic"
  | "melodicminor"
  | "minorpentatonic"
  | "mixolydian"
  | "phrygian"
  | "wholetone"
  | "harmonicchromatic"
  | "minor"
  | "major"
  | "flamenco";

export type Interval =
  | `P${number}`
  | `m${number}`
  | `M${number}`
  | `A${number}`
  | `d${number}`;

export type Note = `${NoteName}${number}`;
