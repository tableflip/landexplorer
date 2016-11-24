import MapboxClient from 'mapbox'
import config from '../config'

export default (lngLatArr) => {
  const mapboxClient = new MapboxClient(config.mapboxApiAccessToken)

  return new Promise((resolve, reject) => {
    const lngLat = {
      longitude: Number(lngLatArr[0]),
      latitude: Number(lngLatArr[1])
    }
    mapboxClient.geocodeReverse(lngLat, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}
