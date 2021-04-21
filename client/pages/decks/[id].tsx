import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import HeaderMenu from '../../src/components/HeaderMenu'
import { fetchDeck, selectDeck } from '../../src/lib/slices/decksSlice'
import DeckView from '../../src/components/Deck/DeckView'
import { LoadingState } from '../../src/lib/LoadingState'

const DeckPage = () => {
  const router = useRouter();
  let deckId = parseInt(router.query.id)
  
  const dispatch = useDispatch()
  const { deck, deckLoading, deckLoadingError } = useSelector(selectDeck)

  useEffect(() => {
    if (deckId) dispatch(fetchDeck(deckId))
  }, [dispatch, deckId])

  return (
    <div className="App">
      <HeaderMenu />
      {
        deckLoading === LoadingState.LOADED && deck ? 
          <DeckView deck={deck}/> : <>{deckLoading}</>
      }
      
    </div>
  )
}

export default DeckPage
