import { Sampler } from "tone";
import { Chord, Note, NoteName, Interval, ScaleName } from "ts/musicTheory";
import { SampleLibraryInstrument } from "ts/SampleLibrary";

export type AudioClientInstrument =
  | "salamander"
  | "guitar-acoustic"
  | "bass-electric"
  | "contrabass"
  | "guitar-electric"
  | "guitar-nylon"
  | "piano";

export type AudioClientOptions = {
  Tone: any;
  instrument: AudioClientInstrument;
  onLoad?: () => void;
};

export type InstrumentSamplers = {
  [Key in SampleLibraryInstrument]?: Sampler;
};

export type RhythmDuration = `${"2" | "4" | "8"}n${"." | ""}`;

export type AudioPartItem = {
  time: `${number}:${number}:${number}`;
  duration: RhythmDuration;
  noteOrChord: Note | Chord;
  velocity?: number;
};

export type ScaleData = {
  name: ScaleName;
  notes: NoteName[];
  intervals: Interval[];
};

export type AudioClientState = {
  currentKey: Note;
  scale: ScaleData;
  rhythmDurations: RhythmDuration[];
  markedNotes: NoteName[];
  notesOrChords: Note[] | Chord[];
};
