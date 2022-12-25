import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  StringedInstrumentState,
  StringedInstrumentDimensions,
  StringedInstrumentName,
  TuningName,
} from "ts/stringedInstrument";
import { NoteName } from "ts/musicTheory";
import { getTuning } from "common/utils/getTuning";

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

export const _setMarkedNotes: CaseReducer<
  StringedInstrumentState,
  PayloadAction<NoteName[]>
> = (state, action) => ({
  ...state,
  markedNotes: action.payload,
});
