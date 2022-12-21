import React, { useCallback } from "react";
import { useAppDispatch } from "store/hooks";
import { SCALES_WITH_LABELS } from "common/constants/musicTheory";
import { setScale } from "store/audioClientSlice";
import DropdownSelectMenu, {
  DropdownSelectOption,
} from "common/components/DropdownSelectMenu";
import { ScaleName } from "ts/musicTheory";

const dropdownOptions: DropdownSelectOption<ScaleName>[] = SCALES_WITH_LABELS;

const MusicScaleSelect = () => {
  const appDispatch = useAppDispatch();

  const changeScale = useCallback(
    (scaleName: ScaleName): void => {
      appDispatch(setScale(scaleName));
    },
    [appDispatch]
  );

  return (
    <DropdownSelectMenu
      labelText={"Scale"}
      options={dropdownOptions}
      appStateSetter={changeScale}
    />
  );
};

export default MusicScaleSelect;
