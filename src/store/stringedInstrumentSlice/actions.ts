import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  StringedInstrumentState,
  StringedInstrumentDimensions,
  StringedInstrumentName,
  TuningName,
  FretStart,
  FretEnd,
  FretTotal,
  Tunings,
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
  PayloadAction<TuningName<keyof Tunings>>
> = (state, action) => ({
  ...state,
  tuningName: action.payload as TuningName<typeof state.instrumentType>,
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
    fretStart: FretStart;
    fretEnd: FretEnd;
  }>
> = (state, action) => {
  const { fretStart, fretEnd } = action.payload;
  const fretTotal = (fretEnd - fretStart - 1) as FretTotal;

  return {
    ...state,
    ...action.payload,
    fretTotal,
  };
};
