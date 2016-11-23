import React from 'react'
import { RotatingPlane } from 'better-react-spinkit'

export default class extends React.Component {
  render () {
    const { address, postcode, place } = this.props.placeData
    const wikiEntry = this.props.wikiEntry
    return (
      <section className='bg-white pa3'>
        <div>
          <h1>{place || '---'}</h1>
          <h2>{address || '---'}</h2>
          <h3>{postcode || '---'}</h3>
          <hr />
          {wikiEntry ? (
            <div className='block center pa3'>{wikiEntry}</div>
          ) : (
            <div className='block w-30 center tc pt3'><RotatingPlane color='lightgray' size={60} duration='3s' /></div>
          )}
        </div>
      </section>
    )
  }
}
