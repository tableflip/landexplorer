export default (geoJson, featureName) => {
  const f = geoJson.features.find((feature) => {
    return feature.id.substr(0, featureName.length) === featureName
  })
  return f && f.text
}
