import React, { useContext } from "react";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { TeoriaContext } from "common/components/TeoriaProvider/context";
import Neck from "./Neck";
import String from "./String";
import styles from "./StringedInstrument.module.scss";

interface StringedInstrumentProps {}

const StringedInstrument: React.FC<
  StringedInstrumentProps
> = ({}: StringedInstrumentProps) => {
  const appDispatch = useAppDispatch();
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
