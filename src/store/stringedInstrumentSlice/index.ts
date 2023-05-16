import { createSlice, Slice } from "@reduxjs/toolkit";
import {
  _setInstrumentDimensions,
  _setInstrumentType,
  _setTuning,
  _setMarkedNotes,
  _setFretRange,
} from "./actions";
import {
  INITIAL_INSTRUMENT,
  INITIAL_NECK,
  INITIAL_TUNING_NAME,
} from "common/constants/stringedInstruments";
import { StringedInstrumentState } from "ts/stringedInstrument";

export const initialState: StringedInstrumentState = {
  instrumentName: INITIAL_INSTRUMENT,
  tuningName: INITIAL_TUNING_NAME,
  neck: INITIAL_NECK,
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

export const InstrumentSlice: Slice<StringedInstrumentState> = createSlice({
  name: "instrument",
  initialState,
  reducers: {
    setInstrumentDimensions: _setInstrumentDimensions,
    setInstrumentType: _setInstrumentType,
    setTuning: _setTuning,
    setMarkedNotes: _setMarkedNotes,
    setFretRange: _setFretRange,
  },
  extraReducers: (builder) => {},
});

export const {
  setInstrumentDimensions,
  setInstrumentType,
  setTuning,
  setMarkedNotes,
  setFretRange,
} = InstrumentSlice.actions;
export default InstrumentSlice.reducer;
