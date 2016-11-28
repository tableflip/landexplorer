import React from 'react'
import { Link } from 'react-router'

export default (props) => {
  return (
    <nav className='block w-100 fixed z-1 bg-white bb b--black-05' style={{height: '53px'}}>
      <div className='fl w-80 pv2 ph3'>
        <Link to='/' className='dib'>
          <img src='/svg/land-explorer-logo.svg' />
        </Link>
      </div>
    </nav>
  )
}
