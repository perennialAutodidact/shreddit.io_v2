import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { AudioClientState } from "ts/AudioClient";
import { NoteName, ScaleName, MusicKeys } from "ts/musicTheory";
import { getScaleData } from "common/utils/getScaleData";
import AudioClient from "common/services/AudioClient";

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
