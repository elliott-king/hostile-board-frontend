import React from 'react'
import {useRouteMatch} from 'react-router-dom'

import LoginForm from 'components/LoginForm'
import SignupForm from 'components/SignupForm'

const SessionHandler = (props) => {
  let {loggedInUser, attemptLogin, newUserHandler} = props
  const {path} = useRouteMatch()

  let renderLogin = () => {
    return (
      <React.Fragment>
        <h1 className="title">Log In</h1>
        <LoginForm attemptLogin={attemptLogin} />
      </React.Fragment>
    )
  }
  let renderSignup = () => {
    return (
      <React.Fragment>
        <h1 className="title">Sign Up</h1>
        <SignupForm newUserHandler={newUserHandler} />
      </React.Fragment>
    )
  }
  let renderLoggedInUser = () => {
    return <h1 className="subtitle">Logged in as: {loggedInUser.first_name} {loggedInUser.last_name} {loggedInUser.email}</h1>
  }

  let chooseContainerToRender = () => {
    if (loggedInUser.email) return renderLoggedInUser()
    if (path.includes('login')) return renderLogin()
    else return renderSignup()
  }

  return (
    <div className="session-container">
      <div className="session-popout box">
        {chooseContainerToRender()}
      </div>
    </div>
  )
}

export default SessionHandler