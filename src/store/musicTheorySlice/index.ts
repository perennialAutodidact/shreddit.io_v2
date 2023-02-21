import { createSlice, Slice } from "@reduxjs/toolkit";
import { MusicTheoryState, ScaleName } from "ts/musicTheory";
import { Note } from "ts/musicTheory";
import { getScaleData } from "common/utils/getScaleData";
import { _setCurrentKey, _setScale } from "./actions";

const INITIAL_SCALE: ScaleName = "flamenco";
const INITIAL_KEY: Note = "c1";

export const initialState: MusicTheoryState = {
  currentKey: INITIAL_KEY,
  scale: getScaleData(INITIAL_KEY, INITIAL_SCALE),
};

export const MusicTheorySlice: Slice<MusicTheoryState> = createSlice({
  name: "musicTheory",
  initialState,
  reducers: {
    setCurrentKey: _setCurrentKey,
    setScale: _setScale,
  },
  extraReducers: (builder) => {},
});

export const { setCurrentKey, setScale } = MusicTheorySlice.actions;
export default MusicTheorySlice.reducer;
