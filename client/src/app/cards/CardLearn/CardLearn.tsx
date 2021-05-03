import { UserCardAnswerDto } from "@skill-test/data/dto/learn/UserCardAnswerDto";
import hljs from "highlight.js";
import { Card } from "primereact/card";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useRef, useState } from "react";
import SpeechToText from "../../../components/SpeechToText/SpeechToText";
import { CardLearnMode } from "../CardLearnMode";
import styles from "./CardLearn.module.scss";

type Props = {
  mode: CardLearnMode;
  userCardAnswer: UserCardAnswerDto;
};

const CardLearn: React.FC<Props> = ({ mode, userCardAnswer }) => {
  const explanationRef = useRef<HTMLDivElement>(null);
  const { card } = userCardAnswer;
  const [answer, setAnswer] = useState<string>();
  const [recording, setRecording] = useState<boolean>(false);
  const subTitle = `Incorrect: ${userCardAnswer.incorrect}, Almost: ${userCardAnswer.almost}, Correct: ${userCardAnswer.correct}`;

  useEffect(() => {
    setAnswer(userCardAnswer.answer || "");
  }, [userCardAnswer]);

  useEffect(() => {
    if (mode === CardLearnMode.CHECKING) {
      setRecording(false);
      explanationRef.current
        ?.querySelectorAll("pre.ql-syntax")
        .forEach((block: any) => {
          // then highlight each
          hljs.highlightBlock(block);
        });
    }
  }, [mode]);

  const onChangeAnswer = (text: string) => {
    setAnswer(text);
    userCardAnswer.answer = text;
  };

  const onSpeechToText = (text: string) => {
    onChangeAnswer(answer + " " + text);
  };

  return (
    <div className="CurrentTestQuestion card">
      <Card
        title={card.question}
        subTitle={subTitle}
        style={{ width: "100%", marginBottom: "2em" }}
      >
        <div className="p-col-12">
          <label htmlFor="answer" className={`p-d-block ${styles.labelAnswer}`}>
            Your Answer
          </label>
          <SpeechToText
            recording={recording}
            toggle={setRecording}
            text={onSpeechToText}
            style={{
              display: mode === CardLearnMode.CHECKING ? "none" : "block",
            }}
          />
          <InputTextarea
            id="answer"
            value={answer}
            onChange={(e: any) => onChangeAnswer(e.target.value)}
            rows={5}
            cols={30}
            style={{ resize: "none", width: "100%" }}
            maxLength={512}
            disabled={mode === CardLearnMode.CHECKING}
          />
        </div>
        {mode === CardLearnMode.CHECKING ? (
          <div className="p-col-12">
            <label htmlFor="answer" className="p-d-block">
              Answer
            </label>
            <p className={styles.answer}>{card.answer}</p>
          </div>
        ) : null}
      </Card>
      {card.explanation && mode === CardLearnMode.CHECKING ? (
        <div
          ref={explanationRef}
          className="card"
          dangerouslySetInnerHTML={{
            __html: card.explanation || "",
          }}
        ></div>
      ) : null}
    </div>
  );
};

export default CardLearn;
