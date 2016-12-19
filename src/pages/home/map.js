import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import ReactMapboxGl from './mapbox-gl-map'
import Geocoder from 'mapbox-gl-geocoder'
import MapboxGl from 'mapbox-gl'
import uniq from 'lodash.uniq'
import cloneDeep from 'lodash.clonedeep'
import config from '../../config'
import round from '../../lib/round'
import Icon from '../place/icon'

export default class extends React.Component {
  static propTypes = {
    lngLat: PropTypes.object,
    zoom: PropTypes.number,
    minZoom: PropTypes.number,
    datasets: PropTypes.array,
    selectedLayers: PropTypes.array,
    onMapReady: PropTypes.func
  }

  state = {
    showHover: false,
    hoverData: false,
    showClick: false,
    clickData: false
  }

  onMapReady = (map) => {
    this.map = window.map = map
    const { lngLat, zoom, selectedLayers, onMapReady } = this.props
    if (lngLat) {
      map.setCenter(lngLat)
      const w = 18
      const h = 50
      const el = document.createElement('img')
      el.className = 'pin'
      el.style.width = `${w}px`
      el.style.height = `${h}px`
      el.src = '/svg/pin.svg'
      const marker = new MapboxGl.Marker(el, {offset: [-(w / 2), -h]})
      marker.setLngLat(lngLat).addTo(map)
    }
    if (zoom) map.setZoom(zoom)

    map.addControl(new MapboxGl.NavigationControl(), 'top-left')

    map.addControl(new Geocoder({
      accessToken: config.mapboxApiAccessToken,
      country: 'gb',
      zoom: 13
    }), 'top-right')

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
      const showHover = !this.state.showHover
      const showClick = !this.state.showClick
      const { lngLat, point } = evt
      const features = this.getFeatures(map, point)
      const clickData = Object.assign({features}, { lngLat, point })
      this.setState({showHover, showClick, clickData})
    })

    this.addSources(map, selectedLayers)
    if (onMapReady) {
      setTimeout(() => onMapReady(map), 3000)
    }
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
    const { hoverData, showHover, clickData, showClick } = this.state
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
        <HoverInfo {...hoverData} open={showHover} />
        <ClickInfo {...clickData} open={showClick} />
      </div>
    )
  }
}

const hoverStyle = {
  boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.3)',
  background: 'rgba(255,255,255,0.9)',
  color: 'gray',
  position: 'absolute',
  top: 0,
  left: 0,
  width: 150
}

const HoverInfo = ({lngLat, point, open, features}) => {
  if (!lngLat || !open) return null
  const transform = `translate(${point.x + 20}px, ${point.y + 10}px)`
  const style = Object.assign({transform}, hoverStyle)
  return (
    <div className='pa2 br2' style={style}>
      <code style={{fontSize: '10px'}} className='db pb1 monospace bb b--black-30'>{`${round(lngLat.lng, 3)}, ${round(lngLat.lat, 3)}`}</code>
      <div style={{minHeight: '2em', fontSize: '12px'}}>
        {features.map((f, i) => (
          <div className='pa2' key={`${f}-${i}`}>
            <Icon name={f} className='dib v-mid mr2' />
            <label key={i} className='dib v-mid ttc'>{f}</label>
          </div>
        ))}
      </div>
    </div>
  )
}

const ClickInfo = ({lngLat, point, open, features}) => {
  if (!lngLat || !open) return null
  const height = (40 * features.length) + 76
  const width = 250
  const transform = `translate(${point.x - 150}px, ${point.y - (height + 20)}px)`
  const style = Object.assign({}, hoverStyle, {transform, height, width})
  return (
    <div className='relative pa2 br2' style={style}>
      <code style={{fontSize: '10px'}} className='db pb1 monospace bb b--white-30'>{`${round(lngLat.lng, 3)}, ${round(lngLat.lat, 3)}`}</code>
      <div style={{fontSize: '12px'}}>
        {features.map((f, i) => (
          <div className='pa2' key={`${f}-${i}`}>
            <Icon name={f} className='dib v-mid mr2' />
            <label key={i} className='dib v-mid ttc'>{f}</label>
          </div>
        ))}
      </div>
      <div className='pa2'>
        <Link className='db ph3 pv2 f6 tc no-underline br2 ba b--green green' to={{pathname: '/place', query: lngLat}} style={{backgroundColor: '#CFF09E'}}>Explore the area</Link>
      </div>
    </div>
  )
}
