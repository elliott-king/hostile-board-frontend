import React from 'react'

const PositionsFilter = (props) => {

  return(
    <form>
      <input type="text" name="filter" value={props.filter} onChange={props.handleFilterChange}/>
    </form>
  )

}
export default PositionsFilter