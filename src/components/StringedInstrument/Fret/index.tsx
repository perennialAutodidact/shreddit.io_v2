import React from "react";
import { Note } from "ts/musicTheory";
import { FretData } from "ts/stringedInstrument";
import styles from "./Fret.module.scss";

interface FretProps extends FretData {}

const Fret = ({ noteName, octave }: FretProps) => {
  return <div className={`${styles.fret}`}>{noteName}</div>;
};

export default Fret;
