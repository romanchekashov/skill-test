import React from 'react';
import {TestEntity} from "../data/TestEntity";

type Props = {
    test: TestEntity
}

const Test: React.FC<Props> = ({test}) => {
    return (
        <div>
            <h2>{test.name}</h2>
            <p>{test.categories.join()}</p>
            <button>Start</button>
        </div>
    );
}

export default Test;