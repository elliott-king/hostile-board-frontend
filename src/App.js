import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

import {getPositions} from './requests'
class App extends React.Component {
  state = {
    positions: [],
  }

  async componentDidMount() {
    let positions = await getPositions()
    this.setState({positions})
  }

  render() {
  return (
      <Router>
        <div>
          <nav>
            Welcome to the first day of the rest of your life!
            <ul>
              <li><Link to="/">Home</Link></li>
            </ul>
          </nav>
          <Switch>
            <Route path='/'>
              <div>Home</div>
            </Route>
          </Switch>
    </div>
      </Router>
    )
  }
}

export default App;
