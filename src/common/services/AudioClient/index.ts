import * as Tone from "tone";
import { SampleLibrary } from "common/utils/SampleLibrary";
import {
  AudioClientInstrument,
  AudioClientOptions,
  AudioPartItem,
} from "ts/AudioClient";
import { InstrumentSamplers } from "ts/AudioClient";
import { Note, Chord } from "ts/musicTheory";
import { NoteDuration } from "ts/AudioClient";

type AudioData = {
  // time:
};

class AudioClient {
  buffer: Tone.ToneAudioBuffer | undefined;
  instruments: InstrumentSamplers;
  currentInstrument: AudioClientInstrument;
  sampler: InstrumentSamplers[keyof InstrumentSamplers];

  constructor(options: AudioClientOptions) {
    console.log({ baseUrl: process.env.REACT_APP_AUDIO_SAMPLE_URL });

    let sampleLibrary = new SampleLibrary(options.Tone);
    let instruments = sampleLibrary.load({
      instruments: [options.instrument],
      // baseUrl: "audio/samples/",
      baseUrl: process.env.REACT_APP_AUDIO_SAMPLE_URL,
      // minify: true,
      urls: {
        C4: "C4.[mp3|ogg]",
      },
      onLoad: options.onLoad,
    });

    this.instruments = instruments;
    this.currentInstrument = options.instrument;
    // this.mergeDurationsAndPitches(this.noteDurations, this.pitches);
  }
  // pitches: Note[] | Chord[] = [["c4"]];
  // noteDurations: NoteDuration[] = ["4n", "4n.", "8n"];
  // noteDurations: NoteDuration[] = ["4n"];

  mergeDurationsAndPitches(
    noteDurations: NoteDuration[],
    pitches: Note[] | Chord[]
  ): AudioPartItem[] | {} {
    console.log(noteDurations);

    let progressTime = 0;

    let durations = noteDurations.map((duration) => {
      let durationSeconds = Tone.Time(duration).toSeconds();

      let noteTime = progressTime;

      let time = Tone.Time(noteTime).toBarsBeatsSixteenths();

      progressTime += durationSeconds;

      return {
        time,
        duration,
      };
    });

    console.log(durations);

    return {};
  }

  async start(): Promise<void> {
    await Tone.start();
    this.sampler = this.instruments[this.currentInstrument]?.toDestination();
  }

  async play(audioData: AudioData): Promise<void> {
    await this.start();
    const part = new Tone.Part(
      (time, value) => {
        this.sampler?.triggerAttackRelease(value.note, value.duration, time);
      },
      [
        { note: "C4", time: "0:1:0", duration: "+16n" },
        { note: "E4", time: "0:1:16", duration: "+4n" },
        { note: "G4", time: "0:2:16", duration: "+1n" },
      ]
    ).start(0);

    part.humanize = true;

    part.loop = 1;
    part.loopEnd = "2m";

    Tone.Transport.start();
  }

  cleanup() {
    this.buffer?.dispose();
  }
}

export default AudioClient;
