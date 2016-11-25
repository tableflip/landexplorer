import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import ReactMapboxGl from './mapbox-gl-map'
import Geocoder from 'mapbox-gl-geocoder'
import uniq from 'lodash.uniq'
import config from '../../config'
import round from '../../lib/round'
import Icon from '../place/icon'

export default class extends React.Component {
  static propTypes = {
    lngLat: PropTypes.object,
    zoom: PropTypes.number
  }

  state = {
    showHover: false,
    hoverData: false,
    showClick: false,
    clickData: false
  }

  onMapReady = (map) => {
    window.map = map // for querying in dev.
    const { lngLat, zoom } = this.props
    if (lngLat) map.setCenter(lngLat)
    if (zoom) map.setZoom(zoom)

    map.addControl(new Geocoder({
      accessToken: config.mapboxApiAccessToken,
      country: 'gb',
      position: 'top-left'
    }))

    map.on('mousemove', (evt) => {
      const { hoverData, showHover } = this.state
      const nuShowHover = hoverData ? showHover : true
      const features = map.queryRenderedFeatures(evt.point)
      let hoverFeatures = features.map((f) => f.properties.class).filter((f) => !!f)
      hoverFeatures = uniq(hoverFeatures.sort())
      this.setState({hoverData: evt, showHover: nuShowHover, hoverFeatures})
    })

    map.on('click', (evt) => {
      const showHover = !this.state.showHover
      const showClick = !this.state.showClick
      const { lngLat, point } = evt
      const features = this.getFeatures(map, point)
      const clickData = Object.assign({features}, { lngLat, point })
      this.setState({showHover, showClick, clickData})
    })
  }

  updateViewport = (viewport) => {
    this.setState({ viewport })
  }

  getFeatures (map, point) {
    const features = map.queryRenderedFeatures(point)
    const res = features.map((f) => f.properties.class).filter((f) => !!f)
    return uniq(res.sort())
  }

  render () {
    const { onMapReady } = this
    const { hoverData, showHover, hoverFeatures, clickData, showClick } = this.state
    return (
      <div className='relative' style={{overflow: 'hidden', scroll: 'none', marginTop: '53px'}}>
        <ReactMapboxGl
          containerStyle={{width: '100%', height: 'calc(100vh - 54px)'}}
          style='mapbox://styles/mapbox/outdoors-v10'
          minZoom={4}
          maxBounds={[{'lng': -26.137760966121533, 'lat': 46.55787737960296}, {'lng': 10.921894927739515, 'lat': 63.92312559427779}]}
          accessToken={config.mapboxApiAccessToken}
          onStyleLoad={onMapReady}
        />
        <HoverInfo {...hoverData} features={hoverFeatures} open={showHover} />
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
      <div style={{minHeight: '1em', fontSize: '12px'}}>
        {features.map((f, i) => (
          <div className='pa2'>
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
  const height = 160
  const width = 250
  const transform = `translate(${point.x - 150}px, ${point.y - (height + 20)}px)`
  const style = Object.assign({}, hoverStyle, {transform, height, width})
  return (
    <div className='relative pa2 br2' style={style}>
      <code style={{fontSize: '10px'}} className='db pb1 monospace bb b--white-30'>{`${round(lngLat.lng, 3)}, ${round(lngLat.lat, 3)}`}</code>
      <div style={{minHeight: '1em', fontSize: '12px'}}>
        {features.map((f, i) => (
          <label key={i} className='db pt2 ttc'>{f}</label>
        ))}
      </div>
      <div className='absolute bottom-0 left-0 right-0 pa2'>
        <Link className='db tc br2 ph3 pv2 bg-gold white' to={{pathname: '/place', query: lngLat}}>Explore the area</Link>
      </div>
    </div>
  )
}