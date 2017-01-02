import React, { PropTypes } from 'react'
import { withRouter } from 'react-router'
import ReactMapboxGl from './mapbox-gl-map'
import Geocoder from 'mapbox-gl-geocoder'
import MapboxGl from 'mapbox-gl'
import uniq from 'lodash.uniq'
import cloneDeep from 'lodash.clonedeep'
import config from '../../config'

const minZoomforData = 8
const niceZoom = 11

const Map = class extends React.Component {
  static propTypes = {
    lngLat: PropTypes.object,
    zoom: PropTypes.number,
    minZoom: PropTypes.number,
    datasets: PropTypes.array,
    selectedLayers: PropTypes.array,
    onMapReady: PropTypes.func,
    router: PropTypes.object
  }

  state = {
    pins: [],
    showHover: true,
    hoverData: false,
    showClick: false,
    clickData: false
  }

  navigateTo = (lngLat) => {
    this.props.router.push({
      pathname: '/',
      search: `?lng=${lngLat.lng}&lat=${lngLat.lat}`
    })
  }

  onMapReady = (map) => {
    this.map = window.map = map
    const { lngLat, zoom, selectedLayers, onMapReady } = this.props
    if (lngLat) {
      map.setCenter(lngLat)
      this.addMarker(map, lngLat)
      map.flyTo({ center: lngLat, zoom: niceZoom })
    }
    if (zoom) map.setZoom(zoom)

    map.addControl(new MapboxGl.NavigationControl(), 'top-left')

    const geocoder = new Geocoder({
      accessToken: config.mapboxApiAccessToken,
      country: 'gb',
      zoom: niceZoom
    })

    geocoder.on('result', (e) => {
      const { center } = e.result
      const lngLat = MapboxGl.LngLat.convert(center)
      this.addMarker(this.map, lngLat)
      map.once('moveend', () => this.navigateTo(lngLat))
    })

    map.addControl(geocoder, 'top-right')

    map.addControl(new MapboxGl.ScaleControl({
      maxWidth: 80,
      unit: 'imperial'
    }))

    map.on('mousemove', (evt) => {
      const { showHover } = this.state
      if (!showHover) return
      const { lngLat, point } = evt
      const features = this.getFeatures(map, evt.point)
      const hoverData = Object.assign({}, { lngLat, point, features })
      this.setState({hoverData})
    })

    map.on('click', (evt) => {
      const { lngLat, point } = evt
      const features = this.getFeatures(map, point)
      const clickData = Object.assign({features}, { lngLat, point })
      this.setState({clickData})

      this.addMarker(map, lngLat)
      if (map.getZoom() < minZoomforData) {
        map.flyTo({ speed: 1, center: lngLat, zoom: niceZoom })
        map.once('moveend', () => this.navigateTo(lngLat))
      } else {
        this.navigateTo(lngLat)
      }
    })

    this.addSources(map, selectedLayers)
    if (onMapReady) {
      setTimeout(() => onMapReady(map), 3000)
    }
  }

  addMarker = (map, lngLat) => {
    const pins = Array.from(this.state.pins)
    pins.forEach((pin) => pin.remove())

    const w = 18
    const h = 50
    const el = document.createElement('img')
    el.className = 'pin'
    el.style.width = `${w}px`
    el.style.height = `${h}px`
    el.src = '/svg/pin.svg'
    const marker = new MapboxGl.Marker(el, {offset: [-(w / 2), -h]})
    marker.setLngLat(lngLat).addTo(map)

    pins.push(marker)
    this.setState({pins})

    return marker
  }

  addSources = (map, selectedLayers) => {
    const { datasets } = this.props
    // only use layers that have a source prop
    const sources = datasets.filter((d) => !!d.source)
    const selectedIds = selectedLayers.map((s) => s.id)
    sources.forEach((s) => {
      map.addSource(s.id, s.source)
      if (!s.layers) return console.log('no layers on source', s.id)
      s.layers.forEach((l) => {
        const layer = cloneDeep(l)
        layer.layout.visibility = 'visible'
        if (selectedIds.indexOf(layer.source) === -1) {
          layer.paint['fill-opacity'] = 0
        }
        this.map.addLayer(layer)
      })
    })
  }

  updateViewport = (viewport) => {
    this.setState({ viewport })
  }

  getFeatures (map, point) {
    const layers = [
      'landcover_crop',
      'landcover_wood',
      'landcover_grass',
      'landcover_scrub',
      'landcover_snow',
      'national_park',
      'wetlands',
      'park',
      'sand',
      'glacier',
      'agriculture'
    ]
    const features = map.queryRenderedFeatures(point, {layers})
    const res = features.map((f) => f.properties.class).filter((f) => !!f)
    return uniq(res.sort())
  }

  render () {
    const { onMapReady } = this
    const { minZoom } = this.props
    return (
      <div className='relative' style={{overflow: 'hidden', scroll: 'none', height: '100%'}}>
        <ReactMapboxGl
          containerStyle={{width: '100%', height: '100%'}}
          style='mapbox://styles/tableflip/cius56l0r00wn2jl8u9marbba'
          minZoom={minZoom || 4}
          pitch={45}
          maxBounds={[{'lng': -26.137760966121533, 'lat': 46.55787737960296}, {'lng': 10.921894927739515, 'lat': 63.92312559427779}]}
          accessToken={config.mapboxApiAccessToken}
          onStyleLoad={onMapReady}
        />
      </div>
    )
  }
}

export default withRouter(Map)
