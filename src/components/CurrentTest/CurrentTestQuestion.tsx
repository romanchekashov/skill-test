import React, {useState} from 'react';
import "./CurrentTest.css";
import {TestItemEntity} from "../data/TestItemEntity";
import {Checkbox} from "primereact/checkbox";

type Props = {
    questionNumber: number
    question: TestItemEntity
}

const CurrentTestQuestion: React.FC<Props> = ({questionNumber, question}) => {

    const [cities, setCities] = useState<string[]>([]);

    const onCityChange = (e: any) => {
        let selectedCities = [...cities];

        if (e.checked)
            selectedCities.push(e.value);
        else
            selectedCities.splice(selectedCities.indexOf(e.value), 1);

        setCities(selectedCities);
    }

    const multi = (possibleAnswer: string) => {
        return (
            <div className="p-field-checkbox" key={possibleAnswer}>
                <Checkbox inputId="city1" name="city" value={possibleAnswer} onChange={onCityChange} checked={cities.indexOf(possibleAnswer) !== -1} />
                <label htmlFor="city1">{possibleAnswer}</label>
            </div>
        )
    }

    return (
        <div className="CurrentTestQuestion possibleAnswers card">
            <h3>Question {questionNumber}</h3>
            <p>{question.question}</p>
            <div className="card">
                {
                    question.possibleAnswers.map(multi)
                }
            </div>
        </div>
    );
};

export default CurrentTestQuestion;