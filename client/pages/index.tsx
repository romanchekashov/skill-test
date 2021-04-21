
import { DeckDto } from '@skill-test/data/dto/learn/DeckDto'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import DeckThumbnailList from '../src/components/DeckThumbnailList/DeckThumbnailList'
import HeaderMenu from '../src/components/HeaderMenu'
import { fetchDecks, selectDecks } from '../src/lib/slices/decksSlice'
import { LoadingState } from '../src/lib/LoadingState'

const IndexPage = () => {
  const dispatch = useDispatch()
  const { decks, decksLoading, decksLoadingError } = useSelector(selectDecks)

  useEffect(() => {
    dispatch(fetchDecks())
  }, [dispatch])

  return (
    <div className="App">
      <HeaderMenu />
      {
        decksLoading === LoadingState.LOADED ? <DeckThumbnailList decks={decks}/> : <>{decksLoading}</>
      }
      
    </div>
  )
}

export default IndexPage
