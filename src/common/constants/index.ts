import { Tunings } from "ts/stringedInstrument";
import { Interval } from "ts/musicTheory";

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
];

export const intervalsWithAug4: Interval[] = allIntervals.filter(
  (interval) => interval !== "d5"
);
export const intervalsWithDim5: Interval[] = allIntervals.filter(
  (interval) => interval !== "A4"
);

export const tunings: Tunings = {
  guitar: {
    standard: ["e2", "a3", "d3", "g3", "b4", "e4"],
    "drop-d": ["d2", "a3", "d3", "g3", "b4", "e4"],
    dadgad: ["d2", "a3", "d3", "g3", "a4", "d4"],
    "open-d": ["d2", "a3", "d3", "f#3", "a4", "d4"],
  },
  mandolin: {
    standard: ["g2", "d3", "a3", "e4"],
  },
  ukulele: {
    standard: ["g4", "c4", "e4", "a4"],
  },
};

export const MIN_NECK_LENGTH = 6;
