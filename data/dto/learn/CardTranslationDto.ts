import { Language } from "../Language";

export class CardTranslationDto {
  card_id?: number;
  lang!: Language;
  default_lang: boolean = false;
  question!: string;
  answer!: string;
  explanation?: string;
}
