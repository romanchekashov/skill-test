import {combineReducers} from "redux";
import tests from "./tests";
import currentTest from "./currentTest";

const rootReducer = combineReducers({
    tests,
    currentTest
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;