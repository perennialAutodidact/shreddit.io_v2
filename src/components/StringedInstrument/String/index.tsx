import React, { useContext, useEffect, useRef } from "react";
import { useAppSelector } from "store/hooks";
import { TeoriaContext } from "components/TeoriaProvider/context";
import { Note } from "ts/musicTheory";
import { FretData } from "ts/stringedInstrument";
import styles from "./String.module.scss";
import Fret from "components/StringedInstrument/Fret";
import { getFrets } from "common/utils/getFrets";
import { noteToFretData } from "common/utils/noteToFretData";
interface StringProps {
  rootNote: Note;
}

const String: React.FC<StringProps> = ({ rootNote }: StringProps) => {
  const { neckLength } = useAppSelector((appState) => appState.instrument);
  const { teoria } = useContext(TeoriaContext);
  const stringRef = useRef<HTMLDivElement>(null);

  const frets: FretData[] = getFrets(rootNote, neckLength, "aug4");
  const zerothFret: FretData = noteToFretData(rootNote);

  useEffect(() => {
    if (stringRef.current) {
      stringRef.current.style.width = `${window.innerWidth / 6}px`;
      console.log(window.innerWidth);
      console.log(stringRef.current);
    }
  }, [stringRef]);

  return (
    <div className={`d-flex flex-column ${styles.string}`} ref={stringRef}>
      {zerothFret.noteName}
      {frets.map((fret) => (
        <Fret {...fret} key={`${fret.noteName}${fret.octave}`} />
      ))}
    </div>
  );
};

export default String;
