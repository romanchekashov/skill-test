import { combineReducers, configureStore } from "@reduxjs/toolkit";

import clockReducer from "./lib/slices/clockSlice";
import counterReducer from "./lib/slices/counterSlice";
import notesReducer from "./lib/slices/notesSlice";
import decksReducer from "./lib/slices/decksSlice";
import usersReducer from "./lib/slices/usersSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  clock: clockReducer,
  notes: notesReducer,
  decks: decksReducer,
  users: usersReducer,
});

export type CoreState = ReturnType<typeof rootReducer>;

export default configureStore({
  reducer: rootReducer,
  devTools: true,
});
