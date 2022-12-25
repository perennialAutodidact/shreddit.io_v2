import { createSlice, Slice } from "@reduxjs/toolkit";
import { AudioClientState } from "ts/AudioClient";
import { ScaleName } from "ts/musicTheory";
import { Note } from "ts/musicTheory";
import { getScaleData } from "common/utils/getScaleData";
import { _setAudioData } from "./actions";

export const initialState: AudioClientState = {
  audioData: {
    rhythmDurations: [],
    pitchesToPlay: [],
  },
};

export const AudioClientSlice: Slice<AudioClientState> = createSlice({
  name: "audioClient",
  initialState,
  reducers: {
    setAudioData: _setAudioData,
  },
  extraReducers: (builder) => {},
});

export const { setAudioData } = AudioClientSlice.actions;
export default AudioClientSlice.reducer;
