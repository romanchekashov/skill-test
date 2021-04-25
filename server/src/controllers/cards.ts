import { CardDto } from "@skill-test/data/dto/learn/CardDto";
import { Request, Response, Router } from "express";
import { CardEntity } from "../dao/models/learn/CardEntity";
import { DeckEntity } from "../dao/models/learn/DeckEntity";
import { sendRes } from "../utils/controller_utils";
import { mapCardDtoToEntity, mapEntityToDtoCard } from "../utils/converter";

const cardsRouter = Router();

const isDeckBelongToUser = (
  deckId: number,
  authorId: number
): Promise<void> => {
  return DeckEntity.findByPk(deckId).then((deck) => {
    if (!deck) throw new Error(`Deck ${deckId} not found`);
    if (authorId !== deck.author_id)
      throw new Error(`Deck ${deckId} is not yours`);
  });
};

cardsRouter.get("/", (req: Request, res: Response) => {
  const deckId = req.query.deckId;
  let filter = {};
  if (deckId) {
    filter = {
      where: {
        deck_id: deckId,
      },
    };
  }

  sendRes(
    CardEntity.findAll(filter).then((cards) => cards.map(mapEntityToDtoCard)),
    res
  );
});

cardsRouter.post("/", (req: Request, res: Response) => {
  const dto: CardDto = req.body;
  sendRes(
    isDeckBelongToUser(dto.deckId, req.user.id)
      .then(() => {
        const { id } = dto;
        if (!id) return CardEntity.create(mapCardDtoToEntity(dto));

        return CardEntity.findByPk(id).then((card) => {
          if (!card) throw new Error(`Card ${id} not found`);
          const entity = mapCardDtoToEntity(dto);
          return card.update({ ...entity, id });
        });
      })
      .then(mapEntityToDtoCard),
    res
  );
});

export default cardsRouter;
