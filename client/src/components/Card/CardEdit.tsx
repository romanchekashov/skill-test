import { CardDto } from "@skill-test/data/dto/learn/CardDto";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useEffect, useState } from "react";
import { CrudMode } from "../../app/CrudMode";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createCard,
  selectCardSave,
  setMode,
} from "../../app/slices/cardsSlice";
import { addCard, selectDeck } from "../../app/slices/decksSlice";
import { isBrowser, removeNewLines } from "../../utils/utils";
import Editor from "../Editor";

type Props = {};

const CardEdit: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const { mode, card, cardSaveLoading, cardSaveError } = useAppSelector(
    selectCardSave
  );
  const { deck } = useAppSelector(selectDeck);

  const [question, setQuestion] = useState<string>();
  const [answer, setAnswer] = useState<string>();
  const [explanation, setExplanation] = useState<string>("");

  useEffect(() => {
    if (card) {
      setQuestion(card.question);
      setAnswer(card.answer);
      setExplanation(card.explanation || "");
    }
  }, [card]);

  const onHide = () => {
    dispatch(setMode());
  };

  const save = () => {
    if (deck?.id && question && answer) {
      const dto: CardDto = card
        ? { ...card, question, answer, explanation }
        : { deckId: deck.id, question, answer, explanation };
      dto.question = removeNewLines(dto.question).trim();
      dto.answer = removeNewLines(dto.answer).trim();
      console.log(dto);
      dispatch(createCard(dto)).then((data: any) => {
        if (!data.error) {
          dispatch(addCard(data.payload));
          onHide();
        }
      });
    }
  };

  const renderFooter = () => {
    return (
      <div>
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={() => onHide()}
          className="p-button-text"
        />
        <Button label="Save" icon="pi pi-check" onClick={save} autoFocus />
      </div>
    );
  };

  return (
    <Dialog
      header={`Card ${mode}`}
      visible={!!mode}
      style={{ width: "50vw" }}
      footer={renderFooter()}
      onHide={() => onHide()}
      baseZIndex={1000}
    >
      <div className="p-grid">
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
              onChange={(e: any) => setQuestion(e.target.value)}
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
              onChange={(e: any) => setAnswer(e.target.value)}
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
            <div dangerouslySetInnerHTML={{ __html: explanation }}></div>
          ) : (
            <Editor
              style={{ height: "320px" }}
              value={explanation}
              onTextChange={setExplanation}
            />
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default CardEdit;
