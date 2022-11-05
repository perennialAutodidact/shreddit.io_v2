import React, { useContext } from "react";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { TeoriaContext } from "components/TeoriaProvider/context";
import Neck from "./Neck";
import String from "./String";

interface StringedInstrumentProps {}

const StringedInstrument: React.FC<
  StringedInstrumentProps
> = ({}: StringedInstrumentProps) => {
  const appDispatch = useAppDispatch();
  const { strings } = useAppSelector((appState) => appState.instrument);

  return (
    <div className="container" id="instrument-container">
      <Neck>
        {strings.map((rootNote) => (
          <String rootNote={rootNote} key={rootNote} />
        ))}
      </Neck>
    </div>
  );
};

export default StringedInstrument;
