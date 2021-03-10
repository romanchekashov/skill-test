import {combineReducers} from "redux";
import tests from "./tests";
import currentTest from "./currentTest";
import user from "./user";

const rootReducer = combineReducers({
    tests,
    currentTest,
    user
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;