import React from 'react'
import { Map, TileLayer } from 'react-leaflet'

export default class extends React.Component {
  render () {
    const position = [51.505, -0.09]
    return (
      <Map center={position} zoom={13} id='map'>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      </Map>
    )
  }
}
