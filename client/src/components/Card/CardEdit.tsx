import { CardDto } from "@skill-test/data/dto/learn/CardDto";
import { CardTranslationDto } from "@skill-test/data/dto/learn/CardTranslationDto";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import React, { useEffect, useState } from "react";
import { CrudMode } from "../../app/CrudMode";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  createCard,
  selectCardSave,
  setMode,
} from "../../app/slices/cardsSlice";
import { addCard, selectDeck } from "../../app/slices/decksSlice";
import { selectLangs } from "../../app/slices/langsSlice";
import { fillCardWithTranslation, removeNewLines } from "../../utils/utils";
import LangSelect from "../LangSelect/LangSelect";
import CardTranslationEdit from "./CardTranslationEdit";

type Props = {};

const CardEdit: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const { mode, card, cardSaveLoading, cardSaveError } = useAppSelector(
    selectCardSave
  );
  const { deck } = useAppSelector(selectDeck);
  const { selectedLang, locale } = useAppSelector(selectLangs);

  const [translations, setTranslations] = useState<CardTranslationDto[]>([]);
  const [translation, setTranslation] = useState<CardTranslationDto>();

  useEffect(() => {
    if (card) {
      setTranslations(
        card.translations?.length
          ? card.translations.map((t) => ({ ...t }))
          : []
      );
    }
  }, [card]);

  useEffect(() => {
    if (!card) return;

    let translation = translations.find(({ lang }) => lang === selectedLang);

    if (!translation) {
      translation = {
        card_id: card.id,
        lang: selectedLang,
        default_lang: false,
        question: card.question,
        answer: card.answer,
        explanation: card.explanation || "",
      };
      setTranslations([...translations, translation]);
    }
    setTranslation(translation);
  }, [card, selectedLang, translations]);

  const onHide = () => {
    dispatch(setMode());
  };

  const save = () => {
    if (deck?.id && translations.length > 0) {
      const newTranslations = translations.map((t) => {
        const tr = { ...t };
        tr.question = removeNewLines(tr.question).trim();
        tr.answer = removeNewLines(tr.answer).trim();
        return tr;
      });
      const dto: CardDto = card
        ? { ...card, translations: newTranslations }
        : {
            deckId: deck.id,
            question: "",
            answer: "",
            translations: newTranslations,
          };
      // console.log(dto);
      dispatch(createCard(dto)).then((data: any) => {
        if (!data.error) {
          dispatch(addCard(fillCardWithTranslation(data.payload, locale)));
          onHide();
        }
      });
    }
  };

  const renderFooter = () => {
    if (mode === CrudMode.READ) return null;
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
      style={{ width: "50vw", zIndex: 20 }}
      footer={renderFooter()}
      onHide={() => onHide()}
      baseZIndex={1000}
    >
      <div className="p-grid">
        <div className="p-col-12 p-field">
          <label htmlFor="question" className="p-d-block">
            Language
          </label>
          <LangSelect />
        </div>
        {translation ? (
          <CardTranslationEdit
            mode={mode}
            translation={translation}
            // onUpdate={() => console.log(translation)}
          />
        ) : null}
      </div>
    </Dialog>
  );
};

export default CardEdit;
