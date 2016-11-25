import MapboxClient from 'mapbox'
import config from '../config'

const mapboxClient = new MapboxClient(config.mapboxApiAccessToken)

export default (lngLat) => {
  return new Promise((resolve, reject) => {
    const location = {
      longitude: lngLat.lng,
      latitude: lngLat.lat
    }
    mapboxClient.geocodeReverse(location, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}
