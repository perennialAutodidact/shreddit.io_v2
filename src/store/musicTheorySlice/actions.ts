import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { getScaleData } from "common/utils/getScaleData";
import { MusicTheoryState } from "ts/musicTheory";
import { ScaleName, MusicKeys } from "ts/musicTheory";

export const _setScale: CaseReducer<
  MusicTheoryState,
  PayloadAction<ScaleName>
> = (state, action) => ({
  ...state,
  scale: getScaleData(state.currentKey as keyof MusicKeys, action.payload),
});

export const _setCurrentKey: CaseReducer<
  MusicTheoryState,
  PayloadAction<keyof MusicKeys>
> = (state, action) => ({
  ...state,
  currentKey: `${action.payload}`,
  scale: getScaleData(action.payload, state.scale.name),
});
