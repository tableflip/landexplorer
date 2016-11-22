import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import Layout from './layout.jsx'
import Home from './pages/home'
import Place from './pages/place'

const Routes = (props) => {
  const { history } = props
  return (
    <Router history={history}>
      <Route path='/' component={Layout}>
        <IndexRoute component={Home} />
        <Route path='place/:place' component={Place} />
      </Route>
    </Router>
  )
}

export default Routes
