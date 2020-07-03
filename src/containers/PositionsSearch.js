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

  renderPositions = (positions, url) => {
    const positionCard = (position, index) => {
      const color = index % 2 ? "patch-white" : "patch-grey"
      return (
        <Link key={position.id} to={`${url}/${position.id}`}>
          <div id={`position-${position.id}`} className={`position-card ${color}`}>
            <div className="position-card-title">
                <h3 className="subtitle">{position.title}</h3>
              </div>
            <div className="position-card-body columns">
                <p className="column is-three-quarters">{position.company.name}</p>
                <p className="column">{position.city}</p>
            </div>
          </div>
        </Link>
      )
    }

    return (
      <div className="positions-cards">
        {positions.map((p, index) => positionCard(p, index))}
      </div>
    )
  }

  render() {
    let {path, url} = this.props.match
    let positions = this.randomFilteredPositions(this.props.positions)
    return (
        <Switch>
          <Route exact path={path}>
            <section className="hero">
              <div className="hero-body">
                <h1 className="title">Open Positions</h1>
              </div>
            </section>
            <section className="positions-search">
              <div className="columns">
                <div className="positions-container column is-four-fifths">
                  {this.renderPositions(positions, url)}
                </div>
                <div className="search-container column">
                  <h3 className="subtitle">
                    Search Positions
                  </h3>
            <PositionsFilter handleFilterChange={this.handleFilterChange} filter={this.state.filter}/>
                </div>
            </div>
            </section>
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