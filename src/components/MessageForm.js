import React, {useState} from 'react'
import _ from 'lodash'

import {messages} from '../utils/constants'

export const MessageForm = (props) => {
  const {handleMessageSubmit, loggedInUser} = props
  const [content, updateContent] = useState("")
  const [show, toggleShow] = useState(false)

  const sendRandomMessage = (event) => {
    toggleShow(false)
    const message = _.sample(messages)
    handleMessageSubmit(message)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    toggleShow(false)
    updateContent("")
    handleMessageSubmit(content)
  }

  // FIXME: currently only allow companies to send message
  const renderFormButton = () => {
    if (show || !loggedInUser.is_company) return null
    else return (
      <React.Fragment>
        <button className="button is-info" onClick={() => toggleShow(true)}>New Message</button>
        <button className="button is-danger" onClick={sendRandomMessage}>Automated Message</button>
      </React.Fragment>
    )
  }

  const renderForm = () => {
    if (!show || !loggedInUser.is_company) return null
    else return (
      <form onSubmit={handleSubmit} >
      <div className="field">
        <div className="control">
        <textarea 
          className="textarea"
          type="text" 
          value={content} 
          onChange={(e) => updateContent(e.target.value)}
        />
        </div>
      </div>
        <input className="button is-primary" type="submit" value="Send" />
        <button className="button is-warn" onClick={() => toggleShow(false)}>Cancel</button>
      </form>
    )
  }

  return (
    <div className="message-form">
      {renderFormButton()}
      {renderForm()}
    </div>
  )
}