import React, { useEffect , useState} from 'react'
import {useParams, useHistory, Link} from 'react-router-dom'

import { getPosition, createApplication } from 'requests'
import ApplicationForm from 'containers/ApplicationForm'

const Position = (props) => {
  const {positionId} = useParams()
  const [position, setPosition] = useState({})
  const [apply, setApplying] = useState(false)
  const history = useHistory()

  // Using useEffect: 
  // https://itnext.io/add-state-and-lifecycle-methods-to-function-components-with-react-hooks-8e2bdc44d43d
  // Using fetch w/ useEffect:
  // https://www.robinwieruch.de/react-hooks-fetch-data
  useEffect(() => {
    const fetchData = async () => {
      const position = await getPosition(positionId)
      setPosition(position)
    }
    const checkAndUpdateUser = async () => {
      if(props.loggedInUser.email && !props.loggedInUser.resume) {
        props.updateUser()
      }
    }
    fetchData()
    checkAndUpdateUser()
  }, [positionId, props])

  const submitApplication = async(application) => {
    let ret = await createApplication(application)
    history.push(`/applications/${ret.id}`)
  }

  const renderCompany = () => {
    if (!position.company) return null

    // Not all companies have logos
    const renderCompanyImage = (company) => {
      if (!company.company_logo) return null
      return <img className="company-logo" src={company.company_logo} alt={`logo of ${company.name}`}/>
    }
    return (
      <div className="position-company-card">
        <Link to={`/companies/${position.company_id}`}>
          <h4 className="subtitle">{position.company.name}</h4>
          {renderCompanyImage(position.company)}
        </Link>
      </div>
    )
  }

  const renderApplication = () => {
    if (!props.loggedInUser.email) return null
    if (!apply) return <button className="button is-warning" onClick={() => setApplying(true)}>Apply</button> 
    else return (
      <React.Fragment>
        <hr/>
        <ApplicationForm
          cancelApply={() => setApplying(false)}
          positionId={position.id} 
          submitApplication={submitApplication}
          loggedInUser={props.loggedInUser}
        />
      </React.Fragment>
    )
  }

  return (
    <div className="position-container">
      <h1 className="title">{position.title}</h1>
      {renderCompany()}
      <p style={{whiteSpace: "pre-wrap"}}>{position.description}</p>
      {renderApplication()}
    </div>
  )
}
export default Position