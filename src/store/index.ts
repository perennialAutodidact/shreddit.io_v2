import { configureStore } from "@reduxjs/toolkit";
import instrumentReducer, {
  initialState as initialInstrumentState,
} from "./stringedInstrumentSlice";
import appReducer, { initialState as initialAppState } from "./appSlice";
import audioClientReducer, {
  initialState as initialAudioClientState,
} from "store/audioClientSlice";

export const initialState = {
  app: initialAppState,
  instrument: initialInstrumentState,
  audioClient: initialAudioClientState,
};

export const reducer = {
  app: appReducer,
  instrument: instrumentReducer,
  audioClient: audioClientReducer,
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
