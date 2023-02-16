import { SampleLibraryInstrument } from "./SampleLibrary";

export type AppState = {
  currentInstrument: SampleLibraryInstrument;
  isPlayingAudio: boolean;
  showSettingsMenu: boolean;

  versionNumbers: {
    scaleExplorer: string;
  };
};
