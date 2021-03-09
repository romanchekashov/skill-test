import dataStore from "../../api/dataStore";
import {all, fork, put, takeEvery, delay} from "redux-saga/effects";
import {LOAD_TEST_BY_ID, LoadTestByIdAction, loadTestByIdSuccess} from "../actions/CurrentTestActions";

export function* loadTestById({testId}: LoadTestByIdAction) {
    yield delay(500);
    yield put(loadTestByIdSuccess(dataStore.getTest(testId)));
}

function* watchLoadTestById() {
    yield takeEvery(LOAD_TEST_BY_ID, loadTestById)
}

export default function* rootSaga() {
    yield all([fork(watchLoadTestById)])
}