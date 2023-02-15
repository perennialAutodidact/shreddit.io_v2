import React from "react";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { FretNumber, StringedInstrumentState } from "ts/stringedInstrument";
import MusicKeySelect from "components/UtilityBar/MusicKeySelect";
import MusicScaleSelect from "components/UtilityBar/MusicScaleSelect";
import SettingsMenuToggle from "components/UtilityBar/SettingsMenuToggle";
import SettingsMenu from "common/components/SettingsMenu";
import MultiRangeSlider from "components/MultiRangeSlider";
import { setFretRange } from "store/stringedInstrumentSlice";
import { HandleChange } from "components/MultiRangeSlider";

const UtilityBar = () => {
  const appDispatch = useAppDispatch();
  const { startFret, endFret } = useAppSelector(
    (appState) => appState.instrument
  );

  const handleChange: HandleChange = ({ min, max }) => {
    console.log({ min, max });
    appDispatch(setFretRange({ startFret: min, endFret: max }));
  };

  return (
    <div className="container-fluid" data-test-id="UtilityBar">
      <SettingsMenu />
      <div className="row my-3 d-flex">
        <div className="col-2 col-lg-1 d-flex align-items-end">
          <SettingsMenuToggle />
        </div>
        <div className="col-5 col-lg-2 offset-lg-2 position-relative">
          <MusicKeySelect />
        </div>
        <div className="col-9 col-lg-5">
          <MusicScaleSelect />
        </div>
        <div className="col-16 col-lg-5">
          <MultiRangeSlider
            min={0}
            minVal={startFret}
            max={21}
            maxVal={endFret}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
