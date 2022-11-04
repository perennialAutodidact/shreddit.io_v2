import React, { useContext, useMemo } from "react";
import { useAppSelector } from "store/hooks";
import { TeoriaContext } from "components/TeoriaProvider/context";
import { Note } from "ts/musicTheory";
import styles from "./String.module.scss";
import Fret from "components/StringedInstrument/Fret";

interface StringProps {
  rootNote: Note;
}

const String: React.FC<StringProps> = ({ rootNote }: StringProps) => {
  const { neckLength } = useAppSelector((appState) => appState.instrument);
  const { teoria } = useContext(TeoriaContext);

  const fretNumbers: number[] = [...Array(neckLength)].map((_, i) => i);

  return (
    <div className={styles.string}>
      {frets.map((fret) => (
        <Fret key={`${fret.noteName}${fret.octave}`} />
      ))}
    </div>
  );
};

export default String;
