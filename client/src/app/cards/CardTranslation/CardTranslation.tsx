import { CardTranslationDto } from "@skill-test/data/dto/learn/CardTranslationDto";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";
import Editor from "../../../components/Editor";
import { CrudMode } from "../../CrudMode";
import CardTranslationView from "./CardTranslationView";

type Props = {
  mode: CrudMode | undefined;
  translation: CardTranslationDto;
};

const CardTranslation: React.FC<Props> = ({ mode, translation }) => {
  const [question, setQuestion] = useState<string>();
  const [answer, setAnswer] = useState<string>();
  const [explanation, setExplanation] = useState<string>("");

  useEffect(() => {
    setQuestion(translation.question);
    setAnswer(translation.answer);
    setExplanation(translation.explanation || "");
  }, [translation]);

  const onChangeQuestion = (e: any) => {
    setQuestion(e.target.value);
    translation.question = e.target.value;
  };

  const onChangeAnswer = (e: any) => {
    setAnswer(e.target.value);
    translation.answer = e.target.value;
  };

  const onChangeExplanation = (e: string) => {
    setExplanation(e);
    translation.explanation = e;
  };

  if (mode === CrudMode.READ)
    return <CardTranslationView translation={translation} />;

  return (
    <>
      <div className="p-col-12">
        <label htmlFor="question" className="p-d-block">
          Question
        </label>
        <InputTextarea
          id="question"
          value={question}
          onChange={onChangeQuestion}
          rows={3}
          cols={30}
          style={{ resize: "none", width: "100%" }}
          maxLength={256}
        />
      </div>
      <div className="p-col-12">
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
      <div className="p-col-12">
        <label htmlFor="explanation" className="p-d-block">
          Explanation
        </label>
        <Editor
          style={{ height: "320px" }}
          value={explanation}
          onTextChange={onChangeExplanation}
        />
      </div>
    </>
  );
};

export default CardTranslation;
