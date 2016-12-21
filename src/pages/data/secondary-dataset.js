import React, { PropTypes } from 'react'

const SecondaryDataset = ({ dataset }) => {
  if (!dataset) return null

  const { name, provider, description, url } = dataset

  return (
    <article>
      <h1 className='f4 black-40'>{name}</h1>
      <a className='f6 black-40 ttu tracked no-underline' href={url} target='_blank'>{provider}</a>
      <p className='lh-copy' dangerouslySetInnerHTML={{ __html: description }} />
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
