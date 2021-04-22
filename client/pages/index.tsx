import { DeckDto } from "@skill-test/data/dto/learn/DeckDto";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DeckThumbnailList from "../src/components/DeckThumbnailList/DeckThumbnailList";
import HeaderMenu from "../src/components/HeaderMenu";
import { fetchDecks, selectDecks } from "../src/lib/slices/decksSlice";
import { LoadingState } from "../src/lib/LoadingState";
import dataStore from "../src/api/dataStore";

const IndexPage = () => {
  const dispatch = useDispatch();
  const { decks, decksLoading, decksLoadingError } = useSelector(selectDecks);

  useEffect(() => {
    dispatch(fetchDecks());
  }, [dispatch]);

  return (
    <div className="App">
      <HeaderMenu />
      {decksLoading === LoadingState.LOADED ? (
        <DeckThumbnailList decks={decks} />
      ) : (
        <>{decksLoading}</>
      )}
    </div>
  );
};

// export async function getServerSideProps(context) {
//   console.log(context);
//   return {
//     props: {}, // will be passed to the page component as props
//   };
// }

// IndexPage.getInitialProps = async ({ req }) => {
//   const cookie = req ? req.headers.cookie : document.cookie;
//   console.log(cookie);
//   dataStore.setCookieStore(cookie);
//   const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
//   return { userAgent };
// };

export default IndexPage;
