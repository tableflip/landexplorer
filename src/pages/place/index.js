import React from 'react'
import datasets from '../../datasets'
import PlaceIntro from './place-intro'
import round from '../../lib/round'
import getWikiEntry from '../../lib/getWikiEntry'
import getPlaceData from '../../lib/getPlaceData'
import Map from '../home/map'
import Navbar from '../home/navbar'
import DataHighlights from './data-highlights'

export default class extends React.Component {
  constructor (props) {
    super(props)
    const { lat, lng } = props.location.query

    this.state = {
      viewport: {
        latitude: round(lat, 12),
        longitude: round(lng, 12),
        zoom: 10
      },
      placeData: {},
      wikiEntry: '',
      datasets: datasets,
      selectedLayers: []
    }
  }

  componentDidMount () {
    const { longitude, latitude } = this.state.viewport
    getPlaceData([longitude, latitude])
    .then((placeData) => {
      this.setState({placeData})
      const query = placeData.place || placeData.address || placeData.postcode
      return getWikiEntry(query)
    })
    .then((wikiEntry) => {
      this.setState({wikiEntry})
    })
    .catch(function (err) { return console.error(err) })
  }

  render () {
    return (
      <div className='black-60 helvetica'>
        <Navbar />
        <div className='fl w-100 w-50-ns bg-near-white'>
          <PlaceIntro {...this.state} />
          <DataHighlights datasets={datasets} />
        </div>
        <div className='fl w-100 w-50-ns relative'>
          <Map datasets={this.state.datasets} selectedLayers={this.state.selectedLayers} />
        </div>
      </div>
    )
  }
}
