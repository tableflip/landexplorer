import React from 'react'
import { Router, Route, IndexRoute, applyRouterMiddleware } from 'react-router'
import { useScroll } from 'react-router-scroll'
import Layout from './layout.jsx'
import Place from './pages/place'
import Data from './pages/data'

const Routes = (props) => {
  const { history } = props
  return (
    <Router history={history} render={applyRouterMiddleware(useScroll())}>
      <Route path='/' component={Layout}>
        <IndexRoute component={Place} />
        <Route path='/:category' component={Data} />
      </Route>
    </Router>
  )
}

export default Routes
