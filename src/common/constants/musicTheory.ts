import { Interval, MusicKeys, ScaleName, ScaleWithLabel } from "ts/musicTheory";

const allIntervals: Interval[] = [
  "P1",
  "m2",
  "M2",
  "m3",
  "M3",
  "P4",
  "A4",
  "d5",
  "P5",
  "m6",
  "M6",
  "m7",
  "M7",
  "P8",
  "m9",
  "M9",
  "m10",
  "M10",
  "P11",
  "A11",
  "d12",
  "P12",
  "A12",
  "m13",
  "M13",
  "m14",
  "M14",
  "P15",
];

export const SCALE_NAMES: ScaleName[] = [
  "aeolian",
  "blues",
  "chromatic",
  "dorian",
  "doubleharmonic",
  "harmonicminor",
  "ionian",
  "locrian",
  "lydian",
  "majorpentatonic",
  "melodicminor",
  "minorpentatonic",
  "mixolydian",
  "phrygian",
  "wholetone",
  "minor",
  "major",
  "flamenco",
];

export const SCALES_WITH_LABELS: ScaleWithLabel[] = [
  { value: "aeolian", label: "Aeolian" },
  { value: "blues", label: "Blues" },
  { value: "chromatic", label: "Chromatic" },
  { value: "dorian", label: "Dorian" },
  { value: "doubleharmonic", label: "Double Harmonic" },
  { value: "flamenco", label: "Flamenco" },
  { value: "harmonicminor", label: "Harmonic Minor" },
  { value: "ionian", label: "Ionian" },
  { value: "locrian", label: "Locrian" },
  { value: "lydian", label: "Lydian" },
  { value: "major", label: "Major" },
  { value: "majorpentatonic", label: "Major Pentatonic" },
  { value: "melodicminor", label: "Melodic Minor" },
  { value: "minor", label: "Minor" },
  { value: "minorpentatonic", label: "Minor Pentatonic" },
  { value: "mixolydian", label: "Mixolydian" },
  { value: "phrygian", label: "Phrygian" },
  { value: "wholetone", label: "Whole Tone" },
];

export const intervalsWithAug: Interval[] = allIntervals.filter(
  (interval) => !interval.startsWith("d")
);
export const intervalsWithDim: Interval[] = allIntervals.filter(
  (interval) => !interval.startsWith("A")
);

export const musicKeys: MusicKeys = {
  c1: "C",
  "c#1": "C#",
  db1: "Db",
  d1: "D",
  eb1: "Eb",
  e1: "E",
  f1: "F",
  "f#1": "F#",
  gb1: "Gb",
  g1: "G",
  ab1: "Ab",
  a1: "A",
  bb1: "Bb",
  b1: "B",
  cb1: "Cb",
};
