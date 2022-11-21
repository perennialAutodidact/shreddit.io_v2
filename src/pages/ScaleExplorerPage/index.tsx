import React from "react";
import StringedInstrument from "components/StringedInstrument";
import MusicKeySelect from "components/MusicKeySelect";
import MusicScaleSelect from "components/MusicScaleSelect";

const ScaleExplorerPage = () => {
  return (
    <div className="container position-relative">
      <div className="row">
        <div className="col-3 offset-2 position-relative">
          <MusicKeySelect />
        </div>
        <div className="col-5 ">
          <MusicScaleSelect />
        </div>
      </div>
      <StringedInstrument />
    </div>
  );
};

export default ScaleExplorerPage;
