import * as Tone from "tone";
import { SampleMap, SampleMapKey, Note, SampleFileName } from "./sampleMap";
import { FileExtension, SampleLibraryInstrument } from "ts/SampleLibrary";

export interface SampleLibraryOptions {
  minify?: boolean;
  fileExtension?: FileExtension;
  urls: {
    [K in Note]?: SampleFileName;
  };
  baseUrl?: string;
  instruments?: (SampleLibraryInstrument | "salamander")[];
  onLoad?: null | (() => void);
}

type MinifyFactor = 1 | 2 | 4 | 6;
type SampleKeys = Array<keyof SampleMap[SampleMapKey]>;

const INSTRUMENTS: SampleLibraryInstrument[] = [
  "salamander",
  "bass-electric",
  // "bassoon",
  // "cello",
  // "clarinet",
  "contrabass",
  // "flute",
  // "french-horn",
  "guitar-acoustic",
  "guitar-electric",
  "guitar-nylon",
  // "harmonium",
  // "harp",
  // "organ",
  "piano",
  // "saxophone",
  // "trombone",
  // "trumpet",
  // "tuba",
  // "violin",
  // "xylophone",
];

type InstrumentSamplers = {
  [key in SampleLibraryInstrument]?: Tone.Sampler;
};

class SampleLibrary {
  Tone: any;
  fileExtension: FileExtension;
  options: SampleLibraryOptions = {
    urls: {
      C4: "C4.[mp3|ogg]",
    },
    minify: true,
    fileExtension: ".[mp3|ogg]",
    baseUrl: "../samples/",
    instruments: INSTRUMENTS,
    onLoad: null,
  };

  constructor(Tone: any) {
    this.Tone = Tone;
    this.fileExtension = ".[mp3|ogg]";
  }

  setExtension(newExtension: FileExtension): void {}

  private _updateOptions(options: Partial<SampleLibraryOptions>) {
    let updatedOptions: SampleLibraryOptions;
    if (options.fileExtension) {
      this.setExtension(options.fileExtension);
    }
    updatedOptions = {
      ...this.options,
      ...options,
    };

    return updatedOptions;
  }

  private _getMinifyFactor(keys: SampleKeys): MinifyFactor {
    let minifyFactor: MinifyFactor;

    if (keys.length >= 49) {
      minifyFactor = 6;
    } else if (keys.length >= 33) {
      minifyFactor = 4;
    } else if (keys.length >= 17) {
      minifyFactor = 2;
    } else {
      minifyFactor = 1;
    }

    return minifyFactor;
  }

  private _minifySamples(samples: SampleMap[SampleMapKey]) {
    let keys = Object.keys(samples) as SampleKeys;

    let minifyFactor = this._getMinifyFactor(keys);

    let filteredKeys = Object.keys(samples as SampleKeys).filter(
      (_, i) => i % minifyFactor !== 0
    );
    filteredKeys.forEach((key) => {
      delete samples[key as keyof SampleMap[SampleMapKey]];
    });

    return samples;
  }

  load(options?: SampleLibraryOptions): InstrumentSamplers {
    let instrumentSamplers: InstrumentSamplers = {};

    if (options) {
      this.options = this._updateOptions(options);
    }

    let { instruments, baseUrl, urls, onLoad } = this.options;

    instruments?.forEach((instrument) => {
      // let samples = minify
      //   ? this._minifySamples(sampleMap[instrument])
      //   : sampleMap; //[instrument];

      instrumentSamplers[instrument as keyof InstrumentSamplers] =
        new this.Tone.Sampler({
          urls,
          baseUrl: `${baseUrl}/${instrument}/`,
        });
    });

    if (onLoad) {
      onLoad();
    }

    return instrumentSamplers;
  }
}

export { SampleLibrary };
