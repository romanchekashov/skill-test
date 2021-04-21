import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import DeckThumbnailList from '../../src/components/DeckThumbnailList/DeckThumbnailList'
import HeaderMenu from '../../src/components/HeaderMenu'
import { tick } from '../../src/lib/slices/clockSlice'
import useInterval from '../../src/lib/useInterval'

const DeckPage = () => {
  // const router = useRouter();
  // const { id } = router.query

  const dispatch = useDispatch()
  // Tick the time every second
  useInterval(() => {
    dispatch(tick({ light: true, lastUpdate: Date.now() }))
  }, 1000)

  return (
    <div className="App">
      <HeaderMenu />
      <DeckThumbnailList />
    </div>
  )
}

export default DeckPage
