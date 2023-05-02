import { RefObject } from "react";
import { NrRange, NumbersToN } from "ts-number-range";
import { Note, NoteName, Interval, OctaveNumber } from "ts/musicTheory";

// Tunings
export type Tunings = {
  guitar: {
    standard: ["e2", "a3", "d3", "g3", "b4", "e4"];
    "drop-d": ["d2", "a3", "d3", "g3", "b4", "e4"];
    dadgad: ["d2", "a3", "d3", "g3", "a4", "d4"];
    "open-d": ["d2", "a3", "d3", "f#3", "a4", "d4"];
  };
  mandolin: {
    standard: ["g2", "d3", "a3", "e4"];
    gdad: ["g2", "d3", "a3", "d4"];
  };
  ukulele: {
    standard: ["g4", "c4", "e4", "a4"];
  };
  bass: {
    standard: ["e1", "a1", "g2", "d2"];
  };
};

export type GuitarTuningName = keyof Tunings["guitar"];
export type MandolinTuningName = keyof Tunings["mandolin"];
export type UkuleleTuningName = keyof Tunings["ukulele"];
export type BassTuningName = keyof Tunings["bass"];

// export type TuningName<I> = I extends "guitar"
//   ? GuitarTuningName
//   : I extends "mandolin"
//   ? MandolinTuningName
//   : I extends "ukulele"
//   ? UkuleleTuningName
//   : I extends "bass"
//   ? BassTuningName
//   : never;

export type TuningName<I> = I extends keyof Tunings ? keyof Tunings[I] : never;

export type Tuning<
  I extends keyof Tunings,
  J extends keyof Tunings[I]
> = Note[] & J extends keyof Tunings[I] ? Tunings[I][J] : never;

// Dimensions
export type Dimension = {
  height: number;
  width: number;
};

// Frets
export type FretNumber = NumbersToN<24>;
export type FretStart = NrRange<0, 18>;
export type FretEnd = NrRange<6, 24>;
export type FretTotal = NrRange<6, 24>;

export type Fret = {
  noteName: NoteName;
  octave: OctaveNumber;
  interval: Interval;
  markerEnabled: boolean;
  ref: RefObject<HTMLDivElement>;
};

export type Frets = { [key in FretNumber]?: Fret };

// Strings
export type StringNumber = NumbersToN<6>;

export interface String {
  rootNote: NoteName;
  frets: Frets;
}

export type Strings = StringedInstrumentState["neck"]["strings"];

// Neck
export type Neck = StringedInstrumentState["neck"];

// Instrument
export type StringedInstrumentName = keyof Tunings;
export type StringedInstrumentDimensions = {
  [key in "neck" | "string" | "fret"]: {
    height: number;
    width: number;
  };
};

export type StringedInstrumentState = {
  instrumentType: StringedInstrumentName;
  tuningName: TuningName<keyof Tunings>;
  neck: {
    fretStart: FretStart;
    fretEnd: FretEnd;
    fretTotal: FretTotal;
    strings: {
      [N in StringNumber]?: {
        rootNote: Note;
        frets: { [key in FretNumber]?: Fret };
      };
    };
  };
  markedNotes: NoteName[];
  dimensions: StringedInstrumentDimensions;
};
