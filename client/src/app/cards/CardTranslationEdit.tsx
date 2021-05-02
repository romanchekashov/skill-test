import { CardTranslationDto } from "@skill-test/data/dto/learn/CardTranslationDto";
import hljs from "highlight.js";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useRef, useState } from "react";
import { CrudMode } from "../../app/CrudMode";
import Editor from "../../components/Editor";

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
  const explanationRef = useRef<HTMLDivElement>(null);
  const [question, setQuestion] = useState<string>();
  const [answer, setAnswer] = useState<string>();
  const [explanation, setExplanation] = useState<string>("");

  useEffect(() => {
    setQuestion(translation.question);
    setAnswer(translation.answer);
    setExplanation(translation.explanation || "");
    explanationRef.current
      ?.querySelectorAll("pre.ql-syntax")
      .forEach((block: any) => {
        // then highlight each
        hljs.highlightBlock(block);
      });
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
      <div className="p-col-12">
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
            maxLength={256}
          />
        )}
      </div>
      <div className="p-col-12">
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
            maxLength={512}
          />
        )}
      </div>
      <div className="p-col-12">
        <label htmlFor="explanation" className="p-d-block">
          Explanation
        </label>
        {mode === CrudMode.READ ? (
          <div
            ref={explanationRef}
            dangerouslySetInnerHTML={{
              __html: translation.explanation || "",
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
