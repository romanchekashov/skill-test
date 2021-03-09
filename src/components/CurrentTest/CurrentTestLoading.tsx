import React from 'react';
import "../Test.css";
import {CurrentTestState} from "../../redux/reducers/currentTest";
import CurrentTest from "./CurrentTest";

type Props = {
    testId: number
    currentTest: CurrentTestState
    loadTestById: (testId: number) => void
}

const CurrentTestLoading: React.FC<Props> = ({testId, loadTestById, currentTest}) => {
    const {test, loading, error} = currentTest;

    if (test?.id === testId) return <CurrentTest test={test}/>;
    if (error) return <div>{error}</div>;
    if (!loading) loadTestById(testId);

    return (
        <div className="CurrentTest">
            Test {testId} is loading...
        </div>
    );
};

export default CurrentTestLoading;