import React from 'react'
import Enzyme, { mount, shallow } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Login from 'containers/Login'
import LoginForm from 'containers/Login/LoginForm'
import { act } from 'react-dom/test-utils'
import { BrowserRouter as Router } from 'react-router-dom'
import { OverlayLoader } from 'components'
import { RecoilRoot } from 'recoil'
import { Formik } from 'formik'
import { waitForComponentToPaint } from '../util'

describe('Login Component', () => {
  let wrapper = mount(
    <RecoilRoot>
      <Router>
        <Login />
      </Router>
    </RecoilRoot>
  )

  it('should show the elements', () => {
    expect(wrapper.find('h3').find('.welcome-heading').text()).toBe(' Welcome to Inventory System ')
    expect(wrapper.find('button').text()).toBe('Sign In')
    expect(wrapper.find('input').find({ name: 'email' }).length).toBe(1)
    expect(wrapper.find('input').find({ name: 'password' }).length).toBe(1)
    expect(wrapper.find('button').length).toBe(1)
  })
})

describe('Should update the fields', () => {
  describe('When it is rendered', () => {
    let wrapper = mount(
      <RecoilRoot>
        <Router>
          <LoginForm />
        </Router>
      </RecoilRoot>
    )

    it('Then the form fields should have the correct value', async () => {
      const emailInput = wrapper.find('input[name="email"]')
      emailInput.instance().value = 'test@example.com'
      emailInput.simulate('change')

      const passwordInput = wrapper.find('input[name="password"]')
      passwordInput.instance().value = 'qwerty'
      passwordInput.simulate('change')

      await waitForComponentToPaint(wrapper)

      expect(wrapper.find('input[name="email"]').prop('value')).toBe('test@example.com')
      expect(wrapper.find('input[name="password"]').prop('value')).toBe('qwerty')
    })
  })
})
