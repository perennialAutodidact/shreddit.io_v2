import { configureStore } from "@reduxjs/toolkit";
import instrumentReducer, {
  initialState as initialInstrumentState,
} from "./stringedInstrumentSlice";

export const initialState = {
  instrument: initialInstrumentState,
};

export const reducer = {
  instrument: instrumentReducer,
};

export const store = configureStore({
  reducer: reducer,
  preloadedState: initialState,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
