import { CardDto } from "./CardDto";
import { Grade } from "./Grade";

export class UserCardAnswerDto {
  card!: CardDto;
  answer?: string;
  grade?: Grade;
}
