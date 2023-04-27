import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "ts/app";
import {
  _setShowSettingsMenu,
  _toggleIsPlayingAudio,
  _toggleShowSettingsMenu,
} from "./actions";

export const initialState: AppState = {
  currentInstrument: "guitar-acoustic",
  isPlayingAudio: false,
  showSettingsMenu: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleShowSettingsMenu: _toggleShowSettingsMenu,
    setShowSettingsMenu: _setShowSettingsMenu,
    toggleIsPlayingAudio: _toggleIsPlayingAudio,
  },
  extraReducers: (builder) => {},
});

export const {
  toggleShowSettingsMenu,
  setShowSettingsMenu,
  toggleIsPlayingAudio,
} = appSlice.actions;
export default appSlice.reducer;
