import React from 'react'

export default React.createClass({
  render () {
    const { place } = this.props.params
    return (<h1>Place Page for {place || 'some place'}</h1>)
  }
})
