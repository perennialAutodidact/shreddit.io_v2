import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "ts/app";
import { _toggleIsPlayingAudio, _toggleShowSettingsMenu } from "./actions";

export const initialState: AppState = {
  currentInstrument: "guitar-acoustic",
  isPlayingAudio: false,
  showSettingsMenu: false,
  versionNumbers: {
    scaleExplorer: "1.0.0-alpha",
  },
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleShowSettingsMenu: _toggleShowSettingsMenu,
    toggleIsPlayingAudio: _toggleIsPlayingAudio,
  },
  extraReducers: (builder) => {},
});

export const { toggleShowSettingsMenu, toggleIsPlayingAudio } =
  appSlice.actions;
export default appSlice.reducer;
