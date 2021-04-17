import React, {useEffect, useState} from 'react';
import "../CurrentTest.css";
import {Checkbox} from "primereact/checkbox";
import {UserTestItemAnswerDto} from "@skill-test/data/dto/UserTestItemAnswerDto";
import {Card} from "primereact/card";
import {TestItemAnswerDto} from "@skill-test/data/dto/test/TestItemAnswerDto";

type Props = {
    questionNumber: number
    userTestItemAnswer: UserTestItemAnswerDto
}

const Question: React.FC<Props> = ({questionNumber, userTestItemAnswer}) => {

    const {question} = userTestItemAnswer;
    const [cities, setCities] = useState<TestItemAnswerDto[]>([]);

    useEffect(() => {
        const {answerIds, question} = userTestItemAnswer;
        setCities(question.answers.filter(value => answerIds.indexOf(value.id) !== -1));
    }, [userTestItemAnswer]);

    const onAnswerChange = (e: any) => {
        let selectedCities = [...cities];

        if (e.checked)
            selectedCities.push(e.value);
        else
            selectedCities.splice(selectedCities.indexOf(e.value), 1);

        setCities(selectedCities);
        userTestItemAnswer.answerIds = selectedCities.map(value => value.id);
    }

    const multi = (answerDto: TestItemAnswerDto, idx: number) => {
        const {id, answer} = answerDto;
        const checkboxId = "possibleAnswer" + idx;
        return (
            <div className="p-field-checkbox possibleAnswer" key={idx}>
                <Checkbox inputId={checkboxId} name="city"
                          value={answerDto}
                          onChange={onAnswerChange}
                          checked={cities.some(value => value.id === id)}/>
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
        </div>
    );
};

export default Question;