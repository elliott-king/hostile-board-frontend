import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import 'styles/App.css';
import 'bulma/css/bulma.css'

import {getPositions, createSession, createUser} from 'requests'
import PositionsSearch from 'containers/PositionsSearch'
import SessionHandler from 'containers/SessionHandler'
import {Profile} from 'containers/Profile'
import {Message} from 'components/Message'
import {Company} from 'components/Company'
import {Application} from 'components/Application'

class App extends React.Component {
  state = {
    positions: [],
    loggedInUser: {},
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

  handleLogout = (event) => {
    this.setState({loggedInUser: {}})
  }

  renderNoUserButtons = () => {
    return (
      <React.Fragment>
        <Link className="button is-primary" to="/login">Log In</Link>
        <Link className="button" to="/signup">Sign Up</Link>
      </React.Fragment>
    )
  }

  renderIsUserButtons = () => {
    return (
      <a href="/" className="button" onClick={this.handleLogout}>Log Out</a>
    )
  }

  render() {
    return (
      <Router>
        <nav className="navbar is-dark" role="navigation" aria-label="main-navigation">
          <div id="bulma-navbar" className="navbar-menu">
            <div className="navbar-start">
              <Link className="navbar-item" to="/">Home</Link>
              <Link to="/positions" className="navbar-item">Positions</Link>
              {this.state.loggedInUser.email ? <Link className="navbar-item" to="/profile">Profile</Link> : null}
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  {this.state.loggedInUser.email ? this.renderIsUserButtons() : this.renderNoUserButtons()}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="centerpiece">
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
              />
            </Route>
            <Route path='/profile'>
              {this.renderProfile()}
            </Route>
            <Route exact path='/'>
              <React.Fragment>
                Welcome to the first day of the rest of your life!
                <div>Home</div>
              </React.Fragment>
            </Route>
          </Switch>
        </div>
        <footer className="patch-footer">
          <div className="columns">
            <div className="column is-one-quarter">
              Feedback
            </div>
            <div className="column">
              <div className="content has-text-centered">
                <p>Hostile Job Board by Elliott King</p>
              </div>
            </div>
          </div>
        </footer>
      </Router>
    )
  }
}

export default App;
