import React from 'react'
import { Link } from 'react-router'

export default (props) => {
  return (
    <nav className='block w-100 bg-white'>
      <div className='fl w-80 pa2'>
        <Link to='/'>
          <img src='/svgs/land-explorer-logo.svg' />
        </Link>
      </div>
    </nav>
  )
}
