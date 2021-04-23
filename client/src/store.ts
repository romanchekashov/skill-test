import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";

import clockReducer from "./lib/slices/clockSlice";
import counterReducer from "./lib/slices/counterSlice";
import notesReducer from "./lib/slices/notesSlice";
import decksReducer from "./lib/slices/decksSlice";
import usersReducer from "./lib/slices/usersSlice";
import cardsReducer from "./lib/slices/cardsSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  clock: clockReducer,
  notes: notesReducer,
  decks: decksReducer,
  users: usersReducer,
  cards: cardsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type CoreState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  CoreState,
  unknown,
  Action<string>
>;

export default store;
