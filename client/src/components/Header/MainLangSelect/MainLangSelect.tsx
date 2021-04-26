import { SplitButton } from "primereact/splitbutton";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectLangs, setLocale } from "../../../app/slices/langsSlice";
import { Language } from "../../../types/Language";
import styles from "./MainLangSelect.module.scss";

const icon = "pi pi-circle-off";
const iconActive = "pi pi-circle-on";

type Props = {};

const MainLangSelect: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const { locale } = useAppSelector(selectLangs);

  const [label, setLabel] = useState("");
  const [items, setItems] = useState([
    {
      label: "EN English",
      locale: Language.en,
      icon: iconActive,
      command: () => dispatch(setLocale(Language.en)),
    },
    {
      label: "RU Русский",
      locale: Language.ru,
      icon,
      command: () => dispatch(setLocale(Language.ru)),
    },
  ]);

  useEffect(() => {
    setLabel(locale.toUpperCase());
    setItems(
      items.map((item) => {
        item.icon = item.locale === locale ? iconActive : icon;
        return item;
      })
    );
  }, [locale]);

  return (
    <>
      <SplitButton
        id="lang-select"
        label={label}
        icon="pi pi-globe"
        model={items}
        className={"p-button-secondary " + styles.select}
      ></SplitButton>
    </>
  );
};

export default MainLangSelect;
