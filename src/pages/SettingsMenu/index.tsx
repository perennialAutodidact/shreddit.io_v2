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
        ${styles.settingsMenuContainer}
        container-fluid
        bg-dark
        vh-100 max-vw-100
        position-absolute top-0 start-0
        bg-opacity-75
      `}
    >
      <div
        className={`
        container-fluid
        bg-light 
        position-absolute top-0 start-0
        vh-100 vw-75 vw-lg-25
      `}
      >
        <div
          className={`${styles.xIcon} position-absolute top-0 start-0 ms-2 fs-1`}
          onClick={() => appDispatch(toggleShowSettingsMenu())}
        >
          <BsXLg />
        </div>
        <h1>Settings</h1>
        <div className="row">
          <div className="col-12 col-lg-6">
            <h3>Instrument</h3>
          </div>
          <div className="col-12 col-lg-6">
            <h3>Tuning</h3>
          </div>
        </div>
        <div className="d-flex flex-column">
          <div>Scale Explorer</div>
          <div>Chord Explorer</div>
          <div>Progression Builder</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
