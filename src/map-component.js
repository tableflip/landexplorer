import React from 'react'
import MapGL from 'react-map-gl'
import MapboxClient from 'mapbox'
import mapboxgl from 'mapbox-gl'
import Geocoder from 'mapbox-gl-geocoder'
import config from './config'
import humanize from 'underscore.string/humanize'
import difference from 'lodash.difference'
import flatMap from 'lodash.flatmap'

const iconSize = 40
const iconColor = '#62577'

const marker = () => {
  const m = document.createElement('div')
  m.innerHTML = `<svg class="svg-icon" viewBox="0 0 20 20" width="${iconSize}" height="${iconSize}">
    <path
      style="fill:${iconColor};fill-opacity:1"
      d="M 150 2.7890625 C 98.595 2.7890625 56.939453 44.459609 56.939453 95.849609 C 56.939453 177.91461 150 197.94094 150 297.21094 C 150 197.94094 243.06055 177.91461 243.06055 95.849609 C 243.06055 44.459609 201.405 2.7890625 150 2.7890625 z M 150 24.449219 C 189.375 24.449219 221.41406 56.475234 221.41406 95.865234 C 221.41406 127.03523 204.60078 146.96922 183.30078 172.19922 C 171.93078 185.65422 159.9 199.91992 150 216.79492 C 140.1 199.91992 128.06984 185.65555 116.71484 172.18555 C 95.399844 146.95555 78.585938 127.03461 78.585938 95.849609 C 78.585938 56.459609 110.61 24.449219 150 24.449219 z "
      transform="scale(0.06666667,0.06666667)" />
    <path
      d="M 10,14.453 C 9.34,13.328 8.538,12.377 7.781,11.479 6.36,9.797 5.239,8.469 5.239,6.39 5.239,3.764 7.374,1.63 10,1.63 c 2.625,0 4.761,2.135 4.761,4.761 0,2.078 -1.121,3.407 -2.541,5.089 -0.758,0.897 -1.56,1.848 -2.22,2.973 z"
      style="fill:#ffffff;fill-opacity:1;opacity:0.75;" />
    <circle
      fill="${iconColor}"
      stroke-width="1"
      cx="10"
      cy="5.67"
      r="1.608" />
  </svg>`
  return m.firstChild
}
const mapboxClient = new MapboxClient(config.mapboxApiAccessToken)

export default class extends React.Component {
  state = {
    viewport: {
      latitude: 54.53797918714042,
      longitude: -4.2541837906720446,
      zoom: 5.2
    },
    marker: null
  }

  componentWillReceiveProps = (nextProps) => {
    this.updateLayers(nextProps)
  }

  runMapHandlers = (c) => {
    window.map = this.map = c._getMap()
    this.addSources()
    this.injectGeocoder()
    this.addClickHandler()
  }

  addSources = () => {
    // unwrap from categories
    const datasets = this.props.datasets.map((d) => d.datasets)
    // only use layers that have a source prop
    const sources = flatMap(datasets).filter((d) => !!d.source)
    this.map.on('load', () => {
      sources.forEach((l) => this.map.addSource(l.id, l.source))
    })
  }

  updateLayers = (nextProps) => {
    const layers = this.props.selectedLayers
    const nextLayers = nextProps.selectedLayers
    const toAdd = difference(nextLayers, layers)
    const toRemove = difference(layers, nextLayers)
    toAdd.forEach(this.addLayer.bind(this))
    toRemove.forEach(this.removeLayer.bind(this))
  }

  addLayer = (l) => {
    // Our custom layer for NATIONAL_FOREST_ESTATE_SOIL is made up of many sub layers, 1 per soil group
    if (l.layers) return l.layers.forEach((l) => this.map.addLayer(l))
    this.map.addLayer(Object.assign(
      {'id': l.id, 'source': l.id},
      l.style
    ))
  }

  removeLayer = (l) => {
    if (l.layers) return l.layers.forEach((l) => this.map.removeLayer(l.id))
    this.map.removeLayer(l.id)
  }

  injectGeocoder = () => {
    this.map.addControl(new Geocoder({
      accessToken: config.mapboxApiAccessToken,
      country: 'gb'
    }))
  }

  addClickHandler = () => {
    this.map.on('click', (evt) => {
      if (this.state.marker) {
        this.setState({ marker: null })
        this.removeMarker()
      } else {
        this.marker = new mapboxgl.Marker(marker(), { offset: [-iconSize / 2, -iconSize] })
        this.popup = new mapboxgl.Popup({ offset: [0, -iconSize - 5], closeButton: false })
        const evtLngLat = evt.lngLat.toArray()
        this.addMarker(evtLngLat, evt)
        this.setState({ marker: evtLngLat })
      }
    })
  }

  featuresToHtml = (features) => {
    console.log('featuresToHtml', features)
    if (!features || !features.length) return ''

    function featureToHtml (f) {
      const {value, label} = extractLabels(f)
      return `<tr class="striped--near-white">
                <td class="f5 ph2">${humanize(value)}</td>
                <td class="f8 ttu tracked light-silver ph2">${humanize(label)}</td>
              </tr>`
    }

    function extractLabels (f) {
      const customFormaters = {
        'INSPIRE Index Polygons': (f) => ({ label: 'INSPIREID', value: f.properties.INSPIREID })
      }

      const formatter = customFormaters[f.layer.id]

      if (!formatter) {
        const isCustomLayer = f.layer.source !== 'composite'
        const label = isCustomLayer ? f.layer.source : f.layer['source-layer']
        const value = isCustomLayer ? f.layer.id : (f.properties.class || f.properties.name)
        return {label, value}
      }

      return formatter(f)
    }

    return `
      <table class='collapse pv2 ph3 mt3'>
        <thead class='tl'>
          <tr><th class="f6 b ph2">Feature</th><th class="f6 b ph2">Source</th></tr>
        </thead>
        <tbody>
          ${features.map(featureToHtml).join(' ')}
        </tbody>
      </table>`
  }

  makeContent = (lngLat, evt) => {
    const features = this.map.queryRenderedFeatures(evt.point)
    return Promise.resolve(`<div class="pa2">
      <label class="f6 b">Coordinates</label>
      <code class="f6 monospace db">${round(lngLat[0], 3)}, ${round(lngLat[1], 3)}</code>
      ${this.featuresToHtml(features)}
    </div>`)
  }

  makeContentWithAddressLookUp = (lngLat, evt) => {
    const features = this.map.queryRenderedFeatures(evt.point)
    return this.reverseGeo(lngLat)
      .then((geoData) => {
        const address = getFeature(geoData, 'address') || ''
        const postcode = getFeature(geoData, 'postcode') || ''
        return Promise.resolve(`<div class="pa2">
          <label class="f6 b">Coordinates</label>
          <code class="f6 monospace db">${round(lngLat[0], 3)}, ${round(lngLat[1], 3)}</code>
          <label class="f6 b db mt3">Address</label>
          <address class="f5 db">
            <div>${address}</div>
            <div>${postcode}</div>
            <div>${!postcode && !address ? 'Unknown' : ''}</div>
          </address>
          ${this.featuresToHtml(features)}
        </div>`)
      })
      .catch((err) => {
        console.error('Geocoding error', err)
        return Promise.resolve(`<div class="pa2">
          <label class="f6 b">Coordinates</label>
          <p class="f5">(${round(lngLat[0], 3)}, ${round(lngLat[1], 3)})</p>
          <label class="f6 b db mt3">Address</label>
          <address class="f5 db">
            <div>Temporarily unavailable</div>
          </address>
          <label class="f6 b mt3 db">Features</label>
          ${this.featuresToHtml(features)}
        </div>`)
      })
  }

  reverseGeo = (lngLat) => {
    return new Promise((resolve, reject) => {
      mapboxClient.geocodeReverse({ latitude: lngLat[1], longitude: lngLat[0] }, (err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    })
  }

  addMarker = (lngLat, evt) => {
    this.removeMarker()
    this.marker.setLngLat(lngLat)
    this.marker.addTo(this.map)
    this.makeContent(lngLat, evt)
      .then((content) => {
        this.popup.setLngLat(lngLat)
        this.popup.setHTML(content)
        this.popup.addTo(this.map)
      })
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

function getFeature (geoJson, featureName) {
  const f = geoJson.features.find((feature) => {
    return feature.id.substr(0, featureName.length) === featureName
  })
  return f && f.text
}

function round (number, dps) {
  const factor = Math.pow(10, dps)
  return Math.round(number * factor) / factor
}
