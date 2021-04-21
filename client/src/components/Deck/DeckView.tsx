import { DeckDto } from "@skill-test/data/dto/learn/DeckDto";
import Link from "next/link";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React from "react";
import { useDispatch } from "react-redux";
import { DeckMode } from "../../lib/DeckMode";
import { setMode } from "../../lib/slices/decksSlice";
import styles from "./DeckView.module.css";

type Props = {
  deck: DeckDto;
};

const DeckView: React.FC<Props> = ({ deck }) => {
  const dispatch = useDispatch();

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
            dispatch(setMode(DeckMode.LEARN));
          }}
        />
      </div>

      <div className="p-grid">
        {deck.cards.map(({ id, question, answer }) => (
          <div key={id} className="p-col-3">
            <Card title={question} style={{}}>
              <div className="possibleAnswers">{answer}</div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeckView;
