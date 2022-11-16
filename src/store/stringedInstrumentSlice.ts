import { createSlice, CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { NoteName } from "ts/musicTheory";
import {
  StringedInstrumentDimensions,
  StringedInstrumentState,
} from "ts/stringedInstrument";
import { tunings } from "common/constants/stringedInstruments";
const teoria = require("teoria");

export const initialState: StringedInstrumentState = {
  instrumentType: "guitar",
  tuningName: "standard",
  strings: tunings["guitar"]["standard"],
  currentKey: "c",
  totalFrets: 12,
  scale: {
    name: "chromatic",
    intervals: teoria.note("c").scale("chromatic").scale,
    notes: teoria.note("c").scale("chromatic").simple(),
  },
  markedNotes: [],
  dimensions: {
    neck: {
      height: 0,
      width: 0,
    },
    string: {
      height: 0,
      width: 0,
    },
    fret: {
      height: 0,
      width: 0,
    },
  },
};

const _setInstrumentDimensions: CaseReducer<
  StringedInstrumentState,
  PayloadAction<Partial<StringedInstrumentDimensions>>
> = (state, action) => ({
  ...state,
  dimensions: {
    ...state.dimensions,
    ...action.payload,
  },
});

const _setMarkedNotes: CaseReducer<
  StringedInstrumentState,
  PayloadAction<NoteName[]>
> = (state, action) => ({
  ...state,
  markedNotes: action.payload,
});

export const InstrumentSlice = createSlice({
  name: "instrument",
  initialState,
  reducers: {
    setInstrumentDimensions: _setInstrumentDimensions,
    setMarkedNotes: _setMarkedNotes,
  },
  extraReducers: (builder) => {},
});

export const { setInstrumentDimensions, setMarkedNotes } =
  InstrumentSlice.actions;
export default InstrumentSlice.reducer;
