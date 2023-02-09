import React, { useMemo } from "react";
import { FretNumber } from "ts/stringedInstrument";
import styles from "./MultiRangeSlider.module.scss";

type SliderProps = {
  minVal: FretNumber;
  maxVal: FretNumber;
};

const Slider = React.forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const { minVal, maxVal } = props;

  return (
    <div
      className={`
        ${styles.slider} 
        position-relative d-flex align-items-center
      `}
    >
      <div
        className={`${styles.sliderTrack} position-absolute bg-primary rounded`}
        ref={ref}
      ></div>
      <div className={`${styles.sliderRange} position-absolute`}></div>
      <div
        data-test-id="MultiSliderLabelLeft"
        className={`${styles.leftLabel} position-absolute`}
      >
        {minVal}
      </div>
      <div
        data-test-id="MultiSliderLabelRight"
        className={`${styles.rightLabel} position-absolute`}
      >
        {maxVal}
      </div>
    </div>
  );
});

export default Slider;
