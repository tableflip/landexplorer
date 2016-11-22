import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render () {
    const { place, data } = this.props.params
    return (<h1>
      <Link to='/'>
        <small>back</small>
      </Link> Data for {data || 'some data set'} {place && `in ${place}`}
    </h1>)
  }
})
