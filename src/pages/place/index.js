import React from 'react'
import { datasets, findDatasetById } from '../../lib/datasets'
import PlaceIntro from './place-intro'
import getWikiEntry from '../../lib/getWikiEntry'
import getPlaceData from '../../lib/getPlaceData'
import Map from '../home/map'
import Navbar from '../home/navbar'
import DataHighlights from './data-highlights'
import lngLatFromQuery from '../../lib/lngLatFromQuery'

export default class extends React.Component {
  constructor (props) {
    super(props)
    const selectedLayers = findDatasetById('Agricultural Land Classification')
    console.log(selectedLayers, datasets)
    this.state = {
      lngLat: lngLatFromQuery(props.location.query),
      placeData: {},
      wikiEntry: '',
      datasets: datasets,
      selectedLayers: selectedLayers,
      features: []
    }
  }

  componentWillReceiveProps (nextProps) {
    const lngLat = lngLatFromQuery(nextProps.location.query)
    this.lookupPlaceInfo(lngLat)
    this.setState({lngLat})
  }

  componentDidMount () {
    const { lngLat } = this.state
    this.lookupPlaceInfo(lngLat)
  }

  lookupPlaceInfo (lngLat) {
    console.log('lookupPlaceInfo', lngLat)
    getPlaceData(lngLat)
      .then((placeData) => {
        this.setState({placeData})
        const wikiQuery = placeData.place || placeData.address || placeData.postcode
        return getWikiEntry(wikiQuery)
      })
      .then((wikiEntry) => this.setState({wikiEntry}))
      .catch(function (err) { return console.error(err) })
  }

  onMapReady = (map) => {
    const { lngLat } = this.state
    const features = map.queryRenderedFeatures(lngLat)
    this.setState({features})
  }

  render () {
    const { onMapReady } = this
    const { wikiEntry, placeData, lngLat, datasets, features } = this.state
    return (
      <div className='black-60 helvetica'>
        <Navbar />
        <div className='fl w-100 w-50-ns bg-near-white pt4' style={{marginTop: '53px'}}>
          <PlaceIntro lngLat={lngLat} wikiEntry={wikiEntry} placeData={placeData} features={features} />
          <DataHighlights datasets={datasets} lngLat={lngLat} features={features} />
        </div>
        <div className='fixed top-0 right-0 w-100 w-50-ns'>
          <Map lngLat={lngLat} zoom={10} minZoom={8} datasets={datasets} selectedLayers={this.state.selectedLayers} onMapReady={onMapReady} />
        </div>
      </div>
    )
  }
}
