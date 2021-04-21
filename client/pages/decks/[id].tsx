import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HeaderMenu from "../../src/components/HeaderMenu";
import { fetchDeck, selectDeck } from "../../src/lib/slices/decksSlice";
import DeckView from "../../src/components/Deck/DeckView";
import { LoadingState } from "../../src/lib/LoadingState";
import { DeckMode } from "../../src/lib/DeckMode";
import DeckLearn from "../../src/components/Deck/DeckLearn";

const DeckPage = () => {
  const router = useRouter();
  let deckId = parseInt(router.query.id);

  const dispatch = useDispatch();
  const { mode, deck, deckLoading, deckLoadingError } = useSelector(selectDeck);

  useEffect(() => {
    if (deckId) dispatch(fetchDeck(deckId));
  }, [dispatch, deckId]);

  return (
    <div className="App">
      <HeaderMenu />
      <div className="container">
        {deckLoading === LoadingState.LOADED && deck ? (
          mode === DeckMode.LEARN ? (
            <DeckLearn deck={deck} user={deck.author} />
          ) : (
            <DeckView deck={deck} />
          )
        ) : (
          <>{deckLoading}</>
        )}
      </div>
    </div>
  );
};

export default DeckPage;
