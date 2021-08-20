import React from 'react'
import Enzyme, { mount, shallow, render } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Dashboard from 'containers/Dashboard'
import Table from 'containers/Dashboard/Table'
import { act } from 'react-dom/test-utils'
import { BrowserRouter as Router } from 'react-router-dom'
import { OverlayLoader } from 'components'
import Recoil, { RecoilRoot, snapshot_UNSTABLE } from 'recoil'
import { Formik } from 'formik'
import { inventoriesState } from 'store/inventories'
import { loadingState } from 'store'
import { waitForComponentToPaint } from 'util'

describe('Dashboard Component', () => {
  let wrapper = mount(
    <RecoilRoot>
      <Router>
        <Dashboard />
      </Router>
    </RecoilRoot>
  )

  it('should show the elements', async () => {
    expect(wrapper.find('.heading').text()).toBe('Dashboard')
    expect(wrapper.find('button').text()).toBe('NewInventory')
    expect(wrapper.find(Table).length).toBe(1)
    expect(wrapper.find('.react-loading-skeleton').at(0).length).toBe(1)
  })
})

describe('Inventory Table', () => {
  let wrapper = mount(
    <RecoilRoot>
      <Router>
        <Table />
      </Router>
    </RecoilRoot>
  )

  const mockInventories = [{
    barcode: 'A-21-0001',
    serial_no: '123456',
    name: 'Toy',
    description: 'Hello There!',
    price: 10,
    purchase_date: '2021/08/21',
    quantity: 100,
    created_by: 'Usman',
    created_at: '2021/08/19'
  }]

  it('should show the text', async () => {
    const initialSnapshot = snapshot_UNSTABLE()
    expect(initialSnapshot.getLoadable(inventoriesState).valueOrThrow()).toEqual([])

    const testSnapshot = snapshot_UNSTABLE(({ set }) => set(inventoriesState, mockInventories))
    expect(testSnapshot.getLoadable(inventoriesState).valueOrThrow()).toBe(mockInventories)
  })
})
