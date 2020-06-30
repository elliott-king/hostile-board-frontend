import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'

import {getApplication, getMessagesForApplication, createMessage} from 'requests'
import {MessageForm} from 'components/MessageForm'

export const Application = (props) => {
  const {loggedInUser} = props
  const {applicationId} = useParams()
  const [application, setApplication] = useState({})
  const [messages, setMessages] = useState([])


  useEffect(() => {
    const fetchApplication = async () => {
      const application = await getApplication(applicationId)
      setApplication(application)
    }
    const fetchMessages = async() => {
      let messages = await getMessagesForApplication(applicationId)
      messages.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
      setMessages(messages)
    }
    fetchApplication()
    fetchMessages()
  }, [applicationId])

  const handleMessageSubmit = async(content) => {
    const newMessage = await createMessage(application.id, application.user_id, content)
    if (newMessage) {
      setMessages(prev => [newMessage].concat(prev))
    }
  }

  const renderMessages = () => {
    return messages.map(m => {
      return (
        <div key={m.id}>
          <p>{m.content}</p>
          <p>{(new Date(m.created_at)).toString()}</p>
          <br/>
        </div>
      )
    })
  }

  const renderApplicationInfo = () => {
    if (!application.position) return null
    return (
      <div className="application-overview">
        <h2><Link to={`/positions/${application.position.id}`}>{application.position.title}</Link></h2>
        <h4>{application.user.first_name} {application.user.last_name}</h4>
        <div className="application-submitted">
          <h5>Email</h5>
          <p>{application.user.email}</p>
          <h5>Job History</h5>
          <p>{application.job_history}</p>
          <h5>Projects</h5>
          <p>{application.projects}</p>
          <h5>Written Introduction</h5>
          <p>{application.written_introduction}</p>
        </div>
      </div>
    )

  }

  return (
    <div>
      {renderApplicationInfo()}
      <h3>Messages:</h3>
      {renderMessages()}
      <MessageForm
        handleMessageSubmit={handleMessageSubmit} 
        loggedInUser={loggedInUser} 
      />
    </div>
  )
}