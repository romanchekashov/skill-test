import React, {useState} from 'react';
import {UserTestResultDto} from "../../../dto/UserTestResultDto";
import {UserTestItemAnswerDto} from "../../../dto/UserTestItemAnswerDto";
import {Button} from "primereact/button";
import {Paginator} from "primereact/paginator";
import "./CurrentTestResult.css";
import CurrentTestResultQuestion from "./CurrentTestResultQuestion";
import {_equalArrays} from "../../../utils/utils";

type Props = {
    testResult: UserTestResultDto
    onRepeat: () => void
}

const CurrentTestResult: React.FC<Props> = ({testResult, onRepeat}) => {
    const {result, test} = testResult;
    const [first2, setFirst2] = useState(0);

    const countCorrectAnswers = (result: UserTestItemAnswerDto[]): number => {
        return result.reduce(
            (previousValue, currentValue) =>
                (_equalArrays(
                    currentValue.answerIds,
                    currentValue.question.answers.filter(value => value.correct).map(value => value.id))
                    ? previousValue + 1 : previousValue),
            0);
    }

    const correctAnswers = countCorrectAnswers(result);
    const correctAnswersInPercent = Math.round((correctAnswers / result.length) * 100);
    const mark = Math.ceil(correctAnswersInPercent / 20);

    const onPageChange2 = (event: any) => {
        setFirst2(event.first);
    }

    const onNext = (event: any) => {
        setFirst2(first2 + 1);
    }

    const onFinish = (event: any) => {
        // setFinished(true);
    }

    const leftContent = <Button type="button" icon="pi pi-refresh" onClick={() => setFirst2(0)}/>;
    const rightContent = (
        <>
            <Button label="Next" onClick={onNext} disabled={first2 + 1 >= test.questions.length}/>
            <Button label="Finish" className="p-button-warning" onClick={onFinish} style={{marginLeft: "5px"}}/>
        </>
    );

    return (
        <div className="CurrentTestResult">
            <h2>Your mark for test {test.name} is: {mark}</h2>
            <h2>You have answered correctly to {correctAnswersInPercent}% ({correctAnswers} / {result.length}) of
                questions</h2>
            <Button label="Repeat" icon="pi pi-check" onClick={onRepeat}/>

            <Paginator first={first2} rows={1} totalRecords={test.questions.length}
                       onPageChange={onPageChange2}
                       leftContent={leftContent} rightContent={rightContent}
                       template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"></Paginator>

            {
                test.questions[first2] ? <CurrentTestResultQuestion questionNumber={first2 + 1}
                                                                    userTestItemAnswer={testResult.result[first2]}/> : null
            }
        </div>
    );
};

export default CurrentTestResult;