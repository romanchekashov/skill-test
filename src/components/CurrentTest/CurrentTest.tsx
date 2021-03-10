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
    const testResultInitialState: UserTestResultEntity = {
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
    };

    const [first2, setFirst2] = useState(0);
    const [finished, setFinished] = useState<boolean>(false);
    const [testResult, setTestResult] = useState<UserTestResultEntity>(testResultInitialState);

    const initTest = () => {
        setFirst2(0);
        setFinished(false);
        setTestResult(testResultInitialState);
    }

    if (finished) {
        return <CurrentTestResult testResult={testResult} onRepeat={initTest}/>;
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
    const rightContent = (
        <>
            <Button label="Next" onClick={onNext} disabled={first2 + 1 >= test.questions.length}/>
            <Button label="Finish" className="p-button-warning" onClick={onFinish} style={{marginLeft: "5px"}}/>
        </>
    );

    return (
        <div className="CurrentTest card">
            <div className="CurrentTest-head">
                <h2>{test.name} <span>{test.categories.join()}</span></h2>
            </div>

            <Paginator first={first2} rows={1} totalRecords={test.questions.length}
                       onPageChange={onPageChange2}
                       leftContent={leftContent} rightContent={rightContent}
                       template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"></Paginator>

            {
                test.questions[first2] ? <CurrentTestQuestion questionNumber={first2 + 1}
                                                              userTestItemAnswer={testResult.result[first2]}/> : null
            }


        </div>
    );
}

export default CurrentTest;