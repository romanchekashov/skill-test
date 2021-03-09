import React from 'react';
import {TestEntity} from "../data/TestEntity";
import "./Test.css";
import {Link} from "react-router-dom";

type Props = {
    test: TestEntity
}

const Test: React.FC<Props> = ({test}) => {
    return (
        <div className="Test">
            <h2>{test.name}</h2>
            <p>{test.categories.join()}</p>
            <Link to={'/' + test.id}>Show</Link>
        </div>
    );
};

export default Test;