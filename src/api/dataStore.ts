import {TestEntity} from "../data/TestEntity";

const tests: TestEntity[] = [
    {
        id: 1,
        categories: ['web'],
        name: 'CSS',
        questions: []
    }, {
        id: 2,
        categories: ['web', 'programming'],
        name: 'JavaScript es6',
        questions: []
    }, {
        id: 3,
        categories: ['web', 'programming'],
        name: 'React',
        questions: []
    }, {
        id: 4,
        categories: ['web', 'programming'],
        name: 'Redux',
        questions: []
    }, {
        id: 5,
        categories: ['web', 'programming'],
        name: 'Redux-Saga',
        questions: [
            {
                id: 1,
                question: "In order to use Saga, what we need to do?",
                possibleAnswers: [
                    "Create a middleware using the factory function createSagaMiddleware exported by the redux-saga library.",
                    "Connect Saga middleware to the Store using applyMiddleware.",
                    "Call the sagaMiddleware.run(ourSaga) to start our Saga.",
                    "All of them.",
                    "None of them."
                ],
                answers: ["All of them."]
            },
            {
                id: 2,
                question: "When to use fork?",
                possibleAnswers: [
                    "Create a middleware using the factory function createSagaMiddleware exported by the redux-saga library.",
                    "Connect Saga middleware to the Store using applyMiddleware.",
                    "Call the sagaMiddleware.run(ourSaga) to start our Saga.",
                    "All of them.",
                    "None of them."
                ],
                answers: ["All of them."]
            },
            {
                id: 3,
                question: "In order to use Saga, what we need to do?",
                possibleAnswers: [
                    "Create a middleware using the factory function createSagaMiddleware exported by the redux-saga library.",
                    "Connect Saga middleware to the Store using applyMiddleware.",
                    "Call the sagaMiddleware.run(ourSaga) to start our Saga.",
                    "All of them.",
                    "None of them."
                ],
                answers: ["All of them."]
            },
        ]
    }, {
        id: 6,
        categories: ['devops'],
        name: 'Docker',
        questions: []
    }
];

const dataStore = {
    getTests(): TestEntity[] {
        return tests;
    },
    getTest(id: number): TestEntity {
        return tests.find(value => value.id === id) as TestEntity;
    }
};

export default dataStore;