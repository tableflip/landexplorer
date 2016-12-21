import React from 'react'
import { highlights, findDatasetById } from '../../lib/datasets'
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
      placeData: {},
      wikiEntry: '',
      datasets: highlights.map((c) => c.datasets[0]),
      selectedLayers: findDatasetById(['Historic Flood Map']),
      features: []
    }
  }

  componentWillReceiveProps (nextProps) {
    const lngLat = lngLatFromQuery(nextProps.location.query)
    this.setState({lngLat})
    if (!lngLat) return
    this.lookupPlaceInfo(lngLat)
    this.queryRenderedFeatures(lngLat)
  }

  componentDidMount () {
    const { lngLat } = this.state
    if (!lngLat) return
    this.lookupPlaceInfo(lngLat)
  }

  lookupPlaceInfo (lngLat) {
    getPlaceData(lngLat)
      .then((placeData) => {
        this.setState({placeData})
        const wikiQuery = placeData.place || placeData.address || placeData.postcode
        return getWikiEntry(wikiQuery)
      })
      .then((wikiEntry) => this.setState({wikiEntry}))
      .catch(function (err) { return console.error(err) })
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
    const { wikiEntry, placeData, lngLat, datasets, features, selectedLayers } = this.state
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
            <PlaceIntro lngLat={lngLat} wikiEntry={wikiEntry} placeData={placeData} features={features} location={location} />
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
