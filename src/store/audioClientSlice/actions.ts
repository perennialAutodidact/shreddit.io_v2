import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { AudioClientState } from "ts/AudioClient";

export const _setAudioData: CaseReducer<
  AudioClientState,
  PayloadAction<Partial<AudioClientState["audioData"]>>
> = (state, action) => ({
  ...state,
  audioData: {
    ...state.audioData,
    ...action.payload,
  },
});

export const _setActivePitch: CaseReducer<
  AudioClientState,
  PayloadAction<AudioClientState["activePitch"]>
> = (state, action) => ({
  ...state,
  activePitch: action.payload,
});
