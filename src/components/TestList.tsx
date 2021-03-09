import React from 'react';
import {TestEntity} from "../data/TestEntity";
import Test from "./Test";
import "./TestList.css";

type Props = {
    tests: TestEntity[]
}

const TestList: React.FC<Props> = ({tests}) => {
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