import {TestDto} from "../../data/TestDto";
import dataStore from "../../api/dataStore";

const initState: TestDto[] = dataStore.getTests();

const tests = (state: TestDto[] = initState, action: any): TestDto[] => {
    switch (action.type) {
        default: return state;
    }
};

export default tests;