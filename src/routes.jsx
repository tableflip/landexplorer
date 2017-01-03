import React from 'react'
import { Router, Route, IndexRoute, applyRouterMiddleware } from 'react-router'
import { useScroll } from 'react-router-scroll'
import ReactGA from 'react-ga'
import Layout from './layout.jsx'
import Place from './pages/place'
import Data from './pages/data'
import config from './config'

ReactGA.initialize(config.googleTrackingId)

function logPageView () {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

const Routes = (props) => {
  const { history } = props
  return (
    <Router history={history} render={applyRouterMiddleware(useScroll())} onUpdate={logPageView}>
      <Route path='/' component={Layout}>
        <IndexRoute component={Place} />
        <Route path='/:category' component={Data} />
      </Route>
    </Router>
  )
}

export default Routes
