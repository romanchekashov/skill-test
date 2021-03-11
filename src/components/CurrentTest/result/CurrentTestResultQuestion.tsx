import React, {useEffect, useState} from 'react';
import "./../CurrentTest.css";
import {Checkbox} from "primereact/checkbox";
import {Card} from "primereact/card";
import {UserTestItemAnswerEntity} from "../../../data/UserTestItemAnswerEntity";

type Props = {
    questionNumber: number
    userTestItemAnswer: UserTestItemAnswerEntity
}

const CurrentTestResultQuestion: React.FC<Props> = ({questionNumber, userTestItemAnswer}) => {

    const {question, answers} = userTestItemAnswer;
    const [cities, setCities] = useState<string[]>([]);

    useEffect(() => {
        setCities(userTestItemAnswer.answers);
    }, [userTestItemAnswer]);

    const onCityChange = (e: any) => {
        let selectedCities = [...cities];

        if (e.checked)
            selectedCities.push(e.value);
        else
            selectedCities.splice(selectedCities.indexOf(e.value), 1);

        setCities(selectedCities);
        userTestItemAnswer.answers = selectedCities;
    }

    const multi = (possibleAnswer: string, idx: number) => {
        const id = "possibleAnswer" + idx;
        const isChecked = answers.indexOf(possibleAnswer) !== -1;
        const isCorrectAnswer = question.answers.indexOf(possibleAnswer) !== -1;

        return (
            <div className="p-field-checkbox possibleAnswer" key={possibleAnswer}>
                <Checkbox inputId={id}
                          className={isCorrectAnswer ? "p-valid" : isChecked ? "p-invalid" : ""}
                          name="city"
                          value={possibleAnswer}
                          onChange={onCityChange}
                          checked={isChecked || isCorrectAnswer}
                          disabled={true}/>
                <label htmlFor={id}>{possibleAnswer}</label>
            </div>
        )
    }

    return (
        <div className="CurrentTestQuestion card">
            <Card title={question.question} subTitle={"Question " + questionNumber}
                  style={{width: '100%', marginBottom: '2em'}}>
                <div className="possibleAnswers">
                    {
                        question.possibleAnswers.map(multi)
                    }
                </div>
            </Card>
            {
                question.info ? <div className="card" dangerouslySetInnerHTML={{ __html: question.info }}></div> : null
            }
        </div>
    );
};

export default CurrentTestResultQuestion;