import React, { PropTypes } from 'react'

const SecondaryDataset = ({ dataset }) => {
  if (!dataset) return null

  const { name, provider, description, url } = dataset

  return (
    <article>
      <div>
        <h1>{name}</h1>
        <p>{provider}</p>
        <p>{description}</p>
        <p><a href={url} target='_blank'>Find out more</a></p>
      </div>
    </article>
  )
}

SecondaryDataset.propTypes = {
  dataset: PropTypes.shape({
    name: PropTypes.string.isRequired,
    provider: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  })
}

export default SecondaryDataset
