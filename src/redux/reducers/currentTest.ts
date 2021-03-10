import {TestEntity} from "../../data/TestEntity";
import {CurrentTestActionTypes, LOAD_TEST_BY_ID, LOAD_TEST_BY_ID_SUCCESS} from "../actions/CurrentTestActions";
import {UserTestResultEntity} from "../../data/UserTestResultEntity";

export interface CurrentTestState {
    test: TestEntity | null
    testResult: UserTestResultEntity | null
    loading: boolean
    error: string
}

let initState: CurrentTestState = {
    test: null,
    testResult: null,
    loading: false,
    error: ""
};

const currentTest = (state: CurrentTestState = initState, action: CurrentTestActionTypes): CurrentTestState => {
    switch (action.type) {
        case LOAD_TEST_BY_ID:
            return {
                ...state, test: null, loading: true, error: ""
            };
        case LOAD_TEST_BY_ID_SUCCESS:
            return {
                ...state, test: action.test, loading: false, error: ""
            };
        default:
            return state;
    }
};

export default currentTest;