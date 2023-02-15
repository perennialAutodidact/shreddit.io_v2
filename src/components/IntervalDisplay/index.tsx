import React from "react";
import { useAppSelector } from "store/hooks";

type IntervalDisplayProps = {
  markerSize: number;
};

const IntervalDisplay = ({ markerSize }: IntervalDisplayProps) => {
  const { scale } = useAppSelector((appState) => appState.musicTheory);

  return (
    <div className={`container`} data-test-id="IntervalDisplay">
      <div className="row">
        <div
          className="
            col-14 offset-1 
            col-lg-6 offset-lg-5
            d-flex justify-content-between"
        >
          {scale.intervals.map((interval, index) => (
            <div
              className="d-flex flex-column align-items-center"
              key={interval}
            >
              <div
                className={`bg-${interval} border border-2 border-dark rounded-circle`}
                style={{ height: `${markerSize}px`, width: `${markerSize}px` }}
                data-test-id={`IntervalDisplayMarker-${interval}`}
              ></div>
              <div>{interval}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntervalDisplay;
