import React from "react";
import { useAppSelector } from "store/hooks";
import Neck from "./Neck";
import String from "./String";
import styles from "./StringedInstrument.module.scss";

interface StringedInstrumentProps {}

const StringedInstrument: React.FC<
  StringedInstrumentProps
> = ({}: StringedInstrumentProps) => {
  const { strings } = useAppSelector((appState) => appState.instrument);

  return (
    <div
      className={`container ${styles.stringedInstrument}`}
      id="instrument-container"
    >
      <Neck>
        {strings.map((rootNote) => (
          <String rootNote={rootNote} key={rootNote} />
        ))}
      </Neck>
    </div>
  );
};

export default StringedInstrument;
