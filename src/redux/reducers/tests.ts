import {TestEntity} from "../../data/TestEntity";
import dataStore from "../../api/dataStore";

const initState: TestEntity[] = dataStore.getTests();

const tests = (state: TestEntity[] = initState, action: any): TestEntity[] => {
    switch (action.type) {
        default: return state;
    }
};

export default tests;