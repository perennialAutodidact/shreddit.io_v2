import * as Tone from "tone";
import { SampleLibrary } from "common/utils/SampleLibrary";
import {
  AudioClientInstrument,
  AudioClientOptions,
  AudioClientState,
  AudioPartItem,
} from "ts/AudioClient";
import { InstrumentSamplers } from "ts/AudioClient";
import { Note, Chord } from "ts/musicTheory";
import { RhythmDuration } from "ts/AudioClient";

type PlayOptions = {
  audioData: {
    rhythmDurations: RhythmDuration[];
    pitchesToPlay: Note[] | Chord[];
  };
  onEnd: () => void;
  onChangePitch: (noteOrChord: Note | Chord) => void;
};

class AudioClient {
  buffer: Tone.ToneAudioBuffer | undefined;
  instruments: InstrumentSamplers;
  currentInstrument: AudioClientInstrument;
  sampler: InstrumentSamplers[keyof InstrumentSamplers];

  constructor(options: AudioClientOptions) {
    let sampleLibrary = new SampleLibrary(options.Tone);
    let instruments = sampleLibrary.load({
      instruments: [options.instrument],
      baseUrl: process.env.REACT_APP_AUDIO_SAMPLE_URL,
      urls: {
        C4: "C4.[mp3|ogg]",
      },
      onLoad: options.onLoad,
    });

    this.instruments = instruments;
    this.currentInstrument = options.instrument;
  }

  mergeDurationsAndPitches(
    rhythmDurations: RhythmDuration[],
    notesOrChords: Note[] | Chord[]
  ): AudioPartItem[] | {} {
    let progressTime = 0;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let durations = rhythmDurations.map((duration) => {
      let durationSeconds = Tone.Time(duration).toSeconds();

      let noteTime = progressTime;

      let time = Tone.Time(noteTime).toBarsBeatsSixteenths();

      progressTime += durationSeconds;

      return {
        time,
        duration,
      };
    });

    return {};
  }

  async start(): Promise<void> {
    await Tone.start();
    await Tone.ToneAudioBuffer.loaded();

    this.sampler = this.instruments[this.currentInstrument]?.toDestination();
  }

  async play(options: PlayOptions): Promise<void> {
    await this.start();
    const { audioData } = options;

    const { partData, partDuration } = this.generatePartData(audioData);

    Tone.Transport.debug = true;

    const part = new Tone.Part<AudioPartItem>((time, value) => {
      this.sampler?.triggerAttackRelease(
        value.noteOrChord,
        value.duration,
        time
      );

      options.onChangePitch(value.noteOrChord);
    }, partData).start(0);

    part.humanize = true;

    part.loop = 1;
    part.loopStart = "0";
    part.loopEnd = partDuration;

    Tone.Transport.scheduleOnce(() => {
      options.onEnd();
      part.dispose();
      Tone.Transport.stop();
    }, partDuration);

    Tone.Transport.start("+0.1");
  }

  pause() {
    Tone.Transport.pause();
  }

  stop() {
    Tone.Transport.stop();
  }

  generatePartData = (
    audioData: AudioClientState["audioData"]
  ): { partData: AudioPartItem[]; partDuration: number } => {
    const { rhythmDurations, pitchesToPlay } = audioData;
    if (rhythmDurations.length !== pitchesToPlay.length) {
      throw Error("Duration and pitch arrays must be of the same length");
    }
    let partDuration = 0;

    let partData = rhythmDurations.map((duration, index) => {
      let durationSeconds = Tone.Time(duration).toSeconds();

      let noteTime = partDuration;

      let time = Tone.Time(noteTime).toBarsBeatsSixteenths();

      partDuration += durationSeconds;

      const noteOrChord: Note | Chord = pitchesToPlay[index];

      return {
        time,
        duration,
        noteOrChord,
      } as AudioPartItem;
    });

    return { partData, partDuration };
  };

  cleanup() {
    this.buffer?.dispose();
  }
}

export default AudioClient;
