import React, { useEffect, useState } from "react";
import { DeckDto } from "@skill-test/data/dto/learn/DeckDto";
import DeckThumbnail from "../DeckThumbnail/DeckThumbnail";
import styles from "./DeckThumbnailList.module.css";

type Props = {
  decks: DeckDto[];
};

const DeckThumbnailList: React.FC<Props> = ({ decks }) => {
  return (
    <div className={styles.TestList}>
      {decks.map((deck) => (
        <React.Fragment key={deck.id}>
          <DeckThumbnail deck={deck} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default DeckThumbnailList;
