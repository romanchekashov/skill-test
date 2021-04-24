import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeckThumbnailList from "../src/components/DeckThumbnailList/DeckThumbnailList";
import HeaderMenu from "../src/components/Header/HeaderMenu";
import { LoadingState } from "../src/lib/LoadingState";
import { fetchDecks, selectDecks } from "../src/lib/slices/decksSlice";

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
//   const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
//   return { userAgent, cookie };
// };

export default IndexPage;
