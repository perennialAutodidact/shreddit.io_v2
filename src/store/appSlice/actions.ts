import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "ts/app";

export const _toggleShowSettingsMenu: CaseReducer<AppState> = (
  state,
  action
) => ({
  ...state,
  showSettingsMenu: !state.showSettingsMenu,
});

export const _setShowSettingsMenu: CaseReducer<
  AppState,
  PayloadAction<AppState["showSettingsMenu"]>
> = (state, action) => ({
  ...state,
  showSettingsMenu: action.payload,
});

export const _toggleIsPlayingAudio: CaseReducer<AppState> = (
  state,
  action
) => ({
  ...state,
  isPlayingAudio: !state.isPlayingAudio,
});
