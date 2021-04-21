import { DeckDto } from "@skill-test/data/dto/learn/DeckDto";
import { handleError, handleResponse, xsrf } from "./apiUtils";

const baseUrl = process.env.API_URL + "/api/decks";

export function getDecks(): Promise<DeckDto[]> {
  return fetch(baseUrl, {
    method: "GET", // POST for create, PUT to update when id already exists.
    headers: xsrf({
      "content-type": "application/json",
    }),
  })
    .then((response) => handleResponse(response))
    .catch(handleError);
}

export function getDeck(id: number): Promise<DeckDto> {
  return fetch(baseUrl + "/" + id, {
    method: "GET", // POST for create, PUT to update when id already exists.
    headers: xsrf({
      "content-type": "application/json",
    }),
  })
    .then((response) => handleResponse(response))
    .catch(handleError);
}
