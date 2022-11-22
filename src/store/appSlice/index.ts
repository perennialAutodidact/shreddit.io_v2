import { createSlice, CaseReducer, Slice } from "@reduxjs/toolkit";
import { AppState } from "ts/app";
import { _toggleShowSettingsMenu } from "./actions";

export const initialState: AppState = {
  showSettingsMenu: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: { toggleShowSettingsMenu: _toggleShowSettingsMenu },
  extraReducers: (builder) => {},
});

export const { toggleShowSettingsMenu } = appSlice.actions;
export default appSlice.reducer;
