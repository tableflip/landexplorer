import 'es6-promise'
import 'whatwg-fetch'
import queryString from 'query-string'

const endpoint = 'http://geoserver.tableflip.io/geoserver/topp/ows'
const defaultParams = {
  service: 'WFS',
  version: '1.0',
  request: 'GetFeature',
  maxFeatures: 50,
  outputFormat: 'application/json'
}

export default {
  get (params) {
    const allParams = Object.assign({}, defaultParams, params)
    const qs = queryString.stringify(allParams)
    const url = `${endpoint}?${qs}`

    return fetch(url)
      .then((res) => res.json())
  }
}
