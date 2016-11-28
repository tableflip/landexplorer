import React, { PropTypes } from 'react'

const SecondaryDataset = ({ dataset }) => {
  if (!dataset) return null

  const { name, provider, description, url } = dataset

  return (
    <article>
      <h1 className='f6 black-40 ttu tracked'>{name}</h1>
      <p className='f6 black-40 ttu tracked'>{provider}</p>
      <p className='lh-copy'>{description}</p>
      <p>
        <a href={url} target='_blank' className='green'>Find out more</a>
      </p>
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
