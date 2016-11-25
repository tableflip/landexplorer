import React from 'react'
import { Router, Route, IndexRoute, applyRouterMiddleware } from 'react-router'
import { useScroll } from 'react-router-scroll'
import Layout from './layout.jsx'
import Home from './pages/home'
import Place from './pages/place'
import Data from './pages/data'

const Routes = (props) => {
  const { history } = props
  return (
    <Router history={history} render={applyRouterMiddleware(useScroll())}>
      <Route path='/' component={Layout}>
        <IndexRoute component={Home} />
        <Route path='place' component={Place} />
        <Route path='data/:category' component={Data} />
      </Route>
    </Router>
  )
}

export default Routes
