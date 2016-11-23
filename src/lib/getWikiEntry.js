import fetchJsonp from 'fetch-jsonp'
import qs from 'query-string'

export default (query) => {
  if (!query) throw new Error()
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
      if (!result || !result[2]) result = [null, null, ['There is no information for this area yet']]
      return resolve(result[2][0])
    }).catch((err) => reject(err))
  })
}
