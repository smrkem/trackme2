import React from 'react'
import './UserProfile.css'

const UserProfile = (props) => {
  const profile = props.auth.getUserProfile()
  return (
    <div id='user-image'>
      <img src={profile.picture} alt={profile.nickname}/>
    </div>
  )
}

export default UserProfile
