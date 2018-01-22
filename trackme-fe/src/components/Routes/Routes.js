import React from 'react'
import {Route, Router} from 'react-router-dom'

import App from '../App/App'
import Home from '../Home/Home'
import AuthCallback from '../AuthCallback/AuthCallback'

const Routes = () => {
  return (
    <Router>
      <div>
        <Route path="/" render={(props) => <App {...props} />} />
        <Route path="/auth0callback" render={(props) => <AuthCallback {...props} />} />
      </div>
    </Router>
  )
}
