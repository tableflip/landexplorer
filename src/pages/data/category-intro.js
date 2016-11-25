import React, { PropTypes } from 'react'
import round from '../../lib/round'

const CategoryIntro = ({ category, lngLat, placeData }) => {
  const { address, postcode, place } = placeData || {}

  return (
    <div>
      <h1>{category.category}</h1>
      <div>
        {category.description.split('\n').map((txt) => (
          <div key={txt}>{txt}</div>
        ))}
      </div>
      <div>
        <ul>
          <li>
            <span>Title of address</span>
            {address || 'Unknown location'}{postcode && `, ${postcode}`}
          </li>
          <li>
            <span>Location</span>
            {round(lngLat.lng, 3)}, {round(lngLat.lat, 3)}
          </li>
          <li>
            <span>County</span>
            {place || 'Unknown'}
          </li>
          <li>
            <span>Elevation</span>
            [20ft]
          </li>
        </ul>
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
