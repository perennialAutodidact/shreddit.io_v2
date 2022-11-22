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
        <div className="col-2 col-lg-1 d-flex align-items-end">
          <SettingsMenuToggle />
        </div>
        <div className="col-3 col-lg-3 offset-lg-2 position-relative">
          <MusicKeySelect />
        </div>
        <div className="col-7 col-lg-5">
          <MusicScaleSelect />
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
