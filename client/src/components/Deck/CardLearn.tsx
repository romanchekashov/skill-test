import { UserCardAnswerDto } from "@skill-test/data/dto/learn/UserCardAnswerDto";
import { Card } from "primereact/card";
import React from "react";
import styles from "./CardLearn.module.scss";
import { CardLearnMode } from "./CardLearnMode";

type Props = {
  mode: CardLearnMode;
  questionNumber: number;
  userCardAnswer: UserCardAnswerDto;
};

const CardLearn: React.FC<Props> = ({
  mode,
  questionNumber,
  userCardAnswer,
}) => {
  const { card } = userCardAnswer;

  if (mode === CardLearnMode.ANSWERING) {
    return (
      <div className="CurrentTestQuestion card">
        <Card
          title={card.question}
          subTitle={"Question " + questionNumber}
          style={{ width: "100%", marginBottom: "2em" }}
        >
          {/* <div className="possibleAnswers">{card.answer}</div> */}
        </Card>
      </div>
    );
  }

  return (
    <div className="CurrentTestQuestion card">
      <Card
        title={card.question}
        subTitle={"Question " + questionNumber}
        style={{ width: "100%", marginBottom: "2em" }}
      >
        <div className="possibleAnswers">{card.answer}</div>
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
