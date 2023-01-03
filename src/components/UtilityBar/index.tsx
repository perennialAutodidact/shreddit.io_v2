import React from "react";
import MusicKeySelect from "components/UtilityBar/MusicKeySelect";
import MusicScaleSelect from "components/UtilityBar/MusicScaleSelect";
import SettingsMenuToggle from "components/UtilityBar/SettingsMenuToggle";
import SettingsMenu from "common/components/SettingsMenu";

const UtilityBar = () => {
  return (
    <div className="container-fluid" data-test-id="UtilityBar">
      <SettingsMenu />
      <div className="row my-3 d-flex">
        <div className="col-2 col-lg-1 d-flex align-items-end">
          <SettingsMenuToggle />
        </div>
        <div className="col-5 col-lg-2 offset-lg-4 position-relative">
          <MusicKeySelect />
        </div>
        <div className="col-9 col-lg-5">
          <MusicScaleSelect />
        </div>
      </div>
    </div>
  );
};

export default UtilityBar;
