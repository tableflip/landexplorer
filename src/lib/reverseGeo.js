import MapboxClient from 'mapbox'
import config from '../config'

export default (lngLat) => {
  const mapboxClient = new MapboxClient(config.mapboxApiAccessToken)

  return new Promise((resolve, reject) => {
    mapboxClient.geocodeReverse({ latitude: lngLat[1], longitude: lngLat[0] }, (err, res) => {
      if (err) return reject(err)
      resolve(res)
    })
  })
}
