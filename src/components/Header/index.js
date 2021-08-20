import { withRouter } from 'react-router-dom'

import auth from 'auth'
import Logo from 'assets/images/Logo.png'
import './styles.scss'

const Header = ({ history }) => {
  const handleLogoClick = () => history.push('/dashboard')

  const handleLogout = () => {
    auth.signOut()

    history.push('/login')
  }

  return (
    <div className={'header-main-container'}>
      <div>
        <div className={'logo'} onClick={() => handleLogoClick()}>
          <img src={Logo} />
          {!auth.isSignedIn() ? (
            <div>Inventory System</div>
          ) : (
            <div
              className={'header-title'}
              hidden={!auth.isSignedIn()}
              onClick={() => history.push('/dashboard')}
            >
              Dashboard
            </div>
          )}
        </div>
      </div>

      {auth.isSignedIn() && (
        <div style={{ alignSelf: 'center', marginRight: 20, cursor: 'pointer' }}>
          <div onClick={handleLogout}>Logout</div>
        </div>
      )}
    </div>
  )
}

export default withRouter(Header)
