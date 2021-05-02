import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeckMode } from "../../app/decks/DeckMode";
import DeckLearn from "../../app/decks/DeckLearn/DeckLearn";
import { fetchDeck, selectDeck, setMode } from "../../app/decks/decksSlice";
import DeckView from "../../app/decks/DeckView/DeckView";
import { LoadingState } from "../../app/LoadingState";
import HeaderMenu from "../../components/Header/HeaderMenu";

const DeckPage = () => {
  const router = useRouter();
  let deckId = parseInt(router.query.id);

  const dispatch = useDispatch();
  const { mode, deck, deckLoading, deckLoadingError } = useSelector(selectDeck);

  useEffect(() => {
    if (deckId) {
      dispatch(fetchDeck(deckId));
      dispatch(setMode(DeckMode.VIEW));
    }
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
