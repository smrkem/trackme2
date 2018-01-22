import React from 'react'
import Header from '../Header/Header'

const App = (props) => {
  const { isAuthenticated } = props.auth
  return (
      <div>
        <Header {...props} />
        <div className="container">
          {
            !isAuthenticated() && (
              <h1>You must be logged in to use the app</h1>
            )
          }
          {
            isAuthenticated() && (
              <h1>Welcome to TrackMe!</h1>
            )
          }
        </div>
      </div>
  )
}

export default App
