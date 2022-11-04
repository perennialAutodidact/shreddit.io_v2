import { Note, Interval } from "ts/musicTheory";
import { Fret } from "ts/stringedInstrument";
import {
  intervalsWithAug4,
  intervalsWithDim5,
  MIN_NECK_LENGTH,
} from "common/constants";

const teoria = require("teoria");

export const getFrets = (
  _rootNote: Note,
  neckLength: number,
  aug4orDim5: "aug4" | "dim5"
) => {
  if (neckLength < MIN_NECK_LENGTH) {
    throw new RangeError(`Neck length must be at least ${MIN_NECK_LENGTH}`);
  }
  const fretNumbers: number[] = [...Array(neckLength)].map((_, i) => i + 1);
  const intervals: Interval[] =
    aug4orDim5 === "aug4" ? intervalsWithAug4 : intervalsWithDim5;
  const rootNote = teoria.note(_rootNote);

  const frets: Note[] = fretNumbers.map((fretNumber) => {
    const interval = intervals[fretNumber % neckLength];
    const note = rootNote.interval(interval);

    return note.toString();
  });

  return frets;
};

// export { getFrets };
