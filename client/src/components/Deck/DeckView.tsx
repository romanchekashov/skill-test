import { CardDto } from "@skill-test/data/dto/learn/CardDto";
import { DeckDto } from "@skill-test/data/dto/learn/DeckDto";
import Link from "next/link";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React from "react";
import { DeckMode } from "../../app/DeckMode";
import { useAppDispatch } from "../../app/hooks";
import { editCard, viewCard } from "../../app/slices/cardsSlice";
import { setMode } from "../../app/slices/decksSlice";
import CardEdit from "../Card/CardEdit";
import styles from "./DeckView.module.scss";

type Props = {
  deck: DeckDto;
};

const DeckView: React.FC<Props> = ({ deck }) => {
  const dispatch = useAppDispatch();

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
  const footer = (
    <span>
      <Link href={"/" + deck.id}>
        <Button label="Show" icon="pi pi-check" />
      </Link>
      {/*<Button label="Cancel" icon="pi pi-times" className="p-button-secondary p-ml-2" />*/}
    </span>
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
              };
              dispatch(editCard(card));
            }
          }}
        />
      </div>

      <div className="p-grid">
        {deck.cards.map((card) => (
          <div key={card.id} className="p-col-3">
            <Card title={card.question} style={{}}>
              <div className="possibleAnswers">{card.answer}</div>
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
            </Card>
          </div>
        ))}
        <CardEdit />
      </div>
    </div>
  );
};

export default DeckView;
