import React, {useState} from 'react';
import {TestDto} from "@skill-test/data/dto/test/TestDto";
import "./CurrentTest.css";
import {Button} from "primereact/button";
import {Paginator} from "primereact/paginator";
import Question from "./question/Question";
import CurrentTestResult from "./result/CurrentTestResult";
import {UserTestResultDto} from "@skill-test/data/dto/UserTestResultDto";
import {UserDto} from "@skill-test/data/dto/UserDto";

type Props = {
    test: TestDto
    user: UserDto
}

const CurrentTest: React.FC<Props> = ({test, user}) => {
    const testResultInitialState: UserTestResultDto = {
        id: -1,
        test,
        user: {
            id: -1,
            username: "none"
        },
        result: test.questions.map(question => ({
            question,
            answerIds: []
        }))
    };

    const [first2, setFirst2] = useState(0);
    const [finished, setFinished] = useState<boolean>(false);
    const [testResult, setTestResult] = useState<UserTestResultDto>(testResultInitialState);

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
            {
                test.author.username === user.username ?
                    <>
                        <Button label="Add" className="p-button-warning" onClick={onFinish}
                                style={{marginLeft: "5px"}}/>
                        <Button label="Edit" className="p-button-warning" onClick={onFinish}
                                style={{marginLeft: "5px"}}/>
                    </>
                    : null
            }
        </>
    );

    return (
        <div className="CurrentTest card">
            <div className="CurrentTest-head">
                <h2>{test.name} <span>{test.categories.map(value => value.name).join()}</span></h2>
            </div>

            <Paginator first={first2} rows={1} totalRecords={test.questions.length}
                       onPageChange={onPageChange2}
                       leftContent={leftContent} rightContent={rightContent}
                       template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"></Paginator>

            {
                test.questions[first2] ? <Question questionNumber={first2 + 1}
                                                   userTestItemAnswer={testResult.result[first2]}/> : null
            }


        </div>
    );
}

export default CurrentTest;