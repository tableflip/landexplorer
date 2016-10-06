import React from 'react'
import MapGL from 'react-map-gl'
import Geocoder from 'mapbox-gl-geocoder'

const mapboxApiAccessToken = 'pk.eyJ1IjoicmljaHNpbHYiLCJhIjoiY2loNTBwajFyMTAwNXdjbTVhcHNyZTJwZCJ9.OCDntaRvm2ZZGz56V8mAMQ'

export default class extends React.Component {
  state = {
    viewport: {
      latitude: 51.4620930,
      longitude: -0.0673730,
      zoom: 13.7
    }
  }

  injectGeocoder = (c) => {
    const map = c._getMap()
    map.addControl(new Geocoder({
      accessToken: mapboxApiAccessToken,
      country: 'gb'
    }))
  }

  render () {
    return (
      <MapGL
        {...this.state.viewport}
        mapStyle='mapbox://styles/mapbox/outdoors-v10'
        height='100vh'
        width='100%'
        onChangeViewport={(viewport) => this.setState({ viewport })}
        mapboxApiAccessToken={mapboxApiAccessToken}
        ref={this.injectGeocoder}
      />
    )
  }
}
