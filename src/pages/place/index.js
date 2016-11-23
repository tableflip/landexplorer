import React from 'react'
import datasets from '../../datasets'
import PlaceComponent from './place-component'
import round from '../../lib/round'
import getWikiEntry from '../../lib/getWikiEntry'
import getPlaceData from '../../lib/getPlaceData'
import MapComponent from '../home/map'
import Navbar from '../home/navbar'

export default class extends React.Component {
  constructor (props) {
    super(props)
    const { lat, lng } = props.location.query

    this.state = {
      viewport: {
        latitude: round(lat, 6),
        longitude: round(lng, 6),
        zoom: 10
      },
      placeData: {},
      wikiEntry: '',
      datasets: datasets,
      selectedLayers: []
    }
  }

  render () {
    const { longitude, latitude } = this.state.viewport

    getPlaceData([longitude, latitude])
      .then((placeData) => {
        this.setState(Object.assign({}, this.state, {placeData}))
        const query = placeData.place || placeData.address || placeData.postcode
        return getWikiEntry(query)
      })
      .then((wikiEntry) => {
        this.setState(Object.assign({}, this.state, {wikiEntry}))
      })
      .catch((err) => console.error(err))

    return (
      <div className='dark-gray helvetica'>
        <Navbar />
        <div className='fl w-100 w-50-ns'>
          <PlaceComponent {...this.state} />
        </div>
        <div className='fl w-100 w-50-ns relative'>
          <MapComponent datasets={this.state.datasets} selectedLayers={this.state.selectedLayers} />
        </div>
      </div>
    )
  }
}
