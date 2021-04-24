import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeckLearn from "../../components/Deck/DeckLearn";
import DeckView from "../../components/Deck/DeckView";
import HeaderMenu from "../../components/Header/HeaderMenu";
import { DeckMode } from "../../app/DeckMode";
import { LoadingState } from "../../app/LoadingState";
import { fetchDeck, selectDeck } from "../../app/slices/decksSlice";

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
