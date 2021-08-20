import { Route, Redirect } from 'react-router-dom'

import auth from 'auth'

export default ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (auth.isSignedIn() ? <Component {...props} /> : <Redirect to={'/login'} />)}
  />
)
