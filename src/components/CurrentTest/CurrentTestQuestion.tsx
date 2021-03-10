import React, {useEffect, useState} from 'react';
import "./CurrentTest.css";
import {Checkbox} from "primereact/checkbox";
import {UserTestItemAnswerEntity} from "../../data/UserTestItemAnswerEntity";

type Props = {
    questionNumber: number
    userTestItemAnswer: UserTestItemAnswerEntity
}

const CurrentTestQuestion: React.FC<Props> = ({questionNumber, userTestItemAnswer}) => {

    const {question} = userTestItemAnswer;
    const [cities, setCities] = useState<string[]>([]);

    useEffect(()=>{
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
        return (
            <div className="p-field-checkbox possibleAnswer" key={possibleAnswer}>
                <Checkbox inputId={id} name="city" value={possibleAnswer} onChange={onCityChange}
                          checked={cities.indexOf(possibleAnswer) !== -1}/>
                <label htmlFor={id}>{possibleAnswer}</label>
            </div>
        )
    }

    return (
        <div className="CurrentTestQuestion card">
            <h3>Question {questionNumber}</h3>
            <p>{question.question}</p>
            <div className="possibleAnswers card">
                {
                    question.possibleAnswers.map(multi)
                }
            </div>
        </div>
    );
};

export default CurrentTestQuestion;