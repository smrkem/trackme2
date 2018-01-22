
import auth0 from 'auth0-js'
import { AUTH0_CONFIG } from './auth0-config'
import history from '../Routes/history'

export default class AuthService {
  auth0 = new auth0.WebAuth({
    domain: AUTH0_CONFIG.domain,
    clientID: AUTH0_CONFIG.clientId,
    redirectUri: AUTH0_CONFIG.callbackUrl,
    audience: `https://${AUTH0_CONFIG.domain}/userinfo`,
    responseType: 'token id_token',
    scope: 'openid profile email'
  })

  constructor() {
    this.login = this.login.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.logout = this.logout.bind(this)
    this.getUserProfile = this.getUserProfile.bind(this)
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        history.replace('/')
      } else if (err) {
        console.log('Err:', err);
      }
    })
  }

  setSession(authResult) {
    let { sub, name, nickname, picture, email } = authResult.idTokenPayload
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('profile', JSON.stringify({
      sub,
      name,
      nickname,
      picture,
      email,
    }))
  }

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('profile')
    history.replace('/')
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  getUserProfile() {
    let userProfile = JSON.parse(localStorage.getItem('profile'))
    if (!userProfile) {
      console.log('empty user profile')
      userProfile = {}
    }
    return userProfile
  }

}
