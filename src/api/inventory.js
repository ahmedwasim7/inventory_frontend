import { instance } from 'api'

export const fetchInventories = (page, perPage) =>
  new Promise((resolve, reject) => {
    let params = page && perPage ? `?page=${page}&per_page=${perPage}` : ''

    instance
      .get(`/inventories/${params}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => resolve(response.data))
      .catch(err => reject(err))
  })

export const deleteInventory = id =>
  new Promise(resolve => {
    instance
      .delete(`/inventories/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => resolve(response.data))
      .catch(error => resolve(error))
  })

export const createInventory = values => {
  let data = {
    serial_no: values.serialNumber,
    name: values.name,
    description: values.description,
    price: values.price,
    purchase_date: values.purchaseDate,
    quantity: values.quantity
  }

  return new Promise(resolve => {
    instance
      .post(
        '/inventories/',
        {
          inventory: data
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      .then(response => resolve(response.data))
      .catch(error => resolve(error))
  })
}

export const updateInventory = (id, values) => {
  let data = {
    serial_no: values.serialNumber,
    name: values.name,
    description: values.description,
    price: values.price,
    purchase_date: values.purchaseDate,
    quantity: values.quantity
  }

  return new Promise(resolve => {
    instance
      .put(
        `/inventories/${id}/`,
        {
          inventory: data
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      .then(response => resolve(response.data))
      .catch(error => resolve(error))
  })
}
