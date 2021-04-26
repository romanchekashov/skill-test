import { CardTranslationDto } from "@skill-test/data/dto/learn/CardTranslationDto";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";
import { CrudMode } from "../../app/CrudMode";
import Editor from "../Editor";

type Props = {
  mode: CrudMode | undefined;
  translation: CardTranslationDto;
  onUpdate?: (translation: CardTranslationDto) => void;
};

const CardTranslationEdit: React.FC<Props> = ({
  mode,
  translation,
  onUpdate,
}) => {
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
    // onUpdate(translation);
  };

  const onChangeAnswer = (e: any) => {
    setAnswer(e.target.value);
    translation.answer = e.target.value;
    // onUpdate(translation);
  };

  const onChangeExplanation = (e: string) => {
    setExplanation(e);
    translation.explanation = e;
    // onUpdate(translation);
  };

  return (
    <>
      <div className="p-col-12 p-field">
        <label htmlFor="question" className="p-d-block">
          Question
        </label>
        {mode === CrudMode.READ ? (
          <p>{question}</p>
        ) : (
          <InputTextarea
            id="question"
            value={question}
            onChange={onChangeQuestion}
            rows={3}
            cols={30}
            style={{ resize: "none", width: "100%" }}
          />
        )}
      </div>
      <div className="p-col-12 p-field">
        <label htmlFor="answer" className="p-d-block">
          Answer
        </label>
        {mode === CrudMode.READ ? (
          <p>{answer}</p>
        ) : (
          <InputTextarea
            id="answer"
            value={answer}
            onChange={onChangeAnswer}
            rows={5}
            cols={30}
            style={{ resize: "none", width: "100%" }}
          />
        )}
      </div>
      <div className="p-col-12 p-field">
        <label htmlFor="explanation" className="p-d-block">
          Explanation
        </label>
        {mode === CrudMode.READ ? (
          <div
            dangerouslySetInnerHTML={{
              __html: explanation,
            }}
          ></div>
        ) : (
          <Editor
            style={{ height: "320px" }}
            value={explanation}
            onTextChange={onChangeExplanation}
          />
        )}
      </div>
    </>
  );
};

export default CardTranslationEdit;
