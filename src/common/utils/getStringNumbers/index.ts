import { InstrumentName, Strings, StringNumber } from "ts/stringedInstrument";

export const getStringNumbers = (
  strings: Strings,
  instrumentName: InstrumentName
): StringNumber<typeof instrumentName>[] =>
  Object.keys(strings)
    .slice()
    .reverse()
    .map(
      (stringNumber) =>
        parseInt(stringNumber) as StringNumber<typeof instrumentName>
    );
