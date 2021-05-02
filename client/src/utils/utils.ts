// import dataStore from "../api/dataStore";

import { CardDto } from "@skill-test/data/dto/learn/CardDto";
import { Language } from "../app/langs/Language";

export const isProd = (): boolean => process.env.NODE_ENV === "production";

export const _equalArrays = (arr1: any[], arr2: any[]): boolean => {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
};

// export const _isUserLogged = (): boolean => {
//     if (dataStore.getUser()) return true;
//     document.location.href = "/";
//     return false;
// }
// export const redirectToMainPage = () => {
//   if (document.location.href !== "") {
//     document.location.href = "";
//   }
// };
export const isBrowser = () => typeof window !== "undefined";

export const removeNewLines = (text: string): string =>
  text.replace(/\r?\n|\r/g, " ");

export const timeout = (fn: Function, ms?: number): Promise<any> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(fn());
    }, ms)
  );
};

export const fillCardWithTranslation = (
  dto: CardDto,
  locale: Language
): CardDto => {
  const tr =
    dto.translations.find(({ lang }) => lang === locale) ||
    dto.translations.find(({ lang }) => lang === Language.en);

  if (!tr) return dto;

  return {
    ...dto,
    question: tr.question,
    answer: tr.answer,
    explanation: tr.explanation,
  };
};
