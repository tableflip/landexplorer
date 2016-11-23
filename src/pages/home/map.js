import React from 'react'
import MapGL from 'react-map-gl'
import Geocoder from 'mapbox-gl-geocoder'
import config from '../../config'
import round from '../../lib/round'
import uniq from 'lodash.uniq'
import PlacePanel from '../place'

export default class extends React.Component {
  state = {
    viewport: {
      latitude: 54.53797918714042,
      longitude: -4.2541837906720446,
      zoom: 5.2
    },
    showHover: false,
    hoverData: false,
    showClick: false,
    clickData: false
  }

  onMapReady = (ctx) => {
    const map = ctx._getMap()

    map.addControl(new Geocoder({
      accessToken: config.mapboxApiAccessToken,
      country: 'gb'
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
    // console.log(features)
    const res = features.map((f) => f.properties.class).filter((f) => !!f)
    return uniq(res.sort())
  }

  render () {
    const { onMapReady, updateViewport } = this
    const { viewport, hoverData, showHover, hoverFeatures, clickData, showClick } = this.state
    const { setPanel } = this.props
    return (
      <div style={{position: 'relative', overflow: 'hidden'}}>
        <MapGL
          {...viewport}
          mapStyle='mapbox://styles/mapbox/outdoors-v10'
          height='100vh'
          width='100%'
          onChangeViewport={updateViewport}
          mapboxApiAccessToken={config.mapboxApiAccessToken}
          ref={onMapReady}
        />
        <HoverInfo {...hoverData} features={hoverFeatures} open={showHover} />
        <ClickInfo {...clickData} open={showClick} setPanel={setPanel} />
      </div>
    )
  }
}

const hoverStyle = {
  boxShadow: '1px 1px 1px 0 rgba(0,0,0,0.3)',
  background: 'rgba(50,50,50,0.8)',
  color: 'white',
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
      <code style={{fontSize: '10px'}} className='db pb1 monospace bb b--white-30'>{`${round(lngLat.lng, 3)}, ${round(lngLat.lat, 3)}`}</code>
      <div style={{minHeight: '1em', fontSize: '12px'}}>
        {features.map((f) => (
          <label className='db pt2 ttc'>{f}</label>
        ))}
      </div>
    </div>
  )
}

const ClickInfo = ({lngLat, point, open, features, setPanel}) => {
  if (!lngLat || !open) return null
  const height = 160
  const width = 250
  const transform = `translate(${point.x - 150}px, ${point.y - (height + 20)}px)`
  const style = Object.assign({}, hoverStyle, {transform, height, width})
  return (
    <div className='relative pa2 br2' style={style}>
      <code style={{fontSize: '10px'}} className='db pb1 monospace bb b--white-30'>{`${round(lngLat.lng, 3)}, ${round(lngLat.lat, 3)}`}</code>
      <div style={{minHeight: '1em', fontSize: '12px'}}>
        {features.map((f) => (
          <label className='db pt2 ttc'>{f}</label>
        ))}
      </div>
      <div className='absolute bottom-0 left-0 right-0 pa2'>
        <div className='db tc br2 ph3 pv2 bg-gold white' onClick={(evt) => setPanel(<PlacePanel lngLat={lngLat} />)}>Explore the area</div>
      </div>
    </div>
  )
}
