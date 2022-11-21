import React from "react";
import StringedInstrument from "components/StringedInstrument";
import MusicKeySelect from "components/MusicKeySelect";
import MusicScaleSelect from "components/MusicScaleSelect";

const ScaleExplorerPage = () => {
  return (
    <div className="container position-relative">
      <div className="row mt-3">
        <div className="col-4 col-lg-3 offset-lg-2 position-relative">
          <MusicKeySelect />
        </div>
        <div className="col-8 col-lg-5">
          <MusicScaleSelect />
        </div>
      </div>
      <div className="row my-3">
        <StringedInstrument />
      </div>
    </div>
  );
};

export default ScaleExplorerPage;
