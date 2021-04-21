import { DeckDto } from "@skill-test/data/dto/learn/DeckDto";
import { UserDeckLearnResultDto } from "@skill-test/data/dto/learn/UserDeckLearnResultDto";
import { UserDto } from "@skill-test/data/dto/UserDto";
import { Button } from "primereact/button";
import { Paginator } from "primereact/paginator";
import React, { useState } from "react";
import CardLearn from "./CardLearn";
import styles from "./DeckLearn.module.css";

type Props = {
  deck: DeckDto;
  user: UserDto;
};

const DeckLearn: React.FC<Props> = ({ deck, user }) => {
  const resultInitialState: UserDeckLearnResultDto = {
    deck,
    user,
    result: deck.cards.map((card) => ({ card })),
  };

  const [first2, setFirst2] = useState(0);
  const [finished, setFinished] = useState<boolean>(false);
  const [result, setResult] = useState<UserDeckLearnResultDto>(
    resultInitialState
  );

  const initTest = () => {
    setFirst2(0);
    setFinished(false);
    setResult(resultInitialState);
  };

  //   if (finished) {
  //     return <CurrentTestResult testResult={testResult} onRepeat={initTest} />;
  //   }

  const onPageChange2 = (event: any) => {
    setFirst2(event.first);
  };

  const onNext = (event: any) => {
    setFirst2(first2 + 1);
  };

  const onFinish = (event: any) => {
    setFinished(true);
  };

  const leftContent = (
    <Button type="button" icon="pi pi-refresh" onClick={() => setFirst2(0)} />
  );
  const rightContent = (
    <>
      <Button
        label="Next"
        onClick={onNext}
        disabled={first2 + 1 >= deck.cards.length}
      />
      <Button
        label="Finish"
        className="p-button-warning"
        onClick={onFinish}
        style={{ marginLeft: "5px" }}
      />
      {deck.author.username === user.username ? (
        <>
          <Button
            label="Add"
            className="p-button-warning"
            onClick={onFinish}
            style={{ marginLeft: "5px" }}
          />
          <Button
            label="Edit"
            className="p-button-warning"
            onClick={onFinish}
            style={{ marginLeft: "5px" }}
          />
        </>
      ) : null}
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
          questionNumber={first2 + 1}
          userCardAnswer={result.result[first2]}
        />
      ) : null}
    </div>
  );
};

export default DeckLearn;
