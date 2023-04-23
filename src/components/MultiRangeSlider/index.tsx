import React, { useRef, useState, useEffect, useCallback } from "react";
import { FretNumber } from "ts/stringedInstrument";
import Slider from "./Slider";
import styles from "./MultiRangeSlider.module.scss";

export type HandleChange = <U, V>({ min, max }: { min: U; max: V }) => void;

type MultiRangeSliderProps<T> = {
  min: T;
  minVal: T;
  max: T;
  maxVal: T;
  handleChange: HandleChange;
};

const MultiRangeSlider: React.FC<MultiRangeSliderProps<FretNumber>> = ({
  min,
  minVal,
  max,
  maxVal,
  handleChange,
}: MultiRangeSliderProps<FretNumber>) => {
  const [_minVal, setMinVal] = useState<FretNumber>(minVal);
  const [_maxVal, setMaxVal] = useState<FretNumber>(maxVal);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: FretNumber) => Math.round(((value - min) / max - min) * 100),
    [min, max]
  );

  const preChange = (minOrMax: "min" | "max", value: number): void => {
    if (minOrMax === "min" && value <= _maxVal - 6) {
      setMinVal(value as FretNumber);
    } else if (minOrMax === "max" && value >= _minVal + 6) {
      setMaxVal(value as FretNumber);
    }
  };

  useEffect(() => {
    handleChange({ min: _minVal, max: _maxVal });
  }, [_minVal, _maxVal, handleChange]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value as FretNumber);
      const maxPercent = getPercent(_maxVal);

      if (sliderRef.current) {
        sliderRef.current.style.left = `${minPercent}%`;
        sliderRef.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [_minVal, _maxVal, getPercent]);

  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(_minVal);
      const maxPercent = getPercent(+maxValRef.current.value as FretNumber);

      if (sliderRef.current) {
        sliderRef.current.style.left = `${minPercent}%`;
        sliderRef.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [_minVal, _maxVal, getPercent]);

  return (
    <div
      className={`
        ${styles.container}
        d-flex flex-column 
        justify-content-center
        position-relative
      `}
    >
      <div
        className={`${styles.sliderContainer}
         d-flex position-relative w-100
      `}
      >
        <input
          type="range"
          data-test-id="MultiSliderThumbLeft"
          min={min}
          max={max}
          value={_minVal}
          ref={minValRef}
          onChange={(e) => preChange("min", +e.target.value as FretNumber)}
          className={`${styles.thumb} ${styles.thumbIndex4}`}
        />
        <input
          type="range"
          data-test-id="MultiSliderThumbRight"
          min={min}
          max={max}
          value={_maxVal}
          ref={maxValRef}
          onChange={(e) => preChange("max", +e.target.value as FretNumber)}
          className={`${styles.thumb} ${styles.thumbIndex5}`}
        />
        <Slider ref={sliderRef} minVal={_minVal} maxVal={_maxVal} />
      </div>
    </div>
  );
};

export default MultiRangeSlider;
