import {
  FretEnd,
  FretStart,
  FretTotal,
  Neck,
  StringedInstrumentName,
  Strings,
  Tuning,
  TuningName,
  Tunings,
} from "ts/stringedInstrument";
import { generateStringsData } from "common/utils";
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

export const INLAY_FRET_INDICES = [3, 5, 7, 9, 12, 15, 17, 19, 22, 24];

export const ALL_INSTRUMENTS: (keyof Tunings)[] = Object.keys(tunings).map(
  (tuning) => tuning as keyof Tunings
);

export const INITIAL_INSTRUMENT: StringedInstrumentName = "guitar";
export const INITIAL_TUNING_NAME: TuningName<typeof INITIAL_INSTRUMENT> =
  "standard";

export const INITIAL_FRET_START: FretStart = 0;
export const INITIAL_FRET_END: FretEnd = 12;
export const INITIAL_FRET_TOTAL = (INITIAL_FRET_END -
  INITIAL_FRET_START) as FretTotal;

export const INITIAL_TUNING: Tuning<
  typeof INITIAL_INSTRUMENT,
  typeof INITIAL_TUNING_NAME
> = tunings[INITIAL_INSTRUMENT][INITIAL_TUNING_NAME];

export const INITIAL_STRINGS: Strings = generateStringsData(
  INITIAL_TUNING,
  INITIAL_FRET_START,
  INITIAL_FRET_END
);

export const INITIAL_NECK: Neck = {
  fretStart: INITIAL_FRET_START,
  fretEnd: INITIAL_FRET_END,
  fretTotal: INITIAL_FRET_TOTAL,
  strings: INITIAL_STRINGS,
};
