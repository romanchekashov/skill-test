import React from 'react';
import "../Test.css";
import {CurrentTestState} from "../../redux/reducers/currentTest";
import CurrentTest from "./CurrentTest";
import {ProgressSpinner} from "primereact/progressspinner";
import {UserDto} from "@skill-test/data/dto/UserDto";

type Props = {
    testId: number
    user: UserDto | null
    currentTest: CurrentTestState
    loadTestById: (testId: number) => void
}

const CurrentTestLoading: React.FC<Props> = ({testId, user, loadTestById, currentTest}) => {
    const {test, loading, error} = currentTest;

    if (test?.id === testId && user) return <CurrentTest test={test} user={user}/>;
    if (error) return <div>{error}</div>;
    if (!loading) loadTestById(testId);

    return (
        <div className="CurrentTest">
            <div className="loading">
                <ProgressSpinner/>
                <div>Test {testId} is loading...</div>
            </div>
        </div>
    );
};

export default CurrentTestLoading;