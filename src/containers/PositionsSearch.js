import React from 'react'
import {Switch, Route, Link, withRouter} from 'react-router-dom'

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
      let city = p.city.toLowerCase()
      let company = p.company.name.toLowerCase()
      let filter = this.state.filter.toLowerCase()
      return (name + city + company).includes(filter)
    })
  }

  render() {
    let {path, url} = this.props.match
    let positions = this.filteredPositions(this.props.positions)
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