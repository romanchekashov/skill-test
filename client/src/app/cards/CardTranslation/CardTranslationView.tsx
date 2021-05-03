import { CardTranslationDto } from "@skill-test/data/dto/learn/CardTranslationDto";
import hljs from "highlight.js";
import React, { useEffect, useRef } from "react";
import styles from "./CardTranslation.module.scss";

type Props = {
  translation: CardTranslationDto;
};

const CardTranslationView: React.FC<Props> = ({ translation }) => {
  const explanationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    explanationRef.current
      ?.querySelectorAll("pre.ql-syntax")
      .forEach((block: any) => {
        // then highlight each
        hljs.highlightBlock(block);
      });
  }, [translation]);

  const { question, answer, explanation } = translation;

  return (
    <>
      <div className="p-col-12">
        <label htmlFor="question" className="p-d-block">
          Question
        </label>
        <p>{question}</p>
      </div>
      <div className="p-col-12">
        <label htmlFor="answer" className="p-d-block">
          Answer
        </label>
        <p className={styles.answer}>{answer}</p>
      </div>
      <div className="p-col-12">
        <label htmlFor="explanation" className="p-d-block">
          Explanation
        </label>
        <div
          ref={explanationRef}
          dangerouslySetInnerHTML={{
            __html: explanation || "",
          }}
        ></div>
      </div>
    </>
  );
};

export default CardTranslationView;
