import React from 'react'
import MapComponent from './map-component'

export default class extends React.Component {
  render () {
    return (
      <div className='row'>
        <div className='col-xs-6'>

        </div>
        <div className='col-xs-6'>
          <MapComponent />
        </div>
      </div>
    )
  }
}
