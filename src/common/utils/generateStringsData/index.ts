import {
  Fret,
  Frets,
  FretNumber,
  Neck,
  Strings,
  Tuning,
  Tunings,
} from "ts/stringedInstrument";
import { Note } from "ts/musicTheory";
import { getFretDataArray } from "../getFretDataArray";

export const generateStringsData = <
  I extends keyof Tunings,
  J extends keyof Tunings[I]
>(
  tuning: Tuning<I, J> & Note[],
  fretStart: Neck["fretStart"],
  fretEnd: Neck["fretEnd"]
): Strings => {
  const strings: Strings = {};

  tuning.forEach((rootNote, i) => {
    const _frets: [FretNumber, Fret][] = getFretDataArray(
      rootNote,
      fretStart,
      fretEnd,
      "dim"
    ).map<[FretNumber, Fret]>((fret, index) => [index as FretNumber, fret]);

    const frets: Frets = Object.fromEntries(_frets);

    strings[i as keyof Strings] = {
      rootNote,
      frets,
    };
  });

  return strings;
};
