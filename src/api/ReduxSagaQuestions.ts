import {TestItemDto} from "../data/test/TestItemDto";

const ReduxSagaQuestions: TestItemDto[] = [
    {
        id: 1,
        question: "In order to use Saga, what we need to do?",
        answers: [
            "Create a middleware using the factory function createSagaMiddleware exported by the redux-saga library.",
            "Connect Saga middleware to the Store using applyMiddleware.",
            "Call the sagaMiddleware.run(ourSaga) to start our Saga.",
            "All of them.",
            "None of them."
        ].map((answer, index) => ({
            id: index,
            answer,
            correct: answer === "All of them."
        }))
    },
    {
        id: 2,
        question: "When to use fork?",
        answers: [
            "Create a middleware using the factory function createSagaMiddleware exported by the redux-saga library.",
            "Connect Saga middleware to the Store using applyMiddleware.",
            "Call the sagaMiddleware.run(ourSaga) to start our Saga.",
            "All of them.",
            "None of them."
        ].map((answer, index) => ({
            id: index,
            answer,
            correct: answer === "All of them."
        }))
    },
    {
        id: 3,
        question: "In order to use Saga, what we need to do?",
        answers: [
            "Create a middleware using the factory function createSagaMiddleware exported by the redux-saga library.",
            "Connect Saga middleware to the Store using applyMiddleware.",
            "Call the sagaMiddleware.run(ourSaga) to start our Saga.",
            "All of them.",
            "None of them."
        ].map((answer, index) => ({
            id: index,
            answer,
            correct: answer === "All of them."
        }))
    },
];

export default ReduxSagaQuestions;