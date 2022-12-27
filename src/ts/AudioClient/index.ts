import { Sampler } from "tone";
import { Chord, Note } from "ts/musicTheory";
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

export type AudioClientState = {
  audioData: {
    rhythmDurations: RhythmDuration[];
    pitchesToPlay: Note[] | Chord[];
  };
  activePitch: Note | Chord | null;
};
