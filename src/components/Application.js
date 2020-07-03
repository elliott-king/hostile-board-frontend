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
    if (messages.length < 1) return <p>No messages as of yet.</p>
    return messages.map(m => {
      return (
        <div key={m.id} className="box">
          <p>{(new Date(m.created_at)).toString()}</p>
          <hr/>
          <p>{m.content}</p>
          <br/>
        </div>
      )
    })
  }

  const renderApplicationInfo = () => {
    if (!application.position) return null
    return (
      <div className="application-overview">
        <h2 className="title">
          <Link to={`/positions/${application.position.id}`}>{application.position.title}</Link>
        </h2>
        <div className="application-submitted">
          <h2 className="subtitle application-review-title">Email</h2>
          <div className="container">
            <p className="notification">{application.user.email}</p>
          </div>
          <h2 className="subtitle application-review-title">Job History</h2>
          <div className="container">
            <p className="notification" style={{whiteSpace: "pre-wrap"}}>{application.job_history}</p>
          </div>
          <h2 className="subtitle application-review-title">Projects</h2>
          <div className="container">
            <p className="notification" style={{whiteSpace: "pre-wrap"}}>{application.projects}</p>
          </div>
          <h2 className="subtitle application-review-title">Written Introduction</h2>
          <div className="container">
            <p className="notification" style={{whiteSpace: "pre-wrap"}}>{application.written_introduction}</p>
          </div>
        </div>
      </div>
    )

  }

  return (
    <div className="application-container">
      {renderApplicationInfo()}
      <h1 className="title application-review-title">Messages:</h1>
      <MessageForm
        handleMessageSubmit={handleMessageSubmit} 
        loggedInUser={loggedInUser} 
      />
      {renderMessages()}
    </div>
  )
}