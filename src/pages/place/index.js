import React from 'react'
import MapboxClient from 'mapbox'
import datasets from '../../datasets'
import PlaceComponent from './place-component'
import config from '../../config'
import getFeature from '../../lib/getFeature'
import round from '../../lib/round'
import getWikiEntry from '../../lib/getWikiEntry'
import MapComponent from '../home/map'
import Navbar from '../home/navbar'

export default class extends React.Component {
  constructor (props) {
    super(props)
    const { lat, lng } = props.location.query
    const mapboxClient = new MapboxClient(config.mapboxApiAccessToken)
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

    this.reverseGeo = (lngLat) => {
      return new Promise((resolve, reject) => {
        mapboxClient.geocodeReverse({ latitude: lngLat[1], longitude: lngLat[0] }, (err, res) => {
          if (err) return reject(err)
          resolve(res)
        })
      })
    }

    this.getPlaceData = () => {
      return new Promise((resolve, reject) => {
        const { reverseGeo } = this
        const { viewport } = this.state

        reverseGeo([viewport.longitude, viewport.latitude])
          .then((geoData) => {
            const address = getFeature(geoData, 'address') || ''
            const postcode = getFeature(geoData, 'postcode') || ''
            const place = getFeature(geoData, 'place') || ''
            return resolve({ address, postcode, place })
          }).catch((err) => reject(err))
      })
    }
  }

  render () {
    const { getPlaceData } = this

    getPlaceData()
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
