import React from "react";
import MusicKeySelect from "components/UtilityBar/MusicKeySelect";
import MusicScaleSelect from "components/UtilityBar/MusicScaleSelect";
import SettingsMenuToggle from "components/UtilityBar/SettingsMenuToggle";
import SettingsMenu from "pages/SettingsMenu";

const UtilityBar = () => {
  return (
    <div className="container-fluid" data-testid="UtilityBar">
      <SettingsMenu />
      <div className="row my-3 d-flex">
        <div className="col-4 col-lg-3 position-relative order-lg-2">
          <MusicKeySelect />
        </div>
        <div className="col-8 col-lg-5 order-lg-3">
          <MusicScaleSelect />
        </div>
        <div className="col-2 order-lg-1 d-flex align-items-end">
          <SettingsMenuToggle />
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
