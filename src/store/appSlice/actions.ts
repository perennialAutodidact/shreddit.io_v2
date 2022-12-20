import { CaseReducer } from "@reduxjs/toolkit";
import { AppState } from "ts/app";

export const _toggleShowSettingsMenu: CaseReducer<AppState> = (
  state,
  action
) => ({
  ...state,
  showSettingsMenu: !state.showSettingsMenu,
});

export const _toggleIsPlayingAudio: CaseReducer<AppState> = (
  state,
  action
) => ({
  ...state,
  isPlayingAudio: !state.isPlayingAudio,
});
