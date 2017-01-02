import React, { PropTypes } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { highlights } from '../../lib/datasets'
import PlaceIntro from './place-intro'
import getWikiEntry from '../../lib/getWikiEntry'
import getPlaceData from '../../lib/getPlaceData'
import Map from '../home/map'
import LogoLink from '../home/logo-link'
import InfoPanel from '../home/info-panel'
import DataHighlights from './data-highlights'
import lngLatFromQuery from '../../lib/lngLatFromQuery'

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lngLat: lngLatFromQuery(props.location.query),
      datasets: highlights.map((c) => c.datasets[0]),
      selectedLayers: [],
      features: []
    }
  }

  componentWillReceiveProps (nextProps) {
    const lngLat = lngLatFromQuery(nextProps.location.query)
    this.setState({lngLat})
    if (!lngLat) return
    this.queryRenderedFeatures(lngLat)
  }

  queryRenderedFeatures (lngLat) {
    const { map } = this
    if (!map) return
    const features = map.queryRenderedFeatures(map.project(lngLat))
    this.setState({features})
  }

  onMapReady = (map) => {
    this.map = map
    const { lngLat } = this.state
    if (!lngLat) return
    this.queryRenderedFeatures(lngLat)
  }

  render () {
    const { onMapReady } = this
    const { location } = this.props
    const { lngLat, datasets, features, selectedLayers } = this.state
    return (
      <div className='black-60 helvetica layout-container'>
        <div className='map-column'>
          <Map lngLat={lngLat} datasets={datasets} selectedLayers={selectedLayers} onMapReady={onMapReady} />
        </div>
        <div className='bg-near-white content-column'>
        { lngLat ? (
          <div style={{height: '100%'}}>
            <div className='dn db-ns'>
              <LogoLink />
            </div>
            <PlaceIntroContainer lngLat={lngLat} features={features} location={location} />
            <DataHighlights selectedLayers={selectedLayers} datasets={highlights} lngLat={lngLat} features={features} />
            <LogoLink />
          </div>
        ) : (
          <div>
            <LogoLink />
            <InfoPanel />
          </div>
        )}
        </div>
      </div>
    )
  }
}

const inspireIdQuery = gql`
  query InspireId($lng: Float!, $lat: Float!) {
    inspireId(lng: $lng, lat: $lat)
  }
`

const PlaceIntroContainer = graphql(inspireIdQuery, {
  options: ({ lngLat }) => ({ variables: lngLat })
})(class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      placeData: {},
      wikiEntry: ''
    }
  }

  componentDidMount () {
    const { lngLat } = this.props
    this.lookupPlaceInfo(lngLat)
  }

  componentWillReceiveProps (nextProps) {
    const { lngLat } = nextProps
    this.lookupPlaceInfo(lngLat)
  }

  lookupPlaceInfo (lngLat) {
    if (!lngLat) return
    getPlaceData(lngLat)
      .then((placeData) => {
        this.setState({placeData})
        const wikiQuery = placeData.place || placeData.address || placeData.postcode
        return getWikiEntry(wikiQuery)
      })
      .then((wikiEntry) => this.setState({wikiEntry}))
      .catch(function (err) { return console.error(err) })
  }

  render () {
    return <PlaceIntro {...this.props} {...this.state} />
  }
})

PlaceIntroContainer.propTypes = {
  lngLat: PropTypes.shape({
    lng: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired
  }).isRequired,
  features: PropTypes.array,
  location: PropTypes.object,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    inspireId: PropTypes.number
  })
}
