import React from "react";
import { useAppDispatch } from "store/hooks";
import { setCurrentKey } from "store/stringedInstrumentSlice";
import { musicKeys } from "common/constants/musicTheory";
import { MusicKeys } from "ts/musicTheory";
import DropdownSelectMenu from "common/components/DropdownSelectMenu";

const dropdownOptions: {
  value: keyof MusicKeys;
  label: string;
}[] = Object.keys(musicKeys).map((key) => ({
  label: musicKeys[key as keyof MusicKeys] as string,
  value: key as keyof MusicKeys,
}));

const MusicKeySelect = () => {
  const appDispatch = useAppDispatch();

  const changeCurrentKey = (newKey: keyof MusicKeys) => {
    appDispatch(setCurrentKey(newKey));
  };

  return (
    <DropdownSelectMenu
      labelText={"Key"}
      options={dropdownOptions}
      appStateSetter={changeCurrentKey}
    />
  );
};

export default MusicKeySelect;
