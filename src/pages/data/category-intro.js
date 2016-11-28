import React, { PropTypes } from 'react'
import round from '../../lib/round'

const CategoryIntro = ({ category, lngLat, placeData }) => {
  const { address, postcode, place } = placeData || {}

  return (
    <div className='cf'>
      <h1 className='f3 black-40 ttu tracked'>{category.category}</h1>
      <div className='fl w-60-ns'>
        <div className='mb3'>
          {category.description.split('\n').map((txt) => (
            <div key={txt} className='lh-copy'>{txt}</div>
          ))}
        </div>
      </div>
      <div className='fl w-40-ns pl3-ns'>
        <div className='mb3'>
          <span className='f6 mb1 black-40 db'>Title of address</span>
          <span className='f4'>{address || 'Unknown location'}{postcode && `, ${postcode}`}</span>
        </div>
        <div className='mb3'>
          <span className='f6 mb1 black-40 db'>Location</span>
          <span>{round(lngLat.lng, 3)}, {round(lngLat.lat, 3)}</span>
        </div>
        <div className='mb3'>
          <span className='f6 mb1 black-40 db'>County</span>
          <span>{place || 'Unknown'}</span>
        </div>
      </div>
    </div>
  )
}

CategoryIntro.propTypes = {
  category: PropTypes.shape({
    category: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  lngLat: PropTypes.shape({
    lng: PropTypes.number.isRequired,
    lat: PropTypes.number.isRequired
  }),
  placeData: PropTypes.shape({
    address: PropTypes.string,
    postcode: PropTypes.string,
    place: PropTypes.string
  })
}

export default CategoryIntro
