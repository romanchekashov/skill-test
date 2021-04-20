import { useDispatch } from 'react-redux'

import Clock from '../src/components/clock'
import Counter from '../src/components/counter'
import { tick } from '../src/lib/slices/clockSlice'
import useInterval from '../src/lib/useInterval'

const IndexPage = () => {
  const dispatch = useDispatch()
  // Tick the time every second
  useInterval(() => {
    dispatch(tick({ light: true, lastUpdate: Date.now() }))
  }, 1000)

  return (
    <>
      <Clock />
      <Counter />
    </>
  )
}

export default IndexPage
