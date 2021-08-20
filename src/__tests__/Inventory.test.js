import { act } from 'react-dom/test-utils'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { BrowserRouter as Router } from 'react-router-dom'
import Enzyme, { mount, shallow } from 'enzyme'
import { Formik } from 'formik'
import React from 'react'
import { RecoilRoot } from 'recoil'

import InventoryForm from 'containers/Inventory/Form'
import { OverlayLoader } from 'components'
import { waitForComponentToPaint } from '../util'

describe('Inventory Component', () => {
  let wrapper = mount(
    <RecoilRoot>
      <Router>
        <InventoryForm />
      </Router>
    </RecoilRoot>
  )

  it('should show the elements', () => {
    expect(wrapper.find('input[name="serialNumber"]').length).toBe(1)
    expect(wrapper.find('input[name="name"]').length).toBe(1)
    expect(wrapper.find('input[name="description"]').length).toBe(1)
    expect(wrapper.find('input[name="price"]').length).toBe(1)
    expect(wrapper.find('input[name="purchaseDate"]').length).toBe(1)
    expect(wrapper.find('input[name="quantity"]').length).toBe(1)
    expect(wrapper.find('button').at(0).text()).toBe('Save')
    expect(wrapper.find('button').at(1).text()).toBe('Cancel')
  })
})

describe('Update Inventory Form', () => {
  let wrapper = mount(
    <RecoilRoot>
      <Router>
        <InventoryForm />
      </Router>
    </RecoilRoot>
  )

  it('should update the fields', async () => {
    const serialNumberInput = wrapper.find('input[name="serialNumber"]')
    serialNumberInput.instance().value = '123456'
    serialNumberInput.simulate('change')

    const nameInput = wrapper.find('input[name="name"]')
    nameInput.instance().value = 'Pencil'
    nameInput.simulate('change')

    const descriptionInput = wrapper.find('input[name="description"]')
    descriptionInput.instance().value = 'Description'
    descriptionInput.simulate('change')

    const priceInput = wrapper.find('input[name="price"]')
    priceInput.instance().value = '1000'
    priceInput.simulate('change')

    const purchaseDateInput = wrapper.find('input[name="purchaseDate"]')
    purchaseDateInput.instance().value = '2021-08-01'
    purchaseDateInput.simulate('change')

    const quantityInput = wrapper.find('input[name="quantity"]')
    quantityInput.instance().value = '100'
    quantityInput.simulate('change')

    await waitForComponentToPaint(wrapper)

    expect(wrapper.find('input[name="serialNumber"]').prop('value')).toBe('123456')
    expect(wrapper.find('input[name="name"]').prop('value')).toBe('Pencil')
    expect(wrapper.find('input[name="description"]').prop('value')).toBe('Description')
    expect(wrapper.find('input[name="price"]').prop('value')).toBe('1000')
    expect(wrapper.find('input[name="purchaseDate"]').prop('value')).toBe('2021-08-01')
    expect(wrapper.find('input[name="quantity"]').prop('value')).toBe('100')
  })
})
