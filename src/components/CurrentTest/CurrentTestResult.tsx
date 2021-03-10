import React from 'react';
import {UserTestResultEntity} from "../../data/UserTestResultEntity";
import {UserTestItemAnswerEntity} from "../../data/UserTestItemAnswerEntity";
import {_equalArrays} from "../../utils/utils";
import {Button} from "primereact/button";

type Props = {
    testResult: UserTestResultEntity
    onRepeat: () => void
}

const CurrentTestResult: React.FC<Props> = ({testResult, onRepeat}) => {
    const {result, test} = testResult;

    const countCorrectAnswers = (result: UserTestItemAnswerEntity[]): number => {
        return result.reduce(
            (previousValue, currentValue) =>
                _equalArrays(currentValue.answers, currentValue.question.answers) ? previousValue + 1 : previousValue,
            0);
    }

    const correctAnswers = countCorrectAnswers(result);
    const correctAnswersInPercent = Math.round((correctAnswers / result.length) * 100);
    const mark = Math.ceil(correctAnswersInPercent / 20);

    return (
        <div className="CurrentTestResult">
            <h2>Your mark for test {test.name} is: {mark}</h2>
            <h2>You have answered correctly to {correctAnswersInPercent}% ({correctAnswers} / {result.length}) of
                questions</h2>
            <Button label="Repeat" icon="pi pi-check" onClick={onRepeat}/>
        </div>
    );
};

export default CurrentTestResult;