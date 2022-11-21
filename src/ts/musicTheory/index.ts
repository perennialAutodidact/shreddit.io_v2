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
  c: "C";
  "c#": "C#";
  db: "Db";
  d: "D";
  eb: "Eb";
  e: "E";
  f: "F";
  "f#": "F#";
  gb: "Gb";
  g: "G";
  ab: "Ab";
  a: "A";
  bb: "Bb";
  b: "B";
  cb: "Cb";
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
