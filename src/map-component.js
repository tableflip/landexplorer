import React from 'react'
import MapGL from 'react-map-gl'
import mapboxgl from 'mapbox-gl'
import Geocoder from 'mapbox-gl-geocoder'
import config from './config'

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
      latitude: 54.53797918714042,
      longitude: -4.2541837906720446,
      zoom: 5.2
    },
    marker: null
  }

  runMapHandlers = (c) => {
    window.map = this.map = c._getMap()
    this.injectGeocoder()
    this.addDblClickHandler()
    this.addClickHandler()
    this.addSoilLayer()
  }

  injectGeocoder = () => {
    this.map.addControl(new Geocoder({
      accessToken: config.mapboxApiAccessToken,
      country: 'gb'
    }))
  }

  addSoilLayer = () => {
    this.map.on('load', () => {
      this.map.addSource('nfe_soil_gb', {
        'type': 'geojson',
        'data': 'http://geoserver.dev.sharedassets.org.uk/geoserver/land_explorer/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=land_explorer:nfe_soil_gb&maxFeatures=9000&outputFormat=application%2Fjson'
      })

      this.map.addLayer({
        'id': 'nfe_soil_gb',
        'source': 'nfe_soil_gb',
        "type": "fill",
        "paint": {
          "fill-color": "#bc99e6"
        }
      })
    })
  }

  addDblClickHandler = () => {
    this.marker = new mapboxgl.Marker(marker(), { offset: [-iconSize / 2, -iconSize] })
    this.popup = new mapboxgl.Popup({ offset: [0, -iconSize - 5] })
    this.map.on('dblclick', (evt) => {
      const bounds = this.map.getBounds()
      const height = bounds.getNorth() - bounds.getSouth()
      const evtLngLat = evt.lngLat.toArray()
      this.addMarker(evtLngLat, this.makeContent(evtLngLat))
      this.setState({ marker: evtLngLat })
      this.map.flyTo({ center: [ evtLngLat[0], evtLngLat[1] + (height * 0.2) ] })
    })
  }

  addClickHandler = () => {
    this.map.on('click', () => {
      this.setState({ marker: null })
      this.removeMarker()
    })
  }

  makeContent = (lngLat) => {
    return `<div className="pa2">
      <p className="f5">Marker position</p>
      <p className="f6">(${lngLat[0]}, ${lngLat[1]})</p>
    </div>`
  }

  addMarker = (lngLat, content) => {
    this.removeMarker()
    this.marker.setLngLat(lngLat)
    this.popup.setLngLat(lngLat)
    this.popup.setHTML(content)
    this.marker.addTo(this.map)
    this.popup.addTo(this.map)
  }

  removeMarker = () => {
    this.marker.remove()
    this.popup.remove()
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
          ref={this.runMapHandlers}
        />
      </div>
    )
  }
}
