import { createSlice, Slice } from "@reduxjs/toolkit";
import { AudioClientState } from "ts/AudioClient";
import { ScaleName } from "ts/musicTheory";
import { Note } from "ts/musicTheory";
import { getScaleData } from "common/utils/getScaleData";
import { _setCurrentKey, _setMarkedNotes, _setScale } from "./actions";

const INITIAL_SCALE: ScaleName = "flamenco";
const INITIAL_KEY: Note = "c1";

export const initialState: AudioClientState = {
  currentKey: INITIAL_KEY,
  scale: getScaleData(INITIAL_KEY, INITIAL_SCALE),
  audioData: {
    rhythmDurations: [],
    pitchesToPlay: [],
  },
};

export const AudioClientSlice: Slice<AudioClientState> = createSlice({
  name: "audioClient",
  initialState,
  reducers: {
    setMarkedNotes: _setMarkedNotes,
    setCurrentKey: _setCurrentKey,
    setScale: _setScale,
  },
  extraReducers: (builder) => {},
});

export const {
  setMarkedNotes: setMarkedNotes,
  setCurrentKey: setCurrentKey,
  setScale: setScale,
} = AudioClientSlice.actions;
export default AudioClientSlice.reducer;
