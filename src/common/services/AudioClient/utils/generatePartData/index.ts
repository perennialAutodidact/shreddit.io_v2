import * as Tone from "tone";
import { AudioPartItem, NoteDuration } from "ts/AudioClient";
import { Note } from "ts/musicTheory";

export const generatePartData = (
  noteDurations: NoteDuration[],
  pitches: Note[]
): AudioPartItem[] => {
  let progressTime = 0;

  let partData = noteDurations.map((duration) => {
    let durationSeconds = Tone.Time(duration).toSeconds();

    let noteTime = progressTime;

    let time = Tone.Time(noteTime).toBarsBeatsSixteenths();

    progressTime += durationSeconds;

    const note: Note = "c4";
    return {
      time,
      duration,
      note,
    } as AudioPartItem;
  });

  return partData;
};
