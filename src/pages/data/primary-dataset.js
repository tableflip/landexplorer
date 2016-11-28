import React, { PropTypes } from 'react'
import Map from '../home/map'
import LayerKey from './layer-key'

const PrimaryDataset = ({ dataset, lngLat }) => {
  if (!dataset) return null

  const { name, provider, description, url } = dataset

  return (
    <article className='cf'>
      <div className='fl w-40-ns'>
        <h1 className='f6 black-40 ttu tracked'>{name}</h1>
        <p className='f6 black-40 ttu tracked'>{provider}</p>
        <p className='lh-copy'>{description}</p>
        <p className='mb4'>
          <a href={url} target='_blank' className='green'>Find out more</a>
        </p>
        <LayerKey dataset={dataset} />
      </div>
      <div className='fl w-60-ns pl3'>
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
