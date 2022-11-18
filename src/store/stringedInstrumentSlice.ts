import {
  createSlice,
  CaseReducer,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import { NoteName, ScaleName } from "ts/musicTheory";
import {
  GuitarTuningNames,
  StringedInstrumentDimensions,
  StringedInstrumentName,
  StringedInstrumentState,
} from "ts/stringedInstrument";
import { Note } from "ts/musicTheory";
import { tunings } from "common/constants/stringedInstruments";
const teoria = require("teoria");

const INITIAL_SCALE: ScaleName = "flamenco";
const INITIAL_INSTRUMENT: StringedInstrumentName = "mandolin";
const INITIAL_TUNING: GuitarTuningNames = "standard";
const INITIAL_KEY: Note = "c1";
export const initialState: StringedInstrumentState = {
  instrumentType: INITIAL_INSTRUMENT,
  tuningName: INITIAL_TUNING,
  strings: tunings[INITIAL_INSTRUMENT][INITIAL_TUNING],
  currentKey: INITIAL_KEY,
  totalFrets: 12,
  scale: {
    name: INITIAL_SCALE,
    intervals: teoria.note(INITIAL_KEY).scale(INITIAL_SCALE).scale,
    notes: teoria.note(INITIAL_KEY).scale(INITIAL_SCALE).simple(),
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

export const InstrumentSlice: Slice<StringedInstrumentState> = createSlice({
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
