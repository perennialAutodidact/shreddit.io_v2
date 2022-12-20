import { createSlice, Slice } from "@reduxjs/toolkit";
import {
  _setCurrentKey,
  _setInstrumentDimensions,
  _setInstrumentType,
  _setMarkedNotes,
  _setScale,
  _setTuning,
} from "./actions";
import { ScaleName } from "ts/musicTheory";
import {
  TuningName,
  StringedInstrumentName,
  StringedInstrumentState,
} from "ts/stringedInstrument";
import { Note } from "ts/musicTheory";
import { tunings } from "common/constants/stringedInstruments";
import { getScaleData } from "common/utils/getScaleData";

const INITIAL_SCALE: ScaleName = "flamenco";
const INITIAL_INSTRUMENT: StringedInstrumentName = "guitar";
const INITIAL_TUNING: TuningName = "standard";
const INITIAL_KEY: Note = "c1";

export const initialState: StringedInstrumentState = {
  instrumentType: INITIAL_INSTRUMENT,
  tuningName: INITIAL_TUNING,
  strings: tunings[INITIAL_INSTRUMENT][INITIAL_TUNING],
  currentKey: INITIAL_KEY,
  totalFrets: 12,
  scale: getScaleData(INITIAL_KEY, INITIAL_SCALE),
  rhythmDurations: [],
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
    setMarkedNotes: _setMarkedNotes,
    setCurrentKey: _setCurrentKey,
    setTuning: _setTuning,
    setScale: _setScale,
  },
  extraReducers: (builder) => {},
});

export const {
  setInstrumentDimensions,
  setMarkedNotes,
  setScale,
  setCurrentKey,
  setInstrumentType,
  setTuning,
} = InstrumentSlice.actions;
export default InstrumentSlice.reducer;
