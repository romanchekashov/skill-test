import { DeckDto } from "@skill-test/data/dto/learn/DeckDto";
import { CardEntity } from "../dao/models/learn/CardEntity";
import {
  ASSOCIATION_ALIAS_DECK_TO_CARD,
  ASSOCIATION_ALIAS_DECK_TO_USER,
  DeckEntity,
} from "../dao/models/learn/DeckEntity";
import { UserEntity } from "../dao/models/UserEntity";
import { mapDeckDtoToEntity, mapEntityToDtoDeck } from "../utils/converter";

const getAll = (): Promise<DeckDto[]> => {
  return DeckEntity.findAll().then((decks) => decks.map(mapEntityToDtoDeck));
};

const getById = (id: number): Promise<DeckDto> => {
  return DeckEntity.findByPk(id, {
    include: [
      {
        model: UserEntity,
        as: ASSOCIATION_ALIAS_DECK_TO_USER,
      },
      {
        model: CardEntity,
        as: ASSOCIATION_ALIAS_DECK_TO_CARD,
      },
    ],
  }).then((deck) => {
    if (!deck) throw new Error(`Deck ${id} not found`);

    const dto = mapEntityToDtoDeck(deck);
    dto.cards.sort((a, b) => (a.id || 0) - (b.id || 0));
    // console.log(deck, dto);
    return dto;
  });
};

const create = (dto: DeckDto, authorId: number): Promise<DeckDto> => {
  return DeckEntity.create(mapDeckDtoToEntity(dto, authorId)).then(
    mapEntityToDtoDeck
  );
};

export default {
  getAll,
  getById,
  create,
};
