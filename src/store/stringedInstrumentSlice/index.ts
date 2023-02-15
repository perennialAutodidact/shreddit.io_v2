import { createSlice, Slice } from "@reduxjs/toolkit";
import {
  _setInstrumentDimensions,
  _setInstrumentType,
  _setTuning,
  _setMarkedNotes,
  _setFretRange,
} from "./actions";
import {
  TuningName,
  StringedInstrumentName,
  StringedInstrumentState,
} from "ts/stringedInstrument";
import { tunings } from "common/constants/stringedInstruments";

const INITIAL_INSTRUMENT: StringedInstrumentName = "guitar";
const INITIAL_TUNING: TuningName = "standard";

export const initialState: StringedInstrumentState = {
  instrumentType: INITIAL_INSTRUMENT,
  tuningName: INITIAL_TUNING,
  strings: tunings[INITIAL_INSTRUMENT][INITIAL_TUNING],
  startFret: 0,
  endFret: 12,
  totalFrets: 11,
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
