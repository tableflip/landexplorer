import flatMap from 'lodash.flatmap'
import categories from '../datasets.json'

export default categories

export const datasets = flatMap(categories.map((c) => c.datasets))

// Used by the place page, to show the first source in each category
export const highlights = categories.reduce((res, c) => {
  let category = Object.assign({}, c)
  const justTheFirst = category.datasets.slice(0, 1)
  category.datasets = justTheFirst
  res.push(category)
  return res
}, [])

export function findDatasetById (id) {
  const ids = id.length ? id : [id]
  return datasets.filter((dataset) => ids.some((id) => dataset.id === id))
}
