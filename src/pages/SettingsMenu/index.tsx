import React from "react";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { BsFillGearFill, BsXLg } from "react-icons/bs";
import styles from "./SettingsMenu.module.scss";
import { toggleShowSettingsMenu } from "store/appSlice";

const SettingsMenu = () => {
  const appDispatch = useAppDispatch();
  const { showSettingsMenu } = useAppSelector((appState) => appState.app);

  if (!showSettingsMenu) return <></>;

  return (
    <div
      data-testid="SettingsMenu"
      className={`
        ${styles.settingsMenu}
        container
        bg-secondary 
        vh-100 w-100 
        position-absolute top-0
      `}
    >
      <div
        className={`${styles.xIcon} position-absolute top-0 end-0 me-2 fs-1`}
        onClick={() => appDispatch(toggleShowSettingsMenu())}
      >
        <BsXLg />
      </div>
      <h1>Settings</h1>
      <div className="row">
        <div className="col-12">
          <h3>Instrument</h3>
        </div>
      </div>
      <div className="d-flex flex-column">
        <div>Scale Explorer</div>
        <div>Chord Explorer</div>
        <div>Progression Builder</div>
      </div>
    </div>
  );
};

export default SettingsMenu;
