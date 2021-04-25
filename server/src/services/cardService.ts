import { CardDto } from "@skill-test/data/dto/learn/CardDto";
import { CardTranslationDto } from "@skill-test/data/dto/learn/CardTranslationDto";
import { CardEntity } from "../dao/models/learn/CardEntity";
import {
  ASSOCIATION_ALIAS_CARD_TO_CARD_TRANSLATIONS,
  CardTranslationEntity,
} from "../dao/models/learn/CardTranslationEntity";
import {
  mapCardDtoToEntity,
  mapCardTranslationDtoToEntity,
  mapEntityToDtoCard,
  mapEntityToDtoCardTranslation,
} from "../utils/converter";

export interface CardsFilter {
  deck_id?: number;
}

const getAll = ({ deck_id }: CardsFilter): Promise<CardDto[]> => {
  let _filter = {};
  if (deck_id) {
    _filter = {
      where: {
        deck_id,
      },
    };
  }
  return CardEntity.findAll(_filter).then((cards) =>
    cards.map(mapEntityToDtoCard)
  );
};

const getById = (id: number): Promise<CardDto> => {
  return CardEntity.findByPk(id, {
    include: [
      {
        model: CardTranslationEntity,
        as: ASSOCIATION_ALIAS_CARD_TO_CARD_TRANSLATIONS,
      },
    ],
  }).then((entity) => {
    if (!entity) throw new Error(`Deck ${id} not found`);
    return mapEntityToDtoCard(entity);
  });
};

const createOrUpdate = (dto: CardDto): Promise<CardDto> => {
  return createOrUpdateCard(dto).then((entity) => {
    const cardDto = mapEntityToDtoCard(entity);
    return Promise.all(
      dto.translations.map((tr) => {
        tr.card_id = entity.id;
        return createOrUpdateTranslation(tr, tr.card_id);
      })
    ).then((translations) => {
      cardDto.translations = translations;
      return cardDto;
    });
  });
};

const createOrUpdateCard = (dto: CardDto): Promise<CardEntity> => {
  const { id } = dto;
  if (id) {
    return CardEntity.findByPk(id).then((card) => {
      if (!card) throw new Error(`Card ${id} not found`);
      const entity = mapCardDtoToEntity(dto);
      entity.id = id;
      return card.update(entity);
    });
  }
  return CardEntity.create(mapCardDtoToEntity(dto));
};

const createOrUpdateTranslation = (
  dto: CardTranslationDto,
  card_id: number
): Promise<CardTranslationDto> => {
  const { lang } = dto;
  return CardTranslationEntity.findOne({
    where: { card_id, lang },
  })
    .then((card) => {
      const entity = mapCardTranslationDtoToEntity(dto, card_id);
      if (card) {
        return card.update(entity);
      }
      return CardTranslationEntity.create(entity);
    })
    .then(mapEntityToDtoCardTranslation);
};

export default {
  getAll,
  getById,
  createOrUpdate,
};
