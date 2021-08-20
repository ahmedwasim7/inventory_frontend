export const validate = values => {
  const errors = {}

  if (!values.serialNumber) {
    errors.serialNumber = 'Required'
  } else {
    if (!/^[0-9]+$/.test(values.serialNumber)) {
      errors.serialNumber = 'Invalid!'
    }
  }
  if (!values.name) {
    errors.name = 'Required'
  } else {
    if (!/^[a-zA-Z()]+$/.test(values.name)) errors.name = 'Invalid!'
  }
  if (!values.description) {
    errors.description = 'Required'
  } else {
    if (values.description.length > 50) {
      errors.description = 'Length should be at max 50 Characters!'
    }
  }
  if (!values.price) {
    errors.price = 'Required'
  } else {
    if (!/^[0-9]+$/.test(values.price)) errors.price = 'Invalid!'
  }
  if (!values.purchaseDate) errors.purchaseDate = 'Required'
  if (!values.quantity) {
    errors.quantity = 'Required'
  } else {
    if (!/^[0-9]+$/.test(values.quantity)) errors.quantity = 'Invalid!'
  }

  return errors
}
