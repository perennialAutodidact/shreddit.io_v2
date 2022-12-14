import React from "react";
import { useAppDispatch } from "store/hooks";
import { toggleShowSettingsMenu } from "store/appSlice";
import { BsFillGearFill } from "react-icons/bs";
import styles from "./SettingsMenuToggle.module.scss";

const SettingsMenuToggle = () => {
  const appDispatch = useAppDispatch();

  return (
    <div
      className={`
        ${styles.settingsMenuToggle}
        fs-1
        d-flex align-items-center 
      `}
      data-test-id="SettingsMenuToggle"
      onClick={() => appDispatch(toggleShowSettingsMenu())}
    >
      <BsFillGearFill />
    </div>
  );
};

export default SettingsMenuToggle;
