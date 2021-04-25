import { SplitButton } from "primereact/splitbutton";
import React, { useEffect, useState } from "react";
import { getCookie, setCookie } from "../../../utils/cookies";
import styles from "./LangSelect.module.css";

const COOKIE_NAME = "NEXT_LOCALE";
enum Locale {
  EN = "EN",
  RU = "RU",
}
const locales: any = {
  en: Locale.EN,
  ru: Locale.RU,
};

const icon = "pi pi-circle-off";
const iconActive = "pi pi-circle-on";

type Props = {};

const LangSelect: React.FC<Props> = ({}) => {
  const [locale, setLocale] = useState<Locale>(Locale.EN);
  const [items, setItems] = useState([
    {
      label: "EN English",
      locale: Locale.EN,
      icon: iconActive,
      command: () => selectLang(Locale.EN),
    },
    {
      label: "RU Русский",
      locale: Locale.RU,
      icon,
      command: () => selectLang(Locale.RU),
    },
  ]);

  const selectLang = (newLocale: Locale) => {
    const value = (newLocale as string).toLowerCase();
    const lang = getCookie(COOKIE_NAME);
    if (lang !== value) {
      setCookie({ name: COOKIE_NAME, value, path: "/" });
      document.location.reload();
    }
  };

  useEffect(() => {
    const lang = getCookie(COOKIE_NAME);
    if (lang) {
      const newLocale = locales[lang];
      setLocale(newLocale);
      setItems(
        items.map((item) => {
          item.icon = item.locale === newLocale ? iconActive : icon;
          return item;
        })
      );
    }
  }, []);

  return (
    <>
      <SplitButton
        id="lang-select"
        label={locale}
        icon="pi pi-globe"
        model={items}
        className={"p-button-secondary " + styles.select}
      ></SplitButton>
    </>
  );
};

export default LangSelect;
