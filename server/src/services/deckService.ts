import { DeckDto } from "@skill-test/data/dto/learn/DeckDto";
import { CardEntity } from "../dao/models/learn/CardEntity";
import {
  ASSOCIATION_ALIAS_CARD_TO_CARD_TRANSLATIONS,
  CardTranslationEntity,
} from "../dao/models/learn/CardTranslationEntity";
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
        include: [
          {
            model: CardTranslationEntity,
            as: ASSOCIATION_ALIAS_CARD_TO_CARD_TRANSLATIONS,
          },
        ],
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

const createOrUpdate = (dto: DeckDto, authorId: number): Promise<DeckDto> => {
  return createOrUpdateDeck(dto, authorId).then(mapEntityToDtoDeck);
};

const createOrUpdateDeck = (
  dto: DeckDto,
  authorId: number
): Promise<DeckEntity> => {
  const { id } = dto;
  if (id) {
    return DeckEntity.findByPk(id).then((deck) => {
      if (!deck) throw new Error(`Deck ${id} not found`);
      const entity = mapDeckDtoToEntity(dto, authorId);
      entity.id = id;
      return deck.update(entity);
    });
  }
  return DeckEntity.create(mapDeckDtoToEntity(dto, authorId));
};

export default {
  getAll,
  getById,
  createOrUpdate,
};
