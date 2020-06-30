import React, {useState} from 'react'

export const MessageForm = (props) => {
  const {handleMessageSubmit, loggedInUser} = props
  const [content, updateContent] = useState("")
  const [show, toggleShow] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    toggleShow(false)
    handleMessageSubmit(content)
  }

  // FIXME: currently only allow companies to send message
  const renderFormButton = () => {
    if (show || !loggedInUser.is_company) return null
    else return <button onClick={() => toggleShow(true)}>New Message</button>
  }

  const renderForm = () => {
    if (!show || !loggedInUser.is_company) return null
    else return (
      <form onSubmit={handleSubmit} >
        <input type="text" value={content} onChange={(e) => updateContent(e.target.value)} />
        <input type="submit" value="New Message" />
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