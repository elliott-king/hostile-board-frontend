import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import {getPositions, createSession, createUser} from './requests'
import PositionsSearch from './containers/PositionsSearch'
import SessionHandler from './containers/SessionHandler'
import {Message} from './components/Message'
import {Company} from './components/Company'
import {Application} from './components/Application'

class App extends React.Component {
  state = {
    positions: [],
    loggedInUser: {},
  }

  async componentDidMount() {
    let positions = await getPositions()
    this.setState({positions})
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
      const loggedInUser = await createSession(newUser)
      this.setState({loggedInUser})
    } 
  }

  render() {
    return (
      <Router>
        <div>
          <nav>
            Welcome to the first day of the rest of your life!
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/positions">Positions</Link></li>
              <li><Link to="/login">Log in or sign up</Link></li>
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
                newUserHandler={this.newUser}
              />
            </Route>
            <Route path='/positions'>
              <PositionsSearch 
                positions={this.state.positions}
                loggedInUser={this.state.loggedInUser}
              />
            </Route>
            <Route exact path='/'>
              <div>Home</div>
            </Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
