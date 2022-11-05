import { Note, NoteName, OctaveNumber, isNote } from "ts/musicTheory";
import { FretData } from "ts/stringedInstrument";

export const noteToFretData = (note: Note): FretData => {  
  if (!isNote(note)) {
    throw new TypeError(
      `Expected type Note ('c#4', 'gb5', 'f2', etc) received '${note}'`
    );
  }

  let noteName: NoteName = note.slice(0, -1) as NoteName;
  let octave: OctaveNumber = note[note.length - 1] as OctaveNumber;

  return { noteName, octave };
};
