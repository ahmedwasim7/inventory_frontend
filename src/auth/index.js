import { signIn } from 'api/auth'

class Auth {
  constructor() {
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.signOut = this.signOut.bind(this)
  }

  isSignedIn() {
    return localStorage.getItem('token') ? true : false
  }

  handleAuthentication(username, password) {
    return new Promise(resolve => {
      signIn(username, password)
        .then(({ jwt, user }) => {
          this.jwt = jwt
          localStorage.setItem('user', JSON.stringify(user))

          resolve(user)
        })
        .catch(error => {
          resolve({ message: error })
        })
    })
  }

  signOut() {
    localStorage.clear()
  }
}

const auth0Client = new Auth()

export default auth0Client
