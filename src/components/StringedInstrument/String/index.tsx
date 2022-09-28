import React from "react";
import { NoteName, Fret } from "ts/stringedInstrument";
import styles from "./String.module.scss";

interface StringProps {
  stringData: {
    rootNote: NoteName;
    frets: Fret[];
  };
}

const String: React.FC<StringProps> = ({ stringData }: StringProps) => {
  return <div className={styles.string}></div>;
};

export default String;
