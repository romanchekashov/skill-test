import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import cardsReducer from "./slices/cardsSlice";
import decksReducer from "./slices/decksSlice";
import usersReducer from "./users/usersSlice";
import langsReducer from "./langs/langsSlice";

const rootReducer = combineReducers({
  decks: decksReducer,
  users: usersReducer,
  cards: cardsReducer,
  langs: langsReducer,
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
