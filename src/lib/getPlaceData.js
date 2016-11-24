import getFeature from './getFeature'
import reverseGeo from './reverseGeo'

export default (lngLat) => {
  if (!lngLat) throw new Error()
  return new Promise((resolve, reject) => {
    reverseGeo(lngLat)
      .then((geoData) => {
        const address = getFeature(geoData, 'address') || ''
        const postcode = getFeature(geoData, 'postcode') || ''
        const place = getFeature(geoData, 'place') || ''
        return resolve({ address, postcode, place })
      }).catch((err) => reject(err))
  })
}
