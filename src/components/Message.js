import React, {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'

import {getMessage} from '../requests'

export const Message = (props) => {
  const {messageId} = useParams()
  const [message, setMessage] = useState({})
  
  useEffect(() => {
    const fetchData = async () => {
      const message = await getMessage(messageId)
      setMessage(message)
    }
    fetchData()
  }, [messageId])

  return (
    <div id="message-container-div">
      <h2>{message.content}</h2>
      <Link to={`/positions/${message.position_id}`}>Job Position</Link>
      <br/>
      <Link to={`/companies/${message.company_id}`}>Company</Link>
    </div>
  )
}