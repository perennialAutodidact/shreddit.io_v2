import React from "react";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { setInstrumentType, setTuning } from "store/stringedInstrumentSlice";
import { BsXLg } from "react-icons/bs";
import { ALL_INSTRUMENTS, tunings } from "common/constants/stringedInstruments";
import styles from "./SettingsMenu.module.scss";
import { toggleShowSettingsMenu } from "store/appSlice";
import { titleize } from "common/utils/titleize";

const SettingsMenu = () => {
  const appDispatch = useAppDispatch();
  const { instrumentType, tuningName } = useAppSelector(
    (appState) => appState.instrument
  );
  const { showSettingsMenu } = useAppSelector((appState) => appState.app);

  if (!showSettingsMenu) return <></>;

  return (
    <div
      data-test-id="SettingsMenu"
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
        position-absolute top-0 start-50 translate-middle-x
        vh-100 vw-100 vw-lg-50
      `}
      >
        <div
          className={`${styles.xIcon} position-absolute top-0 start-0 ms-2 fs-1`}
          onClick={() => appDispatch(toggleShowSettingsMenu())}
          data-test-id="SettingsMenuCloseButton"
        >
          <BsXLg />
        </div>
        <h1>Settings</h1>
        <div className="row gy-5">
          <div className="col-6 offset-3">
            <h3>Instrument</h3>
            <select
              className="form-select"
              onChange={(e) => appDispatch(setInstrumentType(e.target.value))}
              value={instrumentType}
            >
              {ALL_INSTRUMENTS.map((instrument) => (
                <option key={instrument} value={instrument}>
                  {titleize(instrument)}
                </option>
              ))}
            </select>
          </div>
          <div className="col-6 offset-3">
            <h3>Tuning</h3>
            <select
              className="form-select"
              value={tuningName}
              onChange={(e) => appDispatch(setTuning(e.target.value))}
            >
              {Object.keys(tunings[instrumentType]).map((tuning) => (
                <option key={tuning} value={tuning}>
                  {titleize(tuning)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="d-flex flex-column"></div>
      </div>
    </div>
  );
};

export default SettingsMenu;
