import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLang, selectLangs } from "../../app/langs/langsSlice";
import { Language } from "../../types/Language";
import styles from "./LangSelect.module.scss";

const langOptions = [
  { name: "EN English", code: Language.en },
  { name: "RU Русский", code: Language.ru },
];

type Props = {};

const LangSelect: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const { selectedLang } = useAppSelector(selectLangs);
  const [appendTo, setAppendTo] = useState<any>(document.body);

  useEffect(() => {
    setAppendTo(document.querySelector("." + styles.select));
  }, []);

  const onChange = (e: any) => {
    dispatch(selectLang(e.value.code));
  };

  return (
    <div className={styles.select}>
      <Dropdown
        value={langOptions.find(({ code }) => code === selectedLang)}
        appendTo={appendTo}
        options={langOptions}
        onChange={onChange}
        optionLabel="name"
        placeholder="Select a Lang"
      />
    </div>
  );
};

export default LangSelect;
