import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  StringedInstrumentState,
  StringedInstrumentDimensions,
  StringedInstrumentName,
  TuningName,
  FretNumber,
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

export const _setFretRange: CaseReducer<
  StringedInstrumentState,
  PayloadAction<{
    fretStart: StringedInstrumentState["fretStart"];
    fretEnd: StringedInstrumentState["fretEnd"];
  }>
> = (state, action) => {
  const { fretStart, fretEnd } = action.payload;
  const fretTotal = (fretEnd -
    fretStart -
    1) as StringedInstrumentState["fretTotal"];

  return {
    ...state,
    ...action.payload,
    fretTotal,
  };
};
