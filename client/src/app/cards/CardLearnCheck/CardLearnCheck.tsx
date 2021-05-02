import { Grade } from "@skill-test/data/dto/learn/Grade";
import { UserCardAnswerDto } from "@skill-test/data/dto/learn/UserCardAnswerDto";
import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import GradeSelect from "../../../components/GradeSelect";
import Timer from "../../../components/Timer";
import styles from "./CardLearnCheck.module.scss";

type Props = {
  showGrade: boolean;
  userCardAnswer: UserCardAnswerDto;
  check: () => void;
  graded: (grade: Grade) => void;
};

const CardLearnCheck: React.FC<Props> = ({
  showGrade,
  userCardAnswer,
  check,
  graded,
}) => {
  const [grade, setGrade] = useState<Grade>();

  useEffect(() => {
    setGrade(userCardAnswer.grade);
  }, [userCardAnswer]);

  if (showGrade) {
    return (
      <GradeSelect
        grade={userCardAnswer.grade}
        onUpdate={(g) => {
          userCardAnswer.grade = g;
          setGrade(g);
          graded(g);
        }}
        className={styles.inline}
      />
    );
  }

  return (
    <>
      <Timer
        timeoutInSeconds={60}
        start={userCardAnswer}
        finished={check}
        className={styles.inline}
      />
      <Button
        label="Check"
        className="p-button-warning"
        onClick={check}
        style={{ marginRight: "5px" }}
      />
    </>
  );
};

export default CardLearnCheck;
