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

export type OctaveNumber = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
export type Interval =
  | `P${number}`
  | `m${number}`
  | `M${number}`
  | `A${number}`
  | `d${number}`;

export type Note = `${NoteName}${number}`;

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
