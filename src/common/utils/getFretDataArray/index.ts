import { Note, Interval, NoteName, OctaveNumber } from "ts/musicTheory";
import {
  FretEnd,
  FretData,
  FretStart,
  StringedInstrumentState,
} from "ts/stringedInstrument";
import {
  intervalsWithAug,
  intervalsWithDim,
} from "common/constants/musicTheory";
import { MIN_NECK_LENGTH } from "common/constants/stringedInstruments";

const teoria = require("teoria");

/**
 *
 * @param _rootNote String of type Note "c#4", "gb5", "f2", "dx6", etc
 * @param neckLength Number of frets to generate
 * @param aug4orDim5 Used to determine if the fret data should contain an augmented 4th or diminished 5th
 * @returns {FretData[]} Array of FretData objects. Will always return neckLength + 1 frets to include the _rootNote
 */
export const getFretDataArray = (
  _rootNote: Note,
  fretStart: FretStart,
  fretEnd: FretEnd,
  augOrDim: "aug" | "dim"
): FretData[] => {
  const fretTotal = fretEnd - fretStart;
  if (fretTotal < MIN_NECK_LENGTH) {
    throw new RangeError(`Neck length must be at least ${MIN_NECK_LENGTH}`);
  }
  let fretNumbers: number[] = [];

  for (let i = fretStart; i <= fretEnd; ++i) {
    fretNumbers.push(i);
  }

  const intervals: Interval[] =
    augOrDim === "aug" ? intervalsWithAug : intervalsWithDim;
  const rootNote = teoria.note(_rootNote);

  const frets: FretData[] = fretNumbers.map((fretNumber) => {
    const interval = intervals[fretNumber % intervals.length];
    const note: Note = rootNote.interval(interval).toString();

    let noteName: NoteName = note.slice(0, -1) as NoteName;
    let octave: OctaveNumber = note[note.length - 1] as OctaveNumber;

    return { noteName, octave, interval };
  });

  return frets;
};
