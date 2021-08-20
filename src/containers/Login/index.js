import { withRouter } from 'react-router-dom'
import { useLayoutEffect, useState } from 'react'

import './styles.scss'
import auth from 'auth'
import LoginForm from './LoginForm'
import Logo from 'assets/images/Logo.png'

const Login = props => {
  const [loginresponse, setLoginresponse] = useState('')

  useLayoutEffect(() => {
    if (auth.isSignedIn()) {
      props.history.push('/dashboard')
    } else {
      props.history.push('/login')
    }
  }, [])

  const login = async (username, password, action) => {
    setLoginresponse('')

    let { message } = await auth.handleAuthentication(username, password)

    if (message) {
      action.resetForm()

      setLoginresponse(message)
    } else {
      props.history.push('/dashboard')
    }
  }

  const onSubmit = ({ email, password }, action) => {
    login(email, password, action)
  }

  return (
    <div className={'login-page'}>
      <img src={Logo} className={'logo'} />
      <h3 className={'welcome-heading'}> Welcome to Inventory System </h3>
      <div
        className={'form-error'}
        style={{
          marginBottom: 10,
          textAlign: 'center',
          display: `${loginresponse ? 'block' : 'none'}`
        }}
      >
        {loginresponse}
      </div>

      <div className={'login-main-container'}>
        <LoginForm onSubmit={onSubmit} />
      </div>
    </div>
  )
}

export default withRouter(Login)
