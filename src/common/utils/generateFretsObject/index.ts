import { StringNumber, FretNumber, Frets } from "ts/stringedInstrument";
import { getFretDataArray } from "../getFretDataArray";

export const generateFretsObject = (
  stringTotal: StringNumber,
  fretTotal: FretNumber
): Frets => {
  const items = [...Array(stringTotal)].flatMap((_, string) =>
    [...Array(fretTotal + 1)].map((_, fret) => [
      `${string}_${fret}`,
      {
        string,
        fret,
        enabled: true,
      },
    ])
  );

  const frets = Object.fromEntries(items);
  return frets;
};
