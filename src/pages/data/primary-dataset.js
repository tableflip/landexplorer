import React, { PropTypes } from 'react'
import Map from '../home/map'
import LayerKey from './layer-key'

const PrimaryDataset = ({ dataset, lngLat }) => {
  if (!dataset) return null
  const { name, provider, description, url } = dataset
  const selectedLayers = [dataset]
  return (
    <article className='cf'>
      <div className='fl w-100 w-40-ns'>
        <h1 className='f4 black-40'>{name}</h1>
        <p className='f6 black-40 ttu tracked'>{provider}</p>
        <p className='lh-copy' dangerouslySetInnerHTML={{ __html: description }} />
        <p className='mb4'>
          <a href={url} target='_blank' className='green'>Find out more</a>
        </p>
        <LayerKey dataset={dataset} />
      </div>
      <div className='fl w-100 w-60-ns pl3-ns' style={{height: 600}}>
        <Map datasets={selectedLayers} selectedLayers={selectedLayers} lngLat={lngLat} zoom={11} minZoom={8} />
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
