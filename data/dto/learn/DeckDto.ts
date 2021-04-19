import { UserDto } from "../UserDto";
import { CategoryDto } from "../CategoryDto";
import { CardDto } from "./CardDto";

export class DeckDto {
  id!: number;
  name!: string;
  previewImg?: string;
  categories: CategoryDto[] = [];
  cards: CardDto[] = [];
  author!: UserDto;
}
