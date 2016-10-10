import React from 'react'
import MapGL from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import Geocoder from 'mapbox-gl-geocoder'

const mapboxApiAccessToken = 'pk.eyJ1IjoicmljaHNpbHYiLCJhIjoiY2loNTBwajFyMTAwNXdjbTVhcHNyZTJwZCJ9.OCDntaRvm2ZZGz56V8mAMQ'
const iconSize = 40
const iconColor = '#62577'

const marker = () => {
  const m = document.createElement('div')
  m.innerHTML = `<svg class="svg-icon" viewBox="0 0 20 20" width="${iconSize}" height="${iconSize}">
    <path fill="${iconColor}" d="M10,0.186c-3.427,0-6.204,2.778-6.204,6.204c0,5.471,6.204,6.806,6.204,13.424c0-6.618,6.204-7.953,6.204-13.424C16.204,2.964,13.427,0.186,10,0.186z M10,14.453c-0.66-1.125-1.462-2.076-2.219-2.974C6.36,9.797,5.239,8.469,5.239,6.39C5.239,3.764,7.374,1.63,10,1.63c2.625,0,4.761,2.135,4.761,4.761c0,2.078-1.121,3.407-2.541,5.089C11.462,12.377,10.66,13.328,10,14.453z"></path>
    <circle fill="${iconColor}" stroke-width="1" cx="10" cy="5.67" r="1.608"></circle>
  </svg>`
  return m.firstChild
}

export default class extends React.Component {
  state = {
    viewport: {
      latitude: 51.4620930,
      longitude: -0.0673730,
      zoom: 13.7
    },
    marker: null
  }

  runMapHandlers = (c) => {
    this.map = c._getMap()
    this.injectGeocoder()
    this.addDblClickHandler()
    this.addClickHandler()
  }

  injectGeocoder = () => {
    this.map.addControl(new Geocoder({
      accessToken: mapboxApiAccessToken,
      country: 'gb'
    }))
  }

  addDblClickHandler = () => {
    this.marker = new mapboxgl.Marker(marker(), { offset: [-iconSize / 2, -iconSize] })
    this.map.on('dblclick', (evt) => {
      const bounds = this.map.getBounds()
      const width = bounds.getEast() - bounds.getWest()
      const height = bounds.getNorth() - bounds.getSouth()
      const evtLngLat = evt.lngLat.toArray()
      this.addMarker(evtLngLat)
      this.setState({ marker: evtLngLat })
      this.map.flyTo({ center: [ evtLngLat[0] + (width * 0.35), evtLngLat[1] + (height * 0.2) ] })
    })
  }

  addClickHandler = () => {
    this.map.on('click', () => {
      this.setState({ marker: null })
      this.removeMarker()
    })
  }

  addMarker = (lngLat) => {
    this.removeMarker()
    this.marker.setLngLat(lngLat)
    this.marker.addTo(this.map)
  }

  removeMarker = () => {
    this.marker.remove()
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
          mapboxApiAccessToken={mapboxApiAccessToken}
          ref={this.runMapHandlers}
        />
        {this.state.marker
          ? (<div className='absolute ba b--black-50 pa2 bg-white' style={{ bottom: '35%', left: '20%', maxWidth: '70%', maxHeight: '40%' }}>
            <p className='f6'>Marker position:</p>
            <p className='f5'>{`(${this.state.marker[0]}, ${this.state.marker[1]})`}</p>
          </div>)
          : null
        }
      </div>
    )
  }
}
