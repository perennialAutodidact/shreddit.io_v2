import MusicKeySelect from "components/UtilityBar/MusicKeySelect";
import MusicScaleSelect from "components/UtilityBar/MusicScaleSelect";
import MultiRangeSlider from "components/MultiRangeSlider";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { setFretRange } from "store/stringedInstrumentSlice";
import { HandleChange } from "components/MultiRangeSlider";

const UtilityBar = () => {
  const appDispatch = useAppDispatch();
  const { fretStart, fretEnd } = useAppSelector(
    (appState) => appState.instrument
  );

  const handleChange: HandleChange = ({ min, max }) => {
    appDispatch(setFretRange({ fretStart: min, fretEnd: max }));
  };

  return (
    <div className="container-fluid" data-test-id="UtilityBar">
      <div
        className="
          row 
          d-flex 
          justify-content-center
          align-items-start
          justify-content-xl-start
          my-3
        "
      >
        <div className="col-5 col-xl-3 offset-xl-4 mb-3">
          <MusicKeySelect />
        </div>
        <div className="col-8 col-xl-5 mb-3">
          <MusicScaleSelect />
        </div>
        <div className="col-14 col-lg-8 offset-xl-4">
          <div className={`fw-bold mb-3`}>Fret Range</div>
          <MultiRangeSlider
            min={0}
            minVal={fretStart}
            max={21}
            maxVal={fretEnd}
            handleChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
