export default function canonicalUrl (location) {
  return `https://landexplorer.uk${location.pathname}${location.search}`
}
