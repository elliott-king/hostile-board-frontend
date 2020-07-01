import React from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import 'styles/App.css';
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
    event.preventDefault()
    this.setState({loggedInUser: {}})
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/positions">Positions</Link></li>
              {this.state.loggedInUser.email ? null : <li><Link to="/login">Log In</Link></li>}
              {this.state.loggedInUser.email ? null : <li><Link to="/signup">Sign Up</Link></li>}
              {this.state.loggedInUser.email ? <li><Link to="/profile">Profile</Link></li> : null}
              {this.state.loggedInUser.email ? <li><a href="/" onClick={this.handleLogout}>Log Out</a></li> : null}
            </ul>
          </nav>
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
      </Router>
    )
  }
}

export default App;
