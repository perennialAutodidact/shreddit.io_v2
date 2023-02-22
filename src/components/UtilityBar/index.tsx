import MusicKeySelect from "components/UtilityBar/MusicKeySelect";
import MusicScaleSelect from "components/UtilityBar/MusicScaleSelect";
import SettingsMenu from "common/components/SettingsMenu";
import MultiRangeSlider from "components/MultiRangeSlider";
import AudioControls from "common/components/AudioControls";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { setFretRange } from "store/stringedInstrumentSlice";
import { HandleChange } from "components/MultiRangeSlider";
import { useAudioClient } from "common/hooks/useAudioClient";

const UtilityBar = () => {
  const appDispatch = useAppDispatch();
  const { startFret, endFret } = useAppSelector(
    (appState) => appState.instrument
  );
  const { audioClientLoaded, audioClient } = useAudioClient();

  const handleChange: HandleChange = ({ min, max }) => {
    appDispatch(setFretRange({ startFret: min, endFret: max }));
  };

  return (
    <div className="container-fluid mb-5 mb-lg-0" data-test-id="UtilityBar">
      <SettingsMenu />
      <div className="row my-3 d-flex justify-content-center justify-content-lg-start">
        <div className="col-4 col-lg-2 offset-lg-1 position-relative">
          <MusicKeySelect />
        </div>
        <div className="col-9 col-lg-5 mb-3 mb-lg-0">
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
        <div className="col-4">
          <AudioControls
            audioClient={audioClient}
            isLoaded={audioClientLoaded}
          />
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
