import React from 'react'
import MapComponent from '../home/map'
import MapboxClient from 'mapbox'
import datasets from '../../datasets'
import PlaceComponent from './place-component'
import config from '../../config'
import getFeature from '../../lib/getFeature'
import round from '../../lib/round'
import fetchJsonp from 'fetch-jsonp'
import qs from 'querystring'

export default class extends React.Component {
  constructor (props) {
    super(props)
    const { lat, lng } = props.location.query
    const mapboxClient = new MapboxClient(config.mapboxApiAccessToken)

    this.state = {
      viewport: {
        latitude: round(lat, 4),
        longitude: round(lng, 4),
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

        reverseGeo([viewport.latitude, viewport.longitude])
          .then((geoData) => {
            const address = getFeature(geoData, 'address') || ''
            const postcode = getFeature(geoData, 'postcode') || ''
            const place = getFeature(geoData, 'place') || ''
            return resolve({ address, postcode, place })
          }).catch((err) => reject(err))
      })
    }

    this.getWikiEntry = (query) => {
      const queryParams = qs.stringify({
        action: 'opensearch',
        limit: 1,
        search: query,
        format: 'json'
      })
      const lookupUrl = `https://en.wikipedia.org/w/api.php?${queryParams}`

      return new Promise((resolve, reject) => {
        fetchJsonp(lookupUrl)
        .then((response) => response.json())
        .then((result) => {
          return resolve(result[2][0])
        }).catch((err) => reject(err))
      })
    }
  }

  render () {
    const { getPlaceData, getWikiEntry } = this
    const { datasets, selectedLayers } = this.state

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
      <div className='dark-gray'>
        <div className='fl w-100 w-50-ns'>
          <PlaceComponent {...this.state} />
        </div>
        <div className='fl w-100 w-50-ns relative'>
          <MapComponent datasets={datasets} selectedLayers={selectedLayers} />
        </div>
      </div>
    )
  }
}
