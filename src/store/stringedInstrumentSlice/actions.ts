import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  StringedInstrumentState,
  StringedInstrumentDimensions,
} from "ts/stringedInstrument";
import { NoteName, ScaleName, Note, MusicKeys } from "ts/musicTheory";
import { getScaleData } from "common/utils/getScaleData";
const teoria = require("teoria");

export const _setInstrumentDimensions: CaseReducer<
  StringedInstrumentState,
  PayloadAction<Partial<StringedInstrumentDimensions>>
> = (state, action) => ({
  ...state,
  dimensions: {
    ...state.dimensions,
    ...action.payload,
  },
});

export const _setMarkedNotes: CaseReducer<
  StringedInstrumentState,
  PayloadAction<NoteName[]>
> = (state, action) => ({
  ...state,
  markedNotes: action.payload,
});

export const _setScale: CaseReducer<
  StringedInstrumentState,
  PayloadAction<ScaleName>
> = (state, action) => ({
  ...state,
  scale: getScaleData(state.currentKey, action.payload),
});

export const _setCurrentKey: CaseReducer<
  StringedInstrumentState,
  PayloadAction<keyof MusicKeys>
> = (state, action) => ({
  ...state,
  currentKey: `${action.payload}`,
  scale: getScaleData(action.payload, state.scale.name),
});
