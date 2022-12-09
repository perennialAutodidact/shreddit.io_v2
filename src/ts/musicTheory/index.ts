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
export type MusicKeys = {
  c1: "C";
  "c#1": "C#";
  db1: "Db";
  d1: "D";
  eb1: "Eb";
  e1: "E";
  f1: "F";
  "f#1": "F#";
  gb1: "Gb";
  g1: "G";
  ab1: "Ab";
  a1: "A";
  bb1: "Bb";
  b1: "B";
  cb1: "Cb";
};

export type ScaleName =
  | "aeolian"
  | "blues"
  | "chromatic"
  | "dorian"
  | "doubleharmonic"
  | "flamenco"
  | "harmonicminor"
  | "ionian"
  | "locrian"
  | "lydian"
  | "major"
  | "majorpentatonic"
  | "melodicminor"
  | "minor"
  | "minorpentatonic"
  | "mixolydian"
  | "phrygian"
  | "wholetone";

export type ScaleWithLabel = {
  value: ScaleName;
  label: string;
};

export type OctaveNumber = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

export type Interval =
  | `P${number}`
  | `m${number}`
  | `M${number}`
  | `A${number}`
  | `d${number}`;

export type Note = `${NoteName}${OctaveNumber}`;

export type Chord = Note[];

export function isNote(value: string): value is Note {
  let _isNote = true;
  const noteRegex: RegExp = new RegExp("^[a-g]{1}[#]{0,1}[xb]{0,2}[1-8]{1}$");
  if (typeof value !== "string") {
    return false;
  }
  if (value.length < 2) {
    return false;
  }
  if (!value.match(noteRegex)) {
    return false;
  }
  return _isNote;
}
