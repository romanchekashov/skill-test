import dataStore from "../../api/dataStore";
import {all, call, delay, fork, put, takeEvery} from "redux-saga/effects";
import {LOAD_TEST_BY_ID, LoadTestByIdAction, loadTestByIdSuccess} from "../actions/CurrentTestActions";
import {USER_LOG_OUT} from "../actions/UserActions";
import {logout} from "../../api/openApi";

export function* loadTestById({testId}: LoadTestByIdAction) {
    yield delay(500);
    yield put(loadTestByIdSuccess(dataStore.getTest(testId)));
}

function* watchLoadTestById() {
    yield takeEvery(LOAD_TEST_BY_ID, loadTestById);
}

// export function* userLogIn({username}: UserLogInAction) {
//     yield delay(500);
//     yield put(userLogInSuccess(dataStore.setUser(username)));
// }
//
// function* watchUserLogIn() {
//     yield takeEvery(USER_LOG_IN, userLogIn);
// }

/**
 * no yield because page redirected to main page
 */
// eslint-disable-next-line require-yield
export function* userLogOut() {
    try {
        yield call(logout);
        dataStore.logOut();
        document.location.href = "/";
    } catch (err) {
        console.error(err);
    }
}

function* watchUserLogOut() {
    yield takeEvery(USER_LOG_OUT, userLogOut);
}

export default function* rootSaga() {
    yield all([
        fork(watchLoadTestById),
        // fork(watchUserLogIn),
        fork(watchUserLogOut)
    ]);
}