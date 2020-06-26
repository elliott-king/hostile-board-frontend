import React, {useState} from 'react'

import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

const SessionHandler = (props) => {
  let {loggedInUser, attemptLogin, newUserHandler} = props
  let [loginStatus, changeLoginStatus] = useState(true)

  let renderLogin = () => {
    return <LoginForm attemptLogin={attemptLogin} />
  }
  let renderSignup = () => {
    return <SignupForm newUserHandler={newUserHandler} />
  }
  let renderLoggedInUser = () => {
    return <div>Logged in as: {loggedInUser.email}</div>
  }

  let renderSignupLoginContainer = () => {
    return (
      <React.Fragment>
        <button onClick={() => changeLoginStatus(!loginStatus)}>
          {loginStatus ? "Sign Up" : "Log In"}
        </button>
        {loginStatus ? renderLogin() : renderSignup()}
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <p>Session Handler</p>
      <div className="session-container">
        {loggedInUser.email ? renderLoggedInUser() : renderSignupLoginContainer()}
      </div>
    </React.Fragment>
  )
}

export default SessionHandler