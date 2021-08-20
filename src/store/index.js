import { atom } from 'recoil'

export const loadingState = atom({
  key: 'loadingState',
  default: false
})

export const isLoggedInState = atom({
  key: 'userLoggedIn',
  default: undefined
})

export const modalState = atom({
  key: 'modalState',
  default: false
})
