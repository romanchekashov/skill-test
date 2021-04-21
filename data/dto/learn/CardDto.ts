export class CardDto {
  id?: number;
  deckId!: number;
  question!: string;
  answer!: string;
  explanation?: string;
}
