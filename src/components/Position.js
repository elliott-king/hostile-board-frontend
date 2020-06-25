import React, { useEffect , useState} from 'react'
import {useParams} from 'react-router-dom'

import { getPosition } from '../requests'

const Position = (props) => {
  const {positionId} = useParams()
  const [position, setPosition] = useState({})

  // Using useEffect: 
  // https://itnext.io/add-state-and-lifecycle-methods-to-function-components-with-react-hooks-8e2bdc44d43d
  // Using fetch w/ useEffect:
  // https://www.robinwieruch.de/react-hooks-fetch-data
  useEffect(() => {
    const fetchData = async () => {
      const position = await getPosition(positionId)
      setPosition(position)
    }
    fetchData()
  }, [positionId])

  return (
    <div>
      <h2>{position.title}</h2>
      <p>{position.description}</p>
    </div>
  )
}
export default Position