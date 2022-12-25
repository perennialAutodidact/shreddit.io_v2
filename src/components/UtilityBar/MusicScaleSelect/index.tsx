import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { SCALES_WITH_LABELS } from "common/constants/musicTheory";
import { setScale } from "store/musicTheorySlice";
import DropdownSelectMenu, {
  DropdownSelectOption,
} from "common/components/DropdownSelectMenu";
import { ScaleName } from "ts/musicTheory";

const dropdownOptions: DropdownSelectOption<ScaleName>[] = SCALES_WITH_LABELS;

const MusicScaleSelect = () => {
  const appDispatch = useAppDispatch();
  const { scale } = useAppSelector((appState) => appState.musicTheory);

  const changeScale = useCallback(
    (scaleName: ScaleName): void => {
      appDispatch(setScale(scaleName));
    },
    [appDispatch]
  );

  const [defaultOption, setDefaultOption] = useState<
    DropdownSelectOption<ScaleName>
  >(
    dropdownOptions.find((option) => option.value === scale.name) ||
      dropdownOptions[0]
  );

  return (
    <DropdownSelectMenu
      labelText={"Scale"}
      options={dropdownOptions}
      defaultOption={defaultOption}
      appStateSetter={changeScale}
    />
  );
};

export default MusicScaleSelect;
