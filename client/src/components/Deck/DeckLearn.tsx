import { DeckDto } from "@skill-test/data/dto/learn/DeckDto";
import { Grade } from "@skill-test/data/dto/learn/Grade";
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
import styles from "./DeckLearn.module.scss";
import GradeSelect from "./GradeSelect";
import Timer from "./Timer";

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
    setShowGrade(false);
  };

  const onFinish = (event: any) => {
    setFinished(true);
    dispatch(setMode(DeckMode.VIEW));
  };

  const userCardAnswer: UserCardAnswerDto = result.result[first2];
  const [grade, setGrade] = useState<Grade>();
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
      {showGrade ? (
        <GradeSelect
          grade={userCardAnswer.grade}
          onUpdate={(g) => {
            userCardAnswer.grade = g;
            setGrade(g);
          }}
          className={styles.gradeSelect}
        />
      ) : (
        <>
          <Timer
            timeoutInSeconds={10}
            start={first2}
            finished={() => {
              setShowGrade(true);
            }}
            className={styles.gradeSelect}
          />
          <Button
            label="Check"
            className="p-button-warning"
            onClick={() => setShowGrade(true)}
            style={{ marginRight: "5px" }}
          />
        </>
      )}

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
          questionNumber={first2 + 1}
          userCardAnswer={userCardAnswer}
        />
      ) : null}
    </div>
  );
};

export default DeckLearn;
