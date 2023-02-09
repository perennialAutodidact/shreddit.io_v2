import React, { useRef, useState, useEffect, useCallback } from "react";
import { FretNumber } from "ts/stringedInstrument";
import Slider from "./Slider";
import styles from "./MultiRangeSlider.module.scss";

type MultiRangeSliderProps<T> = {
  min: T;
  max: T;
  handleChange: (values: { min: FretNumber; max: FretNumber }) => void;
};

const MultiRangeSlider: React.FC<MultiRangeSliderProps<FretNumber>> = ({
  min,
  max,
  handleChange,
}: MultiRangeSliderProps<FretNumber>) => {
  const [minVal, setMinVal] = useState<FretNumber>(0);
  const [maxVal, setMaxVal] = useState<FretNumber>(6);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: FretNumber) => Math.round(((value - min) / max - min) * 100),
    [min, max]
  );

  useEffect(() => {}, []);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value as FretNumber);
      const maxPercent = getPercent(maxVal);

      if (sliderRef.current) {
        sliderRef.current.style.left = `${minPercent}%`;
        sliderRef.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value as FretNumber);

      if (sliderRef.current) {
        sliderRef.current.style.left = `${minPercent}%`;
        sliderRef.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    console.log("value changed");
    handleChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, handleChange]);

  return (
    <div
      className={`${styles.container} d-flex flex-column justify-content-center position-relative`}
    >
      <div className={`fw-bold`}>Fret Range</div>
      <div
        className={`${styles.sliderContainer}
         d-flex position-relative w-100 border-danger border-3
      `}
      >
        <input
          type="range"
          data-test-id="MultiSliderThumbLeft"
          min={min}
          max={max}
          value={minVal}
          ref={minValRef}
          onChange={(e) => setMinVal(+e.target.value as FretNumber)}
          className={`${styles.thumb} ${styles.thumbIndex4}`}
        />
        <input
          type="range"
          data-test-id="MultiSliderThumbRight"
          min={min}
          max={max}
          value={maxVal}
          ref={maxValRef}
          onChange={(e) => setMaxVal(+e.target.value as FretNumber)}
          className={`${styles.thumb} ${styles.thumbIndex5}`}
        />
        <Slider ref={sliderRef} minVal={minVal} maxVal={maxVal} />
      </div>
    </div>
  );
};

export default MultiRangeSlider;
