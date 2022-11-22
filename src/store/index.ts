import { configureStore } from "@reduxjs/toolkit";
import instrumentReducer, {
  initialState as initialInstrumentState,
} from "./stringedInstrumentSlice";
import appReducer, { initialState as initialAppState } from "./appSlice";

export const initialState = {
  app: initialAppState,
  instrument: initialInstrumentState,
};

export const reducer = {
  app: appReducer,
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
