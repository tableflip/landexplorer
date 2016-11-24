import React from 'react'
import datasets from '../../datasets'
import PlaceIntro from './place-intro'
import getWikiEntry from '../../lib/getWikiEntry'
import getPlaceData from '../../lib/getPlaceData'
import Map from '../home/map'
import Navbar from '../home/navbar'
import DataHighlights from './data-highlights'

const centerFromObj = (lngLat) => [Number(lngLat.lng), Number(lngLat.lat)]

export default class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      center: centerFromObj(props.location.query),
      placeData: {},
      wikiEntry: '',
      datasets: datasets,
      selectedLayers: []
    }
  }

  componentWillReceiveProps (nextProps) {
    const { query } = nextProps.location
    const center = centerFromObj(query)
    this.setState({center})
    this.lookupPlaceInfo(center)
  }

  componentDidMount () {
    const { query } = this.props.location
    const center = centerFromObj(query)
    this.lookupPlaceInfo(center)
  }

  lookupPlaceInfo (center) {
    console.log(center)
    getPlaceData(center)
      .then((placeData) => {
        this.setState({placeData})
        const query = placeData.place || placeData.address || placeData.postcode
        return getWikiEntry(query)
      })
      .then((wikiEntry) => this.setState({wikiEntry}))
      .catch(function (err) { return console.error(err) })
  }

  render () {
    const { query } = this.props.location
    const { wikiEntry, placeData, center } = this.state
    return (
      <div className='black-60 helvetica'>
        <Navbar />
        <div className='fl w-100 w-50-ns bg-near-white pt4' style={{marginTop: '53px'}}>
          <PlaceIntro coordinates={query} wikiEntry={wikiEntry} placeData={placeData} />
          <DataHighlights datasets={datasets} />
        </div>
        <div className='fixed top-0 right-0 w-100 w-50-ns'>
          <Map center={center} datasets={this.state.datasets} selectedLayers={this.state.selectedLayers} />
        </div>
      </div>
    )
  }
}
