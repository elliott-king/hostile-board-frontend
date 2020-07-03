import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import {getApplicationsForUser, getPositionsForUser, getMessagesForUser} from 'requests'

export const Profile = (props) => {
  const {loggedInUser} = props

  const [positions, updatePositions] = useState([], 'positions')
  const [applications, updateApplications] = useState([], 'applications')
  const [messages, updateMessages] = useState([], 'messages')

  useEffect(() => {
    const fetchApplications = async () => {
      const applications = await getApplicationsForUser(loggedInUser)
      updateApplications(applications)
    }
    const fetchPositions = async () => {
      const positions = await getPositionsForUser(loggedInUser)
      updatePositions(positions)
    }
    const fetchMessages = async () => {
      const messages = await getMessagesForUser(loggedInUser)
      updateMessages(messages)
    }
    fetchApplications()
    fetchPositions()
    fetchMessages()
  }, [loggedInUser])

  const renderApplications = () => {
    if (loggedInUser.is_company) {
      return (
        <div id="company-applications" className="profile-applications-container">
          <h4 className="subtitle">Your Applicants</h4>
          <div className="company-positions-container">
            {applications.map((app, index) => {
              const color = index % 2 ? "patch-white" : "patch-grey"
              return (
                <Link key={app.id} to={`/applications/${app.id}`}>
                  <div className={`columns position-card ${color}`}>
                    <p className="has-text-left column is-one-quarter"><strong>{app.user.first_name} {app.user.last_name}</strong></p>
                    <p className="column">{app.position.title}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )
    }
    else {
      return (
        <div id="user-applications" className="profile-applications-container">
          <h4 className="subtitle">Your Applications</h4>
          {applications.map((app, index) => {
            const color = index % 2 ? "patch-white" : "patch-grey"
            return (
              <Link key={app.id} to={`/applications/${app.id}`}>
                <div id={`application-${app.id}`} className={`position-card ${color}`}>
                  <div className="position-card-title">
                      <h3 className="subtitle">{app.position.title}</h3>
                    </div>
                  <div className="position-card-body columns">
                      <p className="column is-three-quarters">{app.position.company.name}</p>
                      <p className="column">{app.position.city}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )
    }
  }
  const renderPositions = () => {
    if (!loggedInUser.is_company) return null
    return (
      <React.Fragment>
        <div id="company-positions">
          <h4 className="subtitle">Your Postings</h4>
          <div className="company-positions-container">
            {positions.map((pos, index) => {
                const color = index % 2 ? "patch-white" : "patch-grey"
                return (
                  <Link key={pos.id} to={`/positions/${pos.id}`}>
                    <div id={`positions-${pos.id}`} className={`columns position-card ${color}`}>
                        <p className="has-text-left column">{pos.title}</p>
                        <p className="column is-one-quarter">{pos.city}</p>
                    </div>
                  </Link>
                )
            })}
          </div>
          <button className="button is-info" style={{float: "right", margin: "0.5rem 1rem"}}>New Position</button>
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
      </React.Fragment>
    )
  }
  const renderMessages = () => {
    return (
      <div id="user-messages">
        <h4 className="subtitle">Inbox</h4>
        {messages.map(message => <p key={message.id}><Link to={`/messages/${message.id}`} >{message.content}</Link></p>)}
      </div>
    )
  }
  
  return (
    <div id="user-profile">
      <h1 className="title">Welcome, {loggedInUser.first_name}</h1>
      {/* {renderMessages()} */}
      {renderPositions()}
      {renderApplications()}
    </div>
  )
}