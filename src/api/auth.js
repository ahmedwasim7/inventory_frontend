import { instance } from 'api'

export const signIn = (email, password) =>
  new Promise((resolve, reject) => {
    instance
      .post(`/auth/login`, {
        email: email,
        password: password
      })
      .then(response => {
        if (response.data.message) {
          reject(response.data.message)
        } else {
          localStorage.setItem('token', response.data.jwt)

          instance.defaults.headers.common.authorization = `Bearer ${response.data.jwt}`

          resolve(response.data)
        }
      })
      .catch(error => reject(error))
  })

export const isSignIn = () =>
  new Promise((resolve, reject) => {
    instance
      .get(`/auth/auto_login`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        if (response.data.id) {
          resolve(true)
        } else {
          reject(false)
        }
      })
      .catch(error => reject(error))
  })
