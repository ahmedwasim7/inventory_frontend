import { Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import { Header, OverlayLoader } from 'components'
import PrivateRoute from 'routes/PrivateRoute'
import PublicRoute from 'routes/PublicRoute'

import { Login, Dashboard } from 'containers'

require('dotenv').config()

export default () => {
  const renderHeader = ![].includes(window.location.pathname) && <Header />

  return (
    <Router>
      <ToastContainer />

      <div className={'app'}>
        <Suspense fallback={<OverlayLoader />}>
          {renderHeader}

          <div className={'flex-container'} style={{ justifyContent: 'center' }}>
            <Switch>
              <PublicRoute unprotected={true} component={Login} path={['/', '/login']} exact />
              <PrivateRoute component={Dashboard} path={'/dashboard'} exact />
              <Route path={'*'} exact={true} component={Login} />
            </Switch>
          </div>
        </Suspense>
      </div>
    </Router>
  )
}
