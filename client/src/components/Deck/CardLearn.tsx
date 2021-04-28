import { UserCardAnswerDto } from "@skill-test/data/dto/learn/UserCardAnswerDto";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";
import { CardLearnMode } from "./CardLearnMode";

type Props = {
  mode: CardLearnMode;
  userCardAnswer: UserCardAnswerDto;
};

const CardLearn: React.FC<Props> = ({ mode, userCardAnswer }) => {
  const { card } = userCardAnswer;
  const [answer, setAnswer] = useState<string>();
  const subTitle = `Incorrect: ${userCardAnswer.incorrect}, Almost: ${userCardAnswer.almost}, Correct: ${userCardAnswer.correct}`;

  useEffect(() => {
    setAnswer(userCardAnswer.answer || "");
  }, [userCardAnswer]);

  const onChangeAnswer = (e: any) => {
    setAnswer(e.target.value);
    userCardAnswer.answer = e.target.value;
  };

  if (mode === CardLearnMode.ANSWERING) {
    return (
      <div className="CurrentTestQuestion card">
        <Card
          title={card.question}
          subTitle={subTitle}
          style={{ width: "100%", marginBottom: "2em" }}
        >
          <div className="p-col-12 p-field">
            <label htmlFor="answer" className="p-d-block">
              Answer
            </label>
            <InputTextarea
              id="answer"
              value={answer}
              onChange={onChangeAnswer}
              rows={5}
              cols={30}
              style={{ resize: "none", width: "100%" }}
              maxLength={512}
            />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="CurrentTestQuestion card">
      <Card
        title={card.question}
        subTitle={subTitle}
        style={{ width: "100%", marginBottom: "2em" }}
      >
        <div className="p-col-12 p-field">
          <label htmlFor="answer" className="p-d-block">
            Your Answer
          </label>
          <p className="possibleAnswers">{userCardAnswer.answer}</p>
        </div>
        <div className="p-col-12 p-field">
          <label htmlFor="answer" className="p-d-block">
            Answer
          </label>
          <p className="possibleAnswers">{card.answer}</p>
        </div>
      </Card>
      {card.explanation ? (
        <div
          className="card"
          dangerouslySetInnerHTML={{ __html: card.explanation }}
        ></div>
      ) : null}
    </div>
  );
};

export default CardLearn;
