import React from "react";
import { NoteName } from "ts/stringedInstrument";
import Neck from "./Neck";
import String from "./String";
interface StringedInstrumentProps {
  instrumentType: "guitar" | "mandolin";
}

const StringedInstrument: React.FC<StringedInstrumentProps> = ({
  instrumentType,
}: StringedInstrumentProps) => {
  return <Neck></Neck>;
};

export default StringedInstrument;
