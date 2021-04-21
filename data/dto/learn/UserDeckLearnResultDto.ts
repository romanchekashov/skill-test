import { UserDto } from "../UserDto";
import { DeckDto } from "./DeckDto";
import { UserCardAnswerDto } from "./UserCardAnswerDto";

export class UserDeckLearnResultDto {
  id?: number;
  user!: UserDto;
  deck!: DeckDto;
  result: UserCardAnswerDto[] = [];
}
