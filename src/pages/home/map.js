import React from 'react'
import MapGL from 'react-map-gl'
// import MapboxClient from 'mapbox'
// import mapboxgl from 'mapbox-gl'
import config from '../../config'

export default class extends React.Component {
  state = {
    viewport: {
      latitude: 54.53797918714042,
      longitude: -4.2541837906720446,
      zoom: 5.2
    },
    marker: null
  }
  render () {
    return (
      <div>
        <MapGL
          {...this.state.viewport}
          mapStyle='mapbox://styles/mapbox/outdoors-v10'
          height='100vh'
          width='100%'
          onChangeViewport={(viewport) => this.setState({ viewport })}
          mapboxApiAccessToken={config.mapboxApiAccessToken}
        />
      </div>
    )
  }
}
