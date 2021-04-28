import { CardDto } from "./CardDto";
import { Grade } from "./Grade";

export class UserCardAnswerDto {
  card!: CardDto;
  answer?: string;
  grade?: Grade;
  incorrect: number = 0;
  almost: number = 0;
  correct: number = 0;
  // eFactor: number = 2.5;
}
