
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
      scope: 'openid'
    })

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
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    localStorage.setItem('sub', authResult.idTokenPayload.sub)
  }

  logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('sub')
    history.replace('/')
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }
}
