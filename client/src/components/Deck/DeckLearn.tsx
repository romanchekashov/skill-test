import { DeckDto } from "@skill-test/data/dto/learn/DeckDto";
import { Grade } from "@skill-test/data/dto/learn/Grade";
import { UserCardAnswerDto } from "@skill-test/data/dto/learn/UserCardAnswerDto";
import { UserDto } from "@skill-test/data/dto/UserDto";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import React, { useEffect, useState } from "react";
import { DeckMode } from "../../app/DeckMode";
import { useAppDispatch } from "../../app/hooks";
import { setMode } from "../../app/slices/decksSlice";
import { LinkedList } from "../../utils/LinkedList";
import CardLearn from "./CardLearn";
import CardLearnCheck from "./CardLearnCheck/CardLearnCheck";
import { CardLearnMode } from "./CardLearnMode";
import styles from "./DeckLearn.module.scss";

type Props = {
  deck: DeckDto;
  user: UserDto;
};

const DeckLearn: React.FC<Props> = ({ deck, user }) => {
  const dispatch = useAppDispatch();

  const [list, setList] = useState<LinkedList<UserCardAnswerDto>>();
  const [currentCard, setCurrentCard] = useState<UserCardAnswerDto>();
  const [cardLearnMode, setCardLearnMode] = useState<CardLearnMode>(
    CardLearnMode.ANSWERING
  );
  const [showGrade, setShowGrade] = useState<boolean>(false);

  useEffect(() => {
    if (deck && user) {
      const list = new LinkedList<UserCardAnswerDto>();
      deck.cards.forEach((card) =>
        list.add({ card, incorrect: 0, correct: 0, almost: 0 })
      );
      setList(list);
      const card = list.removeFirst();
      if (card) {
        setCurrentCard(card);
        newCard(card);
      }
    }
  }, [deck, user]);

  const calcNewEFactor = (eFactor: number, grade: Grade): number => {
    const newEFactor =
      eFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    return newEFactor > 1.3 ? newEFactor : 1.3;
  };

  const calcIndex = (length: number, grade?: Grade): number => {
    let index = length;
    if (2 === grade) index = length / 4;
    if (3 === grade) index = length / 2;
    return Math.ceil(index);
  };

  const onNext = (event: any) => {
    if (!list) return;

    if (currentCard && currentCard.grade) {
      switch (currentCard.grade) {
        case 2:
          currentCard.incorrect++;
          break;
        case 3:
          currentCard.almost++;
          break;
        case 4:
          currentCard.correct++;
          break;
      }
      currentCard.grade = undefined;
      currentCard.answer = undefined;
      list.addAt(calcIndex(list.size, currentCard.grade), currentCard);
    }

    const card = list.removeFirst();
    if (card) {
      setCurrentCard(card);
      newCard(card);
    }
  };

  const newCard = (userCardAnswer: UserCardAnswerDto) => {
    if (userCardAnswer.grade || userCardAnswer.answer) {
      setShowGrade(true);
      setCardLearnMode(CardLearnMode.CHECKING);
    } else {
      setShowGrade(false);
      setCardLearnMode(CardLearnMode.ANSWERING);
    }
  };

  const check = () => {
    setShowGrade(true);
    setCardLearnMode(CardLearnMode.CHECKING);
  };

  const onFinish = (event: any) => {
    dispatch(setMode(DeckMode.VIEW));
  };

  const leftContent = (
    <>
      <Button type="button" icon="pi pi-refresh" onClick={() => {}} />
      <Button
        label="Finish"
        className="p-button-warning"
        onClick={onFinish}
        style={{ marginLeft: "5px" }}
      />
      <span style={{ margin: "0 5px" }}>All: {deck.cards.length}</span>
    </>
  );
  const rightContent = (
    <>
      {currentCard ? (
        <CardLearnCheck
          showGrade={showGrade}
          userCardAnswer={currentCard}
          check={check}
          graded={onNext}
        />
      ) : null}
    </>
  );

  return (
    <div className={styles.container}>
      <div className="CurrentTest-head">
        <h2>
          {deck.name}{" "}
          <span>{deck.categories.map((value) => value.name).join()}</span>
        </h2>
      </div>

      <Toolbar left={leftContent} right={rightContent} />

      {currentCard ? (
        <CardLearn mode={cardLearnMode} userCardAnswer={currentCard} />
      ) : null}
    </div>
  );
};

export default DeckLearn;
