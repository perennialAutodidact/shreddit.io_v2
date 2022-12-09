export type SampleLibraryInstrument =
  | "salamander"
  | "bass-electric"
  | "contrabass"
  | "guitar-acoustic"
  | "guitar-electric"
  | "guitar-nylon"
  | "piano";
//   | "bassoon"
//   | "cello"
//   | "clarinet"
//   | "flute"
//   | "french-horn"
//   | "harmonium"
//   | "harp"
//   | "organ"
//   | "saxophone"
//   | "trombone"
//   | "trumpet"
//   | "tuba"
//   | "violin"
//   | "xylophone";

export type FileExtensionSuffix = "mp3" | "wav" | "ogg";
export type FileExtension =
  | `.${FileExtensionSuffix}`
  | `.[${FileExtensionSuffix}]`
  | `.[${FileExtensionSuffix}|${FileExtensionSuffix}]`
  | `.[${FileExtensionSuffix}|${FileExtensionSuffix}|${FileExtensionSuffix}]`;
