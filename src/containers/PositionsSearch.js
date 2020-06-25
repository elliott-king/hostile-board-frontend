import React from 'react'
import {BrowserRouter as Router, Switch, Route, Link, withRouter} from 'react-router-dom'

import Position from '../components/Position'
import PositionsFilter from '../components/PositionsFilter'

class PositionsSearch extends React.Component {
  state = {
    filter: ""
  }
  
  handleFilterChange = (event) => {
    this.setState({filter: event.target.value})
  }

  filteredPositions = (positions) => {
    return positions.filter(p => {
      let name = p.title.toLowerCase()
      let filter = this.state.filter.toLowerCase()
      return name.includes(filter)
    })
  }

  render() {
    let {path, url} = this.props.match
    let positions = this.filteredPositions(this.props.positions)
    return (
      <Router>
        <Switch>
          <Route expect path={`${path}/:positionId`}>
            <Position/>
          </Route>
          <Route expect path={path}>
            <PositionsFilter handleFilterChange={this.handleFilterChange} filter={this.state.filter}/>
            <div id="positions-cards">
              {positions.map(p => <div key={p.id}><Link to={`${path}/${p.id}`}>{p.title}</Link></div>)}
            </div>
          </Route>
        </Switch>
      </Router>
    )
  }
}

// Using router in class component
// https://stackoverflow.com/questions/58435074
export default withRouter(PositionsSearch)