import { createSlice, Slice } from "@reduxjs/toolkit";
import { AudioClientState } from "ts/AudioClient";
import { ScaleName } from "ts/musicTheory";
import { Note } from "ts/musicTheory";
import { getScaleData } from "common/utils/getScaleData";
import { _setAudioData, _setActivePitch } from "./actions";

export const initialState: AudioClientState = {
  audioData: {
    rhythmDurations: [],
    pitchesToPlay: [],
  },
  activePitch: null,
};

export const AudioClientSlice: Slice<AudioClientState> = createSlice({
  name: "audioClient",
  initialState,
  reducers: {
    setAudioData: _setAudioData,
    setActivePitch: _setActivePitch,
  },
  extraReducers: (builder) => {},
});

export const { setAudioData, setActivePitch } = AudioClientSlice.actions;
export default AudioClientSlice.reducer;
