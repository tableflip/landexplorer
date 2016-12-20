export default (query) => {
  if (!query.lng || !query.lat) return null
  return {
    lng: Number(query.lng),
    lat: Number(query.lat)
  }
}
