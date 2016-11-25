import flatMap from 'lodash.flatmap'
import categories from '../datasets.json'

export default categories

export const datasets = flatMap(categories.map((c) => c.datasets))

export function findDatasetById (id) {
  return datasets.filter((dataset) => dataset.id === id)
}
