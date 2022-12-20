import { Tunings } from "ts/stringedInstrument";

export const tunings: Tunings = {
  guitar: {
    standard: ["e2", "a3", "d3", "g3", "b4", "e4"],
    "drop-d": ["d2", "a3", "d3", "g3", "b4", "e4"],
    dadgad: ["d2", "a3", "d3", "g3", "a4", "d4"],
    "open-d": ["d2", "a3", "d3", "f#3", "a4", "d4"],
  },
  mandolin: {
    standard: ["g2", "d3", "a3", "e4"],
    gdad: ["g2", "d3", "a3", "d4"],
  },
  ukulele: {
    standard: ["g4", "c4", "e4", "a4"],
  },
  bass: {
    standard: ["e1", "a1", "g2", "d2"],
  },
};

export const MIN_NECK_LENGTH = 6;

export const INLAY_FRET_INDICES = [3, 5, 7, 9, 12, 15, 17, 19];

export const ALL_INSTRUMENTS: (keyof Tunings)[] = Object.keys(tunings).map(
  (tuning) => tuning as keyof Tunings
);
