import React from "react";
import { useAppDispatch } from "store/hooks";
import { musicKeys } from "common/constants/musicTheory";
import { MusicKeys, NoteName } from "ts/musicTheory";
import styles from "./MusicKeySelect.module.scss";
import DropdownSelectMenu, {
  DropdownSelectOption,
} from "common/components/DropdownSelectMenu";

const dropdownOptions: {
  value: keyof MusicKeys;
  label: string;
}[] = Object.keys(musicKeys).map((key) => ({
  label: musicKeys[key as keyof MusicKeys] as string,
  value: key as keyof MusicKeys,
}));

// const dropdownOptions:

const MusicKeySelect = () => {
  return <DropdownSelectMenu labelText={"Key"} options={dropdownOptions} />;
};

export default MusicKeySelect;
