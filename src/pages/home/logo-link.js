import React from 'react'
import { Link } from 'react-router'

export default ({to}) => (
  <Link className='db pa3' to={to || '/'}>
    <img src='/svg/land-explorer-logo.svg' width='202' height='34' />
  </Link>
)