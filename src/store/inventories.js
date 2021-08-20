import { atom } from 'recoil'

export const setTotalState = atom({
  key: 'totalState',
  default: 0
})

export const setPerPageState = atom({
  key: 'perPageState',
  default: 25
})

export const setPageState = atom({
  key: 'pageState',
  default: 1
})

export const inventoriesState = atom({
  key: 'allInventoriesListState',
  default: []
})

export const selectedInventory = atom({
  key: 'specificInventory',
  default: {}
})
