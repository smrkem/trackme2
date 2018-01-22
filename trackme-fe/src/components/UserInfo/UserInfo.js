import React from 'react'
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
      <div id="login">
        {
          !isAuthenticated() && (
            <button className="button" onClick={this.login.bind(this)}>Log In</button>
          )
        }
        {
          isAuthenticated() && (
            <button className="button" onClick={this.logout.bind(this)}>Log Out</button>
          )
        }
      </div>
    )
  }
}

export default UserInfo
