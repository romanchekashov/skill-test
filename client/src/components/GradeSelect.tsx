import { Grade } from "@skill-test/data/dto/learn/Grade";
import { SelectButton } from "primereact/selectbutton";

const gradeToOption = {
  [2]: { name: "Incorrect", value: 2 },
  [3]: { name: "Almost", value: 3 },
  [4]: { name: "Correct", value: 4 },
};
const options = Object.values(gradeToOption);

type Props = {
  grade: Grade | undefined;
  onUpdate: (grade: Grade) => void;
  className?: string;
};

const GradeSelect: React.FC<Props> = ({ grade, onUpdate, className }) => {
  const onChange = (e: any) => onUpdate(e.value);

  if (grade) {
    return <span>{gradeToOption[grade].name}</span>;
  }

  return (
    <SelectButton
      value={grade}
      options={options}
      onChange={onChange}
      optionLabel="name"
      className={className}
    />
  );
};

export default GradeSelect;
