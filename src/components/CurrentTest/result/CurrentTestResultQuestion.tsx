import React from 'react';
import "./../CurrentTest.css";
import {Checkbox} from "primereact/checkbox";
import {Card} from "primereact/card";
import {UserTestItemAnswerDto} from "../../../data/UserTestItemAnswerDto";
import {TestItemAnswerDto} from "../../../data/test/TestItemAnswerDto";

type Props = {
    questionNumber: number
    userTestItemAnswer: UserTestItemAnswerDto
}

const CurrentTestResultQuestion: React.FC<Props> = ({questionNumber, userTestItemAnswer}) => {

    const {question, answerIds} = userTestItemAnswer;

    const multi = (answerDto: TestItemAnswerDto, idx: number) => {
        const {id, answer, correct} = answerDto;
        const checkboxId = "possibleAnswer" + idx;
        const isChecked = answerIds.some(value => value === id);

        return (
            <div className="p-field-checkbox possibleAnswer" key={idx}>
                <Checkbox inputId={checkboxId}
                          className={correct ? "p-valid" : isChecked ? "p-invalid" : ""}
                          name="city"
                          value={answerDto}
                          checked={isChecked || correct}
                          disabled={true}/>
                <label htmlFor={checkboxId}>{answer}</label>
            </div>
        )
    }

    return (
        <div className="CurrentTestQuestion card">
            <Card title={question.question} subTitle={"Question " + questionNumber}
                  style={{width: '100%', marginBottom: '2em'}}>
                <div className="possibleAnswers">
                    {
                        question.answers.map(multi)
                    }
                </div>
            </Card>
            {
                question.info ? <div className="card" dangerouslySetInnerHTML={{__html: question.info}}></div> : null
            }
        </div>
    );
};

export default CurrentTestResultQuestion;