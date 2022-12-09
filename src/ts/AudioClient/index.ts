import { Sampler } from "tone";
import { Note } from "ts/musicTheory";
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

export type NoteDuration = `${"2" | "4" | "8"}n${"." | ""}`;

export type AudioPartItem = {
  time: `${number}:${number}:${number}`;
  duration: NoteDuration;
  note: Note;
  velocity?: number;
};
