import { Route, Redirect } from 'react-router-dom'

import auth from 'auth'

const isLoggedIn = auth.isSignedIn()

export default ({ unprotected, ...rest }) => (
  <Route
    {...rest}
    render={() =>
      isLoggedIn && unprotected ? <Redirect to={'/dashboard'} /> : <Redirect to={'/login'} />
    }
  />
)
