import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  StringedInstrumentState,
  StringedInstrumentDimensions,
  StringedInstrumentName,
  TuningName,
} from "ts/stringedInstrument";
import { NoteName, ScaleName, Note, MusicKeys } from "ts/musicTheory";
import { getScaleData } from "common/utils/getScaleData";
import { tunings } from "common/constants/stringedInstruments";
import { getTuning } from "common/utils/getTuning";

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

export const _setInstrumentType: CaseReducer<
  StringedInstrumentState,
  PayloadAction<StringedInstrumentName>
> = (state, action) => ({
  ...state,
  instrumentType: action.payload,
  tuningName: "standard",
  strings: getTuning(action.payload, "standard"),
});

export const _setTuning: CaseReducer<
  StringedInstrumentState,
  PayloadAction<TuningName>
> = (state, action) => ({
  ...state,
  tuningName: action.payload,
  strings: getTuning(state.instrumentType, action.payload),
});
