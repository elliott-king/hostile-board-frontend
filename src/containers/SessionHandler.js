import React from 'react'
import {useRouteMatch} from 'react-router-dom'

import LoginForm from 'components/LoginForm'
import SignupForm from 'components/SignupForm'

const SessionHandler = (props) => {
  let {loggedInUser, attemptLogin, newUserHandler} = props
  const {path} = useRouteMatch()

  let renderLogin = () => {
    return <LoginForm attemptLogin={attemptLogin} />
  }
  let renderSignup = () => {
    return <SignupForm newUserHandler={newUserHandler} />
  }
  let renderLoggedInUser = () => {
    return <div>Logged in as: {loggedInUser.first_name} {loggedInUser.last_name} {loggedInUser.email}</div>
  }

  let chooseContainerToRender = () => {
    if (loggedInUser.email) return renderLoggedInUser()
    if (path.includes('login')) return renderLogin()
    else return renderSignup()
  }

  return (
    <React.Fragment>
      <p>Session Handler</p>
      <div className="session-container">
        {chooseContainerToRender()}
      </div>
    </React.Fragment>
  )
}

export default SessionHandler