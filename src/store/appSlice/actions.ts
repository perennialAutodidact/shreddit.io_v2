import { PayloadAction, CaseReducer } from "@reduxjs/toolkit";
import { AppState } from "ts/app";

export const _toggleShowSettingsMenu: CaseReducer<AppState> = (
  state,
  action
) => ({
  ...state,
  showSettingsMenu: !state.showSettingsMenu,
});
