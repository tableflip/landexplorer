import React, { PropTypes } from 'react'

const LayerKey = ({ dataset }) => {
  if (!dataset) return null

  const layers = dataset.layers || [dataset.style]

  return (
    <ul>
      {layers.map((layer) => {
        const style = {
          display: 'inline-block',
          width: '25px',
          height: '25px',
          backgroundColor: layer.paint['fill-color'],
          opacity: layer.paint['fill-opacity'] || 1
        }

        return <li><span style={style} /> {layer.id || layer.source}</li>
      })}
    </ul>
  )
}

LayerKey.propTypes = {
  dataset: PropTypes.shape({
    // Dataset with single layer
    style: PropTypes.shape({
      source: PropTypes.string.isRequired,
      paint: PropTypes.shape({
        'fill-color': PropTypes.string.isReuqired,
        'fill-opacity': PropTypes.string
      }).isRequired
    }),
    // Dataset with multiple layers
    layers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        paint: PropTypes.shape({
          'fill-color': PropTypes.string.isReuqired,
          'fill-opacity': PropTypes.string
        }).isRequired
      })
    )
  })

}

export default LayerKey
