import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import Layout from './layout.jsx'
import Home from './pages/home'
import Place from './pages/place'
import Data from './pages/data'

const Routes = (props) => {
  const { history } = props
  return (
    <Router history={history}>
      <Route path='/' component={Layout}>
        <IndexRoute component={Home} />
        <Route path='place/:place/data/:data' component={Data} />
        <Route path='place' component={Place} />
        <Route path='data/:data' component={Data} />
      </Route>
    </Router>
  )
}

export default Routes
