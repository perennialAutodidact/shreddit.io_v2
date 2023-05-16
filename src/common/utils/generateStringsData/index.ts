import {
  FretData,
  FretEnd,
  Frets,
  FretNumber,
  FretStart,
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
  fretStart: FretStart,
  fretEnd: FretEnd
): Strings => {
  const strings = {} as Strings;

  tuning.forEach((rootNote, i) => {
    const _frets: [FretNumber<typeof fretStart, typeof fretEnd>, FretData][] =
      getFretDataArray(rootNote, fretStart, fretEnd, "dim").map<
        [FretNumber<typeof fretStart, typeof fretEnd>, FretData]
      >((fret, index) => [
        index as FretNumber<typeof fretStart, typeof fretEnd>,
        fret,
      ]);

    const frets: Frets = Object.fromEntries(_frets);

    strings[i as keyof Strings] = {
      rootNote,
      frets,
    };
  });

  return strings;
};
