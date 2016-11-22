import React from 'react'
import { render } from 'react-dom'
import Routes from './routes.jsx'
import { browserHistory } from 'react-router'

render(
  <Routes history={browserHistory} />,
  document.getElementById('react-root')
)
