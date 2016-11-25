import React, { PropTypes } from 'react'
import Map from '../home/map'
import LayerKey from './layer-key'

const PrimaryDataset = ({ dataset, lngLat }) => {
  if (!dataset) return null

  const { name, provider, description, url } = dataset

  return (
    <article>
      <div>
        <h1>{name}</h1>
        <p>{provider}</p>
        <p>{description}</p>
        <p><a href={url} target='_blank'>Find out more</a></p>
        <LayerKey dataset={dataset} />
      </div>
      <div>
        <Map lngLat={lngLat} zoom={14} />
      </div>
    </article>
  )
}

PrimaryDataset.propTypes = {
  dataset: PropTypes.shape({
    name: PropTypes.string.isRequired,
    provider: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    source: PropTypes.shape({
      type: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    }),
    layers: PropTypes.array
  }),
  lngLat: PropTypes.shape({
    lng: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired
  })
}

export default PrimaryDataset
