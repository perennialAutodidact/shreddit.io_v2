import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
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

  const minHasChanged = useMemo<boolean>(
    () => _minVal !== minVal,
    [_minVal, minVal]
  );
  const maxHasChanged = useMemo<boolean>(
    () => _maxVal !== maxVal,
    [_maxVal, maxVal]
  );
  const sliderHasChanged = useMemo<boolean>(
    () => minHasChanged || maxHasChanged,
    [minHasChanged, maxHasChanged]
  );

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

  useEffect(() => {
    if (sliderHasChanged) {
      if (minHasChanged && _minVal > maxVal - 6) {
        setMinVal((maxVal - 6) as FretNumber);
      } else if (maxHasChanged && _maxVal < minVal + 6) {
        setMaxVal((minVal + 6) as FretNumber);
      } else {
        handleChange({ min: _minVal, max: _maxVal });
      }
    }
  }, [
    minVal,
    _minVal,
    maxVal,
    _maxVal,
    sliderHasChanged,
    minHasChanged,
    maxHasChanged,
    handleChange,
  ]);

  return (
    <div
      className={`${styles.container} d-flex flex-column justify-content-center position-relative`}
    >
      <div className={`fw-bold mb-2`}>Fret Range</div>
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
          value={_minVal}
          ref={minValRef}
          onChange={(e) => setMinVal(+e.target.value as FretNumber)}
          className={`${styles.thumb} ${styles.thumbIndex4}`}
        />
        <input
          type="range"
          data-test-id="MultiSliderThumbRight"
          min={min}
          max={max}
          value={_maxVal}
          ref={maxValRef}
          onChange={(e) => setMaxVal(+e.target.value as FretNumber)}
          className={`${styles.thumb} ${styles.thumbIndex5}`}
        />
        <Slider ref={sliderRef} minVal={_minVal} maxVal={_maxVal} />
      </div>
    </div>
  );
};

export default MultiRangeSlider;
