import { Note, Interval, NoteName, OctaveNumber } from "ts/musicTheory";
import { FretData } from "ts/stringedInstrument";
import {
  intervalsWithAug4,
  intervalsWithDim5,
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
  neckLength: number,
  aug4orDim5: "aug4" | "dim5"
) => {
  if (neckLength < MIN_NECK_LENGTH) {
    throw new RangeError(`Neck length must be at least ${MIN_NECK_LENGTH}`);
  }
  const fretNumbers: number[] = [...Array(neckLength + 1)].map((_, i) => i);
  const intervals: Interval[] =
    aug4orDim5 === "aug4" ? intervalsWithAug4 : intervalsWithDim5;
  const rootNote = teoria.note(_rootNote);

  const frets: FretData[] = fretNumbers.map((fretNumber) => {
    const interval = intervals[fretNumber % neckLength];
    const note: Note = rootNote.interval(interval).toString();

    let noteName: NoteName = note.slice(0, -1) as NoteName;
    let octave: OctaveNumber = note[note.length - 1] as OctaveNumber;

    return { noteName, octave, interval };
  });

  return frets;
};
