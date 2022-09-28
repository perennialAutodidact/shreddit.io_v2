import { createSlice } from "@reduxjs/toolkit";
import { StringedInstrumentState } from "ts/stringedInstrument";

export const initialState: StringedInstrumentState = {
  instrumentType: "guitar",
};

export const BarterSlice = createSlice({
  name: "stringedInstrument",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default BarterSlice.reducer;
