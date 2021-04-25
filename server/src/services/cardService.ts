import { CardDto } from "@skill-test/data/dto/learn/CardDto";
import { CardEntity } from "../dao/models/learn/CardEntity";
import { mapCardDtoToEntity, mapEntityToDtoCard } from "../utils/converter";

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

const createOrUpdate = (dto: CardDto): Promise<CardDto> => {
  const { id } = dto;
  if (!id)
    return CardEntity.create(mapCardDtoToEntity(dto)).then(mapEntityToDtoCard);

  return CardEntity.findByPk(id)
    .then((card) => {
      if (!card) throw new Error(`Card ${id} not found`);
      const entity = mapCardDtoToEntity(dto);
      return card.update({ ...entity, id });
    })
    .then(mapEntityToDtoCard);
};

export default {
  getAll,
  createOrUpdate,
};
