import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { AudioClientState } from "ts/AudioClient";
import { NoteName, ScaleName, MusicKeys } from "ts/musicTheory";
import { getScaleData } from "common/utils/getScaleData";

export const _setMarkedNotes: CaseReducer<
  AudioClientState,
  PayloadAction<NoteName[]>
> = (state, action) => ({
  ...state,
  markedNotes: action.payload,
});

export const _setScale: CaseReducer<
  AudioClientState,
  PayloadAction<ScaleName>
> = (state, action) => ({
  ...state,
  scale: getScaleData(state.currentKey as keyof MusicKeys, action.payload),
});

export const _setCurrentKey: CaseReducer<
  AudioClientState,
  PayloadAction<keyof MusicKeys>
> = (state, action) => ({
  ...state,
  currentKey: `${action.payload}`,
  scale: getScaleData(action.payload, state.scale.name),
});
