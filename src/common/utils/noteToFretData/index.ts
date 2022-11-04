import { Note } from "ts/musicTheory";
import { FretData } from "ts/stringedInstrument";

export const noteToFretData = (note: Note): FretData => {
  const noteName = note.slice(0, -1);
  const octave = note.slice(-1, note.length);
  return { noteName, octave };
};
