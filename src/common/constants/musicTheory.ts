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
