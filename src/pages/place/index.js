import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render () {
    const { place } = this.props.params
    return (<h1><Link to='/'><small>back</small></Link> Place Page for {place || 'some place'}</h1>)
  }
})
