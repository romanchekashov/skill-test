import { CardDto } from "@skill-test/data/dto/learn/CardDto";
import { DeckDto } from "@skill-test/data/dto/learn/DeckDto";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React from "react";
import CardEdit from "../../cards/CardEdit";
import { editCard, viewCard } from "../../cards/cardsSlice";
import { DeckMode } from "../DeckMode";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectLangs } from "../../langs/langsSlice";
import { setMode } from "../decksSlice";
import styles from "./DeckView.module.scss";

type Props = {
  deck: DeckDto;
};

const DeckView: React.FC<Props> = ({ deck }) => {
  const dispatch = useAppDispatch();
  const { locale } = useAppSelector(selectLangs);

  const header = (
    <img
      alt="Card"
      src={deck.previewImg || ""}
      onError={(e: any) => {
        console.error(e);
        e.target.src =
          "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png";
      }}
    />
  );
  const footer = (card: CardDto) => (
    <>
      <Button
        icon="pi pi-eye"
        className="p-button-rounded p-button-text"
        onClick={() => {
          dispatch(viewCard(card));
        }}
      />
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-text"
        onClick={() => {
          dispatch(editCard(card));
        }}
      />
    </>
  );

  return (
    <div className="CurrentTest card">
      <div className={styles.header}>
        <h2>
          {deck.name}{" "}
          <span>{deck.categories.map((value) => value.name).join()}</span>
        </h2>
        <Button
          label="Start Learning"
          icon="pi pi-check"
          onClick={() => {
            dispatch(setMode(DeckMode.LEARN));
          }}
          style={{ marginRight: "5px" }}
        />
        <Button
          label="Add Card"
          icon="pi pi-check"
          onClick={() => {
            if (deck && deck.id) {
              const card: CardDto = {
                deckId: deck.id,
                question: "",
                answer: "",
                translations: [],
              };
              dispatch(editCard(card));
            }
          }}
        />
      </div>

      <div className="p-grid">
        {deck.cards.map((card) => (
          <div key={card.id} className="p-col-3">
            <Card
              title={card.question}
              className={styles.card}
              footer={footer(card)}
            >
              <div className={styles.answer}>{card.answer}</div>
            </Card>
          </div>
        ))}
        <CardEdit />
      </div>
    </div>
  );
};

export default DeckView;
