import React from 'react'
import {Route, Router} from 'react-router-dom'
import history from './history'

import AuthService from '../AuthService/AuthService'
import App from '../App/App'
import AuthCallback from '../AuthCallback/AuthCallback'

const auth = new AuthService()

const handleAuthentication = (props) => {
  if (/access_token|id_token|error/.test(props.location.hash)) {
    auth.handleAuthentication();
  } else {
    console.log("NOPE@!!")
  }
}

const Routes = () => {
  return (
    <Router history={history}>
      <div>
        <Route path="/" render={(props) => <App auth={auth} {...props} />} />
        <Route path="/auth0callback" render={(props) => {
          handleAuthentication(props)
          return <AuthCallback {...props} />
        }}/>
      </div>
    </Router>
  )
}

export default Routes
