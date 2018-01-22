import React from 'react'
import './Header.css'
import UserInfo from '../UserInfo/UserInfo'

class Header extends React.Component {
  goTo(route) {
    this.props.history.replace('/')
  }

  render() {
    return (
      <header>
        <div id="brand" onClick={() => { this.goTo('/') } }>TrackMe</div>
        <UserInfo {...this.props} />
      </header>
    )
  }
}

export default Header
