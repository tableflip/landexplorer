import MapboxClient from 'mapbox'
import config from '../config'

export default (lngLat) => {
  const mapboxClient = new MapboxClient(config.mapboxApiAccessToken)

  return new Promise((resolve, reject) => {
    const lngLat = {
      longitude: Number(lngLat[0]),
      latitude: Number(lngLat[1])
    }
    mapboxClient.geocodeReverse(lngLat, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}
