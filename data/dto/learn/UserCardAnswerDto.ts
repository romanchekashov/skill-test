import { CardDto } from "./CardDto";
import { Mark } from "./Mark";

export class UserCardAnswerDto {
  card: CardDto;
  answer!: string;
  mark!: Mark;
}
