import React from 'react'
import datasets from '../../datasets'
import PlaceIntro from './place-intro'
import getWikiEntry from '../../lib/getWikiEntry'
import getPlaceData from '../../lib/getPlaceData'
import Map from '../home/map'
import Navbar from '../home/navbar'
import DataHighlights from './data-highlights'

const lngLatFromQuery = (query) => ({
  lng: Number(query.lng),
  lat: Number(query.lat)
})

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      lngLat: lngLatFromQuery(props.location.query),
      placeData: {},
      wikiEntry: '',
      datasets: datasets,
      selectedLayers: []
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

  render () {
    const { wikiEntry, placeData, lngLat } = this.state
    return (
      <div className='black-60 helvetica'>
        <Navbar />
        <div className='fl w-100 w-50-ns bg-near-white pt4' style={{marginTop: '53px'}}>
          <PlaceIntro lngLat={lngLat} wikiEntry={wikiEntry} placeData={placeData} />
          <DataHighlights datasets={datasets} />
        </div>
        <div className='fixed top-0 right-0 w-100 w-50-ns'>
          <Map lngLat={lngLat} zoom={12} datasets={this.state.datasets} selectedLayers={this.state.selectedLayers} />
        </div>
      </div>
    )
  }
}
