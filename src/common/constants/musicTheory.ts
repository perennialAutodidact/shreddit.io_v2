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
  "A5",
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

export const intervalsWithAug: Interval[] = allIntervals.filter(
  (interval) => !interval.startsWith("d")
);
export const intervalsWithDim: Interval[] = allIntervals.filter(
  (interval) => !interval.startsWith("A")
);
