import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { setInstrumentType, setTuning } from "store/stringedInstrumentSlice";
import { BsXLg } from "react-icons/bs";
import { ALL_INSTRUMENTS, tunings } from "common/constants/stringedInstruments";
import styles from "./SettingsMenu.module.scss";
import { toggleShowSettingsMenu, setShowSettingsMenu } from "store/appSlice";
import { titleize } from "common/utils/titleize";
import { useOnClickOutside } from "common/hooks/useOnClickOutside";
import { useOnKeyUp } from "common/hooks/useOnKeyUp";

const SettingsMenu = () => {
  const appDispatch = useAppDispatch();
  const { instrumentType, tuningName } = useAppSelector(
    (appState) => appState.instrument
  );
  const { showSettingsMenu } = useAppSelector((appState) => appState.app);
  const menuRef = useRef<HTMLDivElement>(null);

  useOnClickOutside([menuRef], (e) => {
    appDispatch(toggleShowSettingsMenu());
  });

  const handleKeyUp = () => {
    if (showSettingsMenu) {
      appDispatch(setShowSettingsMenu(false));
    }
  };

  useOnKeyUp("Escape", handleKeyUp);
  useEffect(() => {
    if (showSettingsMenu) {
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [showSettingsMenu]);
  if (!showSettingsMenu) return <></>;

  return (
    <div
      data-test-id="SettingsMenu"
      className={`
        ${styles.settingsMenuContainer}
        container-fluid
        p-0
        bg-dark
        min-vh-100 max-vw-100
        position-absolute top-0 start-0
        bg-opacity-75
      `}
    >
      <div
        className={`
          container-fluid
          bg-light
          position-absolute top-0 end-0
          min-vh-100 vw-100 vw-lg-33
        `}
        ref={menuRef}
      >
        <div
          className={`row mt-3 fs-1 fs-lg-5`}
          onClick={() => appDispatch(toggleShowSettingsMenu())}
          data-test-id="SettingsMenuCloseButton"
        >
          <div className="col-14 d-flex align-items-center">
            <h1 className="text-start m-0">Settings</h1>
          </div>
          <div className={`${styles.xIcon} col-2 d-flex align-items-center`}>
            <BsXLg />
          </div>
        </div>
        <div className="row gy-5 mt-3">
          <div className="col-8">
            <h4 className="text-start">Instrument</h4>
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
          <div className="col-8">
            <h4 className="text-start">Tuning</h4>
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
