import { NoteName } from "ts/musicTheory";

const teoria = require("teoria");

export const getEnharmonics = (notes: NoteName[]): NoteName[] => {
  if (!Array.isArray(notes)) {
    throw new TypeError("notes array must be of type of Notes");
  }
  const enharmonics: NoteName[] = notes.slice().flatMap((_note) => {
    let note = teoria.note(_note);

    let _enharmonics: string[] = note
      .enharmonics()
      .toString()
      .replace(/[0-9]/g, "")
      .split(",");
    // console.log(note.toString(), _enharmonics);
    _enharmonics = _enharmonics.filter(
      (enharmonic: string) => enharmonic.length < 3 && !enharmonic.includes("x")
    );

    return _enharmonics as NoteName[];
  });
  // console.log(enharmonics);

  return enharmonics;
};
