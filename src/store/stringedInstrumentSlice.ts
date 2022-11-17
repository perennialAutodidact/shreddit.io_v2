import {
  createSlice,
  CaseReducer,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import { NoteName, ScaleName } from "ts/musicTheory";
import {
  StringedInstrumentDimensions,
  StringedInstrumentState,
} from "ts/stringedInstrument";
import { tunings } from "common/constants/stringedInstruments";
const teoria = require("teoria");

const INITIAL_SCALE: ScaleName = "ionian";
export const initialState: StringedInstrumentState = {
  instrumentType: "guitar",
  tuningName: "standard",
  strings: tunings["guitar"]["standard"],
  currentKey: "c1",
  totalFrets: 6,
  scale: {
    name: INITIAL_SCALE,
    intervals: teoria.note("c").scale(INITIAL_SCALE).scale,
    notes: teoria.note("c").scale(INITIAL_SCALE).simple(),
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
