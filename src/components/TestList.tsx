import React from 'react';
import {TestDto} from "../dto/test/TestDto";
import Test from "./Test";
import "./TestList.css";
import {getTests} from "../api/testsApi";

type Props = {
    tests: TestDto[]
}

const TestList: React.FC<Props> = ({tests}) => {
    getTests()
        .then(value => console.log(value))
        .catch(reason => console.error(reason));

    return (
        <div className="TestList">
            {
                tests.map(test => (
                    <React.Fragment key={test.id}>
                        <Test test={test}/>
                    </React.Fragment>
                ))
            }
        </div>
    );
};

export default TestList;