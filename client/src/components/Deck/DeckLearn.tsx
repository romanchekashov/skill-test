import { DeckDto } from "@skill-test/data/dto/learn/DeckDto";
import { UserCardAnswerDto } from "@skill-test/data/dto/learn/UserCardAnswerDto";
import { UserDeckLearnResultDto } from "@skill-test/data/dto/learn/UserDeckLearnResultDto";
import { UserDto } from "@skill-test/data/dto/UserDto";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import React, { useState } from "react";
import { DeckMode } from "../../app/DeckMode";
import { useAppDispatch } from "../../app/hooks";
import { setMode } from "../../app/slices/decksSlice";
import CardLearn from "./CardLearn";
import CardLearnCheck from "./CardLearnCheck/CardLearnCheck";
import { CardLearnMode } from "./CardLearnMode";

type Props = {
  deck: DeckDto;
  user: UserDto;
};

const DeckLearn: React.FC<Props> = ({ deck, user }) => {
  const dispatch = useAppDispatch();

  const resultInitialState: UserDeckLearnResultDto = {
    deck,
    user,
    result: deck.cards.map((card) => ({ card })),
  };

  const [first2, setFirst2] = useState(0);
  const [result, setResult] = useState<UserDeckLearnResultDto>(
    resultInitialState
  );

  const onPageChange2 = (event: any) => {
    newCard(event.first);
  };

  const onNext = (event: any) => {
    newCard(first2 + 1);
  };

  const newCard = (index: number) => {
    const userCardAnswer: UserCardAnswerDto = result.result[index];
    setFirst2(index);
    if (userCardAnswer.answer) {
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

  const userCardAnswer: UserCardAnswerDto = result.result[first2];
  const [cardLearnMode, setCardLearnMode] = useState<CardLearnMode>(
    CardLearnMode.ANSWERING
  );
  const [showGrade, setShowGrade] = useState<boolean>(false);

  const leftContent = (
    <>
      <Button type="button" icon="pi pi-refresh" onClick={() => setFirst2(0)} />
      <Button
        label="Finish"
        className="p-button-warning"
        onClick={onFinish}
        style={{ marginLeft: "5px" }}
      />
    </>
  );
  const rightContent = (
    <>
      <CardLearnCheck
        showGrade={showGrade}
        userCardAnswer={userCardAnswer}
        check={check}
      />
      <Button
        label="Next"
        onClick={onNext}
        disabled={first2 + 1 >= deck.cards.length}
      />
    </>
  );

  return (
    <div className="CurrentTest card">
      <div className="CurrentTest-head">
        <h2>
          {deck.name}{" "}
          <span>{deck.categories.map((value) => value.name).join()}</span>
        </h2>
      </div>

      <Paginator
        first={first2}
        rows={1}
        totalRecords={deck.cards.length}
        onPageChange={onPageChange2}
        leftContent={leftContent}
        rightContent={rightContent}
        template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      ></Paginator>

      {deck.cards[first2] ? (
        <CardLearn
          mode={cardLearnMode}
          questionNumber={first2 + 1}
          userCardAnswer={userCardAnswer}
        />
      ) : null}
    </div>
  );
};

export default DeckLearn;
