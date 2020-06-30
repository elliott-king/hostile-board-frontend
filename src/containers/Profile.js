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
        <h4>Applicants</h4>
        {applications.map(app => {
          return (
            <div key={app.id}>
              <p><strong>{app.user.first_name} {app.user.last_name}</strong> for:</p>
              <p><Link to={`/applications/${app.id}`}>{app.position.title}</Link></p>
            </div>
          )
        })}
        </div>
      )
    }
    else {
      return (
        <div id="user-applications" className="profile-applications-container">
          <h4>Your Applications</h4>
          {applications.map(app => {
            return <p key={app.id}><Link to={`/applications/${app.id}`}>{app.position.title}</Link></p>
          })}
        </div>
      )
    }
  }
  const renderPositions = () => {
    if (!loggedInUser.is_company) return null
    return (
      <div id="company-positions">
      <h4>Your Postings</h4>
        {positions.map(pos => {
          return <p key={pos.id}><Link to={`/positions/${pos.id}`}>{pos.title}</Link></p>
        })}
      </div>
    )
  }
  const renderMessages = () => {
    return (
      <div id="user-messages">
        <h4>Inbox</h4>
        {messages.map(message => <p key={message.id}><Link to={`/messages/${message.id}`} >{message.content}</Link></p>)}
      </div>
    )
  }
  
  return (
    <div id="user-profile">
      <h4>Welcome, {loggedInUser.first_name}</h4>
      {renderMessages()}
      {renderPositions()}
      {renderApplications()}
    </div>
  )
}