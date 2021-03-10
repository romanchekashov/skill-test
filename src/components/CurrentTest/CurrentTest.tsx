import React, {useState} from 'react';
import {TestEntity} from "../../data/TestEntity";
import "./CurrentTest.css";
import {Link} from "react-router-dom";
import {Button} from "primereact/button";
import {Paginator} from "primereact/paginator";
import CurrentTestQuestion from "./CurrentTestQuestion";
import {UserTestResultEntity} from "../../data/UserTestResultEntity";
import CurrentTestResult from "./CurrentTestResult";

type Props = {
    test: TestEntity
}

const CurrentTest: React.FC<Props> = ({test}) => {
    const [first2, setFirst2] = useState(0);
    const [finished, setFinished] = useState<boolean>(false);
    const [testResult, setTestResult] = useState<UserTestResultEntity>({
        id: -1,
        test,
        user: {
            id: -1,
            email: "",
            username: "none"
        },
        result: test.questions.map(question => ({
            question,
            answers: []
        }))
    });

    if (finished) {
        return <CurrentTestResult testResult={testResult}/>;
    }

    const onPageChange2 = (event: any) => {
        setFirst2(event.first);
    }

    const onNext = (event: any) => {
        setFirst2(first2 + 1);
    }

    const onFinish = (event: any) => {
        setFinished(true);
    }

    const leftContent = <Button type="button" icon="pi pi-refresh" onClick={() => setFirst2(0)}/>;
    const rightContent = <Button type="button" icon="pi pi-search"/>;

    return (
        <div className="CurrentTest card">
            <h2>{test.name}</h2>
            <p>{test.categories.join()}</p>
            <Link to="/">Home</Link>

            <h5>Custom Template</h5>
            <Paginator first={first2} rows={1} totalRecords={test.questions.length} onPageChange={onPageChange2}
                       leftContent={leftContent} rightContent={rightContent}
                       template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"></Paginator>

            {
                test.questions[first2] ? <CurrentTestQuestion questionNumber={first2 + 1}
                                                              userTestItemAnswer={testResult.result[first2]}/> : null
            }

            <Button label="Next" onClick={onNext} disabled={first2 + 1 >= test.questions.length}/>
            <Button label="Finish" onClick={onFinish}/>
        </div>
    );
}

export default CurrentTest;