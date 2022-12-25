import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setCurrentKey } from "store/musicTheorySlice";
import { musicKeys } from "common/constants/musicTheory";
import { MusicKeys } from "ts/musicTheory";
import DropdownSelectMenu, {
  DropdownSelectOption,
} from "common/components/DropdownSelectMenu";

type MusicKey = keyof MusicKeys;

const dropdownOptions: DropdownSelectOption<MusicKey>[] = Object.keys(
  musicKeys
).map((key) => ({
  label: musicKeys[key as keyof MusicKeys],
  value: key as keyof MusicKeys,
}));

const MusicKeySelect = () => {
  const appDispatch = useAppDispatch();
  const { currentKey } = useAppSelector((appState) => appState.musicTheory);

  const changeCurrentKey = (newKey: keyof MusicKeys) => {
    appDispatch(setCurrentKey(newKey));
  };

  const [defaultOption, setDefaultOption] = useState<
    DropdownSelectOption<MusicKey>
  >({
    label: musicKeys[currentKey as MusicKey],
    value: currentKey as MusicKey,
  });

  return (
    <DropdownSelectMenu
      labelText={"Key"}
      options={dropdownOptions}
      defaultOption={defaultOption}
      appStateSetter={changeCurrentKey}
    />
  );
};

export default MusicKeySelect;
