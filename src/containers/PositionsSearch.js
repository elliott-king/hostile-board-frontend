import React from 'react'
import {Switch, Route, Link, withRouter} from 'react-router-dom'

import Position from 'components/Position'
import PositionsFilter from 'components/PositionsFilter'

const _ = require('lodash')

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
      let city = p.city.toLowerCase()
      let company = p.company.name.toLowerCase()
      let filter = this.state.filter.toLowerCase()
      return (name + city + company).includes(filter)
    })
  }

  // alternate filter where we just return random garbage
  // with one letter filter, return 50% of positions
  // return 5% less with each addtl letter, down to 5% @ 10 letters
  // beyond 10 letters, return 1 random position
  randomFilteredPositions = (positions) => {

    let filterLen = this.state.filter.length
    if (filterLen === 0) return positions
    let positionsLen = positions.length
    let count = 1
    if (filterLen <= 10) {
      count = Math.ceil(positionsLen * (0.55 - (0.05 * filterLen)))
    }
    return _.sampleSize(positions, count)
  }

  render() {
    let {path, url} = this.props.match
    let positions = this.randomFilteredPositions(this.props.positions)
    return (
        <Switch>
          <Route exact path={path}>
            <PositionsFilter handleFilterChange={this.handleFilterChange} filter={this.state.filter}/>
            <div id="positions-cards">
              {positions.map(p => <div key={p.id}><Link to={`${url}/${p.id}`}>{p.title}</Link></div>)}
            </div>
          </Route>
          <Route path={`${path}/:positionId`}>
            <Position loggedInUser={this.props.loggedInUser}/>
          </Route>
        </Switch>
    )
  }
}

// Using router in class component
// https://stackoverflow.com/questions/58435074
export default withRouter(PositionsSearch)