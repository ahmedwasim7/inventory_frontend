import { ErrorMessage, Field, Form, Formik } from 'formik'
import './styles.scss'

import { Button } from 'components'
import { validate } from './validate'

const formInitialValues = {
  serialNumber: '',
  name: '',
  description: '',
  price: '',
  purchaseDate: '',
  quantity: ''
}

export default ({ closeModal, onSubmit, isDisable, initialValues }) => (
  <Formik
    initialValues={initialValues?.name ? initialValues : formInitialValues}
    validate={validate}
    onSubmit={onSubmit}
  >
    {() => (
      <Form className={'inventory-form'}>
        <div>
          <div style={{ display: 'flex' }}>
            <div className={'field-container'} style={{ marginRight: 30 }}>
              <label>Serial Number</label>
              <Field
                name={'serialNumber'}
                type={'text'}
                placeholder={'Serial Number'}
                autoComplete={'off'}
                className={'form-control'}
              />
              <ErrorMessage name={'serialNumber'} component={'div'} className={'form-error'} />
            </div>

            <div className={'field-container'}>
              <label>Name</label>
              <Field
                name={'name'}
                type={'text'}
                placeholder={'Name'}
                autoComplete={'off'}
                className={'form-control'}
              />
              <ErrorMessage name={'name'} component={'div'} className={'form-error'} />
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div className={'field-container'} style={{ marginRight: 30 }}>
              <label>Description</label>
              <Field
                name={'description'}
                type={'text'}
                placeholder={'Description'}
                autoComplete={'off'}
                className={'form-control'}
              />
              <ErrorMessage name={'description'} component={'div'} className={'form-error'} />
            </div>

            <div className={'field-container'}>
              <label>Price</label>
              <Field
                name={'price'}
                type={'text'}
                placeholder={'Price'}
                autoComplete={'off'}
                className={'form-control'}
              />
              <ErrorMessage name={'price'} component={'div'} className={'form-error'} />
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div className={'field-container'} style={{ marginRight: 30 }}>
              <label>Purchase Date</label>
              <Field
                name={'purchaseDate'}
                type={'date'}
                placeholder={'Purchase Date'}
                autoComplete={'off'}
                className={'form-control'}
              />
              <ErrorMessage name={'purchaseDate'} component={'div'} className={'form-error'} />
            </div>

            <div className={'field-container'} style={{ marginBottom: 50 }}>
              <label>Quantity</label>
              <Field
                name={'quantity'}
                type={'text'}
                placeholder={'Quantity'}
                autoComplete={'off'}
                className={'form-control'}
              />
              <ErrorMessage name={'quantity'} component={'div'} className={'form-error'} />
            </div>
          </div>

          <div className={'button-container'}>
            <Button
              text={initialValues?.name ? 'Update' : 'Save'}
              classType={'primary'}
              type={'submit'}
              className={isDisable && 'disabled'}
              disabled={isDisable}
            />
            <Button text={'Cancel'} classType={'secondary'} onClick={closeModal} />
          </div>
        </div>
      </Form>
    )}
  </Formik>
)
