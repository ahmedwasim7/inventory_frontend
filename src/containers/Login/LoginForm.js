import { ErrorMessage, Field, Form, Formik } from 'formik'
import ReactLoading from 'react-loading'

import { Button } from 'components'
import { validate } from './validate'
import { initialValues } from 'helpers/login'

export default ({ onSubmit }) => (
  <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
    {({ errors, touched, isSubmitting }) => (
      <Form>
        <div className={'input-height'}>
          <Field
            name={'email'}
            type={'text'}
            placeholder={'Email'}
            autoComplete={'off'}
            className={'form-control' + (errors.email && touched.email ? '' : '')}
          />
          <ErrorMessage name={'email'} component={'div'} className={'form-error'} />
        </div>

        <div className={'input-height'}>
          <Field
            type={'password'}
            placeholder={'Password'}
            name={'password'}
            autoComplete={'off'}
            className={'form-control' + (errors.password && touched.password ? '' : '')}
          />
          <ErrorMessage name={'password'} component={'div'} className={'form-error'} />
        </div>

        <div className={'input-height'}>
          <Button
            className={`submit-button m-0 ${isSubmitting ? 'disabled-login-button' : ''}`}
            text={'Sign In'}
            classType={'primary'}
            // disabled={isSubmitting}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 0
            }}
          >
            {isSubmitting && (
              <ReactLoading
                type={'spin'}
                color={'#fff'}
                style={{
                  height: 35,
                  width: 35,
                  marginLeft: 10
                }}
              />
            )}
          </Button>
        </div>
      </Form>
    )}
  </Formik>
)
