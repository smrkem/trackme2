import React from 'react'
import UserProfile from '../UserProfile/UserProfile'

import './UserInfo.css'

class UserInfo extends React.Component {
  login() {
    this.props.auth.login()
  }

  logout() {
    this.props.auth.logout()
  }

  render() {
    const { isAuthenticated } = this.props.auth
    return (
      <div id="user">
        {
          !isAuthenticated() && (
            <button className="button" onClick={this.login.bind(this)}>Log In</button>
          )
        }
        {
          isAuthenticated() && (
            <div id="user-info">
              <UserProfile {...this.props} />
              <button className="button" onClick={this.logout.bind(this)}>Log Out</button>
            </div>
          )
        }
      </div>
    )
  }
}

export default UserInfo
