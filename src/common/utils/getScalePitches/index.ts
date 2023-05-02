import { Note, ScaleName } from "ts/musicTheory";
const teoria = require("teoria");

/** Returns Notes based on an array of NoteNames
 *
 * @param key (Note) - tonic note of the scale and first pitch in resulting array
 * @param scale (ScaleName) - name of the scale to be built
 * @returns Note[] - array of Notes to be played by the AudioClient
 */
export const getScalePitches = (key: Note, scale: ScaleName): Note[] => {
  let _scale = teoria.note(key).scale(scale);

  return _scale
    .notes()
    .map((n: Note) => teoria.note(n.toString()).scientific())
    .concat(
      teoria.note(_scale.notes()[0].toString()).interval("P8").scientific()
    );
};
