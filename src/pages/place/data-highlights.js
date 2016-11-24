import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <section className='mh3'>
        <div className='pt3'>Soil has {this.props.datasets.length} sources</div>
      </section>
    )
  }
}
