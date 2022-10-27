import { createSlice } from "@reduxjs/toolkit";
import { StringedInstrumentState } from "ts/stringedInstrument";
const teoria = require("teoria");

export const initialState: StringedInstrumentState = {
  instrumentType: "guitar",
  tuning: "standard",
  currentKey: "c",
  scale: {
    name: "chromatic",
    intervals: teoria.note("c").scale("chromatic").scale,
    notes: teoria.note("c").scale("chromatic").simple(),
  },
};

export const InstrumentSlice = createSlice({
  name: "instrument",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default InstrumentSlice.reducer;
