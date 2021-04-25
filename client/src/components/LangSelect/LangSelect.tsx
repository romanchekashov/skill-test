import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { Language } from "../../types/Language";
import { getCookie, setCookie } from "../../utils/cookies";
import styles from "./LangSelect.module.scss";

const COOKIE_NAME = "NEXT_LOCALE";
enum Locale {
  EN = "EN",
  RU = "RU",
}
const locales: readonly string[] = Object.values(Language);
const cities = [
  { name: "EN English", code: Language.en },
  { name: "RU Русский", code: Language.ru },
];

const icon = "pi pi-circle-off";
const iconActive = "pi pi-circle-on";

type Props = {};

const LangSelect: React.FC<Props> = ({}) => {
  const [locale, setLocale] = useState<Locale>(Locale.EN);
  const [items, setItems] = useState<any>(cities);

  const selectLang = (newLocale: Locale) => {
    const value = (newLocale as string).toLowerCase();
    const lang = getCookie(COOKIE_NAME);
    if (lang !== value) {
      setCookie({ name: COOKIE_NAME, value, path: "/" });
      document.location.reload();
    }
  };

  useEffect(() => {
    setItems(cities);
    setSelectedCity1(cities[0]);
  }, []);

  const [selectedCity1, setSelectedCity1] = useState<any>(cities[0]);

  const onCityChange = (e: any) => {
    setSelectedCity1(e.value);
  };

  return (
    <div className={styles.select}>
      <Dropdown
        value={selectedCity1}
        appendTo={document.querySelector("." + styles.select)}
        style={{ top: "0 !important", left: "0 !important" }}
        options={items}
        onChange={onCityChange}
        optionLabel="name"
        placeholder="Select a City"
      />
    </div>
  );
};

export default LangSelect;
