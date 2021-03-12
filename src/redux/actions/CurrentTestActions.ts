import {TestDto} from "../../dto/test/TestDto";

export const LOAD_TEST_BY_ID = "LOAD_TEST_BY_ID";
export const LOAD_TEST_BY_ID_SUCCESS = "LOAD_TEST_BY_ID_SUCCESS";
export const LOAD_TEST_BY_ID_ERROR = "LOAD_TEST_BY_ID_ERROR";


export interface LoadTestByIdAction {
    type: typeof LOAD_TEST_BY_ID
    testId: number
}

interface LoadTestByIdSuccessAction {
    type: typeof LOAD_TEST_BY_ID_SUCCESS
    test: TestDto
}

interface LoadTestByIdErrorAction {
    type: typeof LOAD_TEST_BY_ID_ERROR
    error: string
}

export type CurrentTestActionTypes =
    LoadTestByIdAction
    | LoadTestByIdSuccessAction
    | LoadTestByIdErrorAction;


export function loadTestById(testId: number): CurrentTestActionTypes {
    return {
        type: LOAD_TEST_BY_ID,
        testId
    }
}

export function loadTestByIdSuccess(test: TestDto): CurrentTestActionTypes {
    return {
        type: LOAD_TEST_BY_ID_SUCCESS,
        test
    }
}