import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import 'styles/App.css';
import 'bulma/css/bulma.css'

import {getPositions, createSession, createUser, getUser} from 'requests'
import PositionsSearch from 'containers/PositionsSearch'
import SessionHandler from 'containers/SessionHandler'
import {Profile} from 'containers/Profile'
import {Message} from 'components/Message'
import {Company} from 'components/Company'
import {Application} from 'components/Application'
import Feedback from 'components/Feedback';
import explodeAll from 'explosion'

class App extends React.Component {
  state = {
    positions: [],
    loggedInUser: {},
    feedback: false,
  }

  async componentDidMount() {
    let positions = await getPositions()
    this.setState({positions})
  }

  renderProfile = () => {
    if (!this.state.loggedInUser.email) return <p>You must be logged in to view this page.</p>
    else return <Profile loggedInUser={this.state.loggedInUser} /> 
  }

  attemptLogin = async(userLogin) => {
    const loggedInUser = await createSession(userLogin)
    console.log('user response: ', loggedInUser)
    if (loggedInUser.error === 'User not found') console.error('User not found')
    else this.setState({loggedInUser})
  }

  newUser = async(userSignup) => {
    const newUser = await createUser(userSignup)
    if (newUser.error) console.error("Problem with creating user:", newUser.error)
    else {
      const loggedInUser = newUser
      this.setState({loggedInUser})
    } 
  }

  updateUser = async() => {
    if (!this.state.loggedInUser.email) console.error('Attempting to update user when no use is logged in')
    else {
      const user = await getUser(this.state.loggedInUser.id)
      this.setState({loggedInUser: user})
    }
  }

  handleLogout = (event) => {
    this.setState({loggedInUser: {}})
  }

  handleFeedbackSubmit = (content) => {
    explodeAll()
  }

  renderNoUserButtons = () => {
    return (
      <div className="navbar-item">
        <div className="buttons">
          <Link className="button is-primary" to="/login">Log In</Link>
          <Link className="button" to="/signup">Sign Up</Link>
        </div>
      </div>
    )
  }

  renderIsUserButtons = () => {
    return (
      <React.Fragment>
        <div className="navbar-item">
          <p>{this.state.loggedInUser.first_name} {this.state.loggedInUser.last_name}</p>
        </div>
        <div className="navbar-item">
          <a href="/" className="button" onClick={this.handleLogout}>Log Out</a>
        </div>
      </React.Fragment>
    )
  }

  render() {
    return (
      <Router>
        <nav id="navbar" className="navbar is-dark" role="navigation" aria-label="main-navigation">
          <div id="bulma-navbar" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/">Home</Link>
              <Link to="/positions" className="navbar-item">Positions</Link>
              {this.state.loggedInUser.email ? <Link className="navbar-item" to="/profile">Profile</Link> : null}
            </div>
            <div className="navbar-end">
              {this.state.loggedInUser.email ? this.renderIsUserButtons() : this.renderNoUserButtons()}
            </div>
          </div>
        </nav>
        <div id="centerpiece" className="centerpiece">
          <Switch>
            <Route path={`/companies/:companyId`}>
              <Company/>
            </Route>
            <Route path={`/applications/:applicationId`}>
              <Application loggedInUser={this.state.loggedInUser}/>
            </Route>
            <Route path={`/messages/:messageId`}>
              <Message loggedInUser={this.state.loggedInUser}/>
            </Route>
            <Route path='/login'>
              <SessionHandler 
                loggedInUser={this.state.loggedInUser}
                attemptLogin={this.attemptLogin} 
              />
            </Route>
            <Route path='/signup'>
              <SessionHandler 
                loggedInUser={this.state.loggedInUser} 
                newUserHandler={this.newUser}
              />
            </Route>
            <Route path='/positions'>
              <PositionsSearch 
                positions={this.state.positions}
                loggedInUser={this.state.loggedInUser}
                updateUser={this.updateUser}
              />
            </Route>
            <Route path='/profile'>
              {this.renderProfile()}
            </Route>
            <Route exact path='/'>
              <div id="main-page">
                <h1 className="title is-centered">
                  Welcome to the first day of the rest of your life!
                </h1>
              </div>
            </Route>
          </Switch>
        </div>
        {this.state.feedback ? <Feedback submit={this.handleFeedbackSubmit}/> : null}
        <footer id="footer" className="patch-footer">
          <div className="columns">
            <div className="column is-one-quarter">
              <button className="button is-dark" onClick={() => this.setState({feedback: true})}>Feedback</button>
            </div>
            <div className="column">
              <div className="content has-text-centered">
                <p>Adversity Job Board by Elliott King</p>
              </div>
            </div>
          </div>
        </footer>
      </Router>
    )
  }
}

export default App;
