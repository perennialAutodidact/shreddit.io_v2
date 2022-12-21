import React from "react";
import { useAppSelector } from "store/hooks";

type IntervalDisplayProps = {
  markerSize: number;
};

const IntervalDisplay = ({ markerSize }: IntervalDisplayProps) => {
  const { scale } = useAppSelector((appState) => appState.audioClient);

  return (
    <div className={`container`} data-testid="IntervalDisplay">
      <div className="row">
        <div
          className="
            col-10 offset-1 
            col-lg-6 offset-lg-3 
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
                data-testid={`IntervalDisplayMarker-${interval}`}
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
