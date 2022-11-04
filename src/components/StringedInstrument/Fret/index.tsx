import React from "react";
import { Note } from "ts/musicTheory";
import { FretData } from "ts/stringedInstrument";

interface FretProps extends FretData {}

const Fret = ({ noteName, octave }: FretProps) => {
  return <div>{noteName}</div>;
};

export default Fret;
