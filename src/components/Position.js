import React, { useEffect , useState} from 'react'
import {useParams} from 'react-router-dom'

import { getPosition, createApplication } from '../requests'
import ApplicationForm from '../containers/ApplicationForm'

const Position = (props) => {
  const {positionId} = useParams()
  const [position, setPosition] = useState({})
  const [apply, setApplying] = useState(false)

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

  const submitApplication = async(application) => {
    let ret = await createApplication(application)
    setApplying(false)

    // TODO: maybe do something with the returned application?
    // TODO: add a link to the application from this screen if user has already applied to this job
    console.log(ret)
  }

  const renderApplication = () => {
    if (!apply) return null 
    else return <ApplicationForm positionId={position.id} submitApplication={submitApplication}/>
  }

  return (
    <div>
      <h2>{position.title}</h2>
      <p>{position.description}</p>
      <button onClick={() => setApplying(true)}>Apply</button>
      {renderApplication()}
    </div>
  )
}
export default Position