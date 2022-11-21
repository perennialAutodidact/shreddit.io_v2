import NoteMarker from "components/NoteMarker";
import React from "react";
import { useAppSelector } from "store/hooks";

const IntervalDisplay = () => {
  const { scale } = useAppSelector((appState) => appState.instrument);

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
            <div className="d-flex flex-column align-items-center">
              <div
                className={`bg-${interval} border border-2 border-dark rounded-circle`}
                style={{ height: "25px", width: "25px" }}
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
