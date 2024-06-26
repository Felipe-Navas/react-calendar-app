import '@testing-library/jest-dom'
import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { LoginScreen } from '../../../components/auth/LoginScreen'
import { startLogin, startRegister } from '../../../actions/auth'
import Swal from 'sweetalert2'

jest.mock('../../../actions/auth', () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn()
}))

jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}
const store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
)

describe('Testing the LoginScreen component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should call the login dispatch', () => {
    wrapper.find('input[name="lEmail"]').simulate('change', {
      target: { name: 'lEmail', value: 'juan@gmail.com' }
    })

    wrapper.find('input[name="lPassword"]').simulate('change', {
      target: { name: 'lPassword', value: '123456' }
    })

    wrapper
      .find('form')
      .at(0)
      .simulate('submit', {
        preventDefault: () => {}
      })

    expect(startLogin).toHaveBeenCalledWith('juan@gmail.com', '123456')
  })

  test('should not call the register when different passwords', () => {
    wrapper.find('input[name="rPassword1"]').simulate('change', {
      target: { name: 'rPassword1', value: '123456' }
    })

    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: { name: 'rPassword2', value: 'different-password' }
    })

    wrapper
      .find('form')
      .at(1)
      .simulate('submit', {
        preventDefault: () => {}
      })

    expect(startRegister).not.toHaveBeenCalled()
    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'Password do not match',
      'error'
    )
  })

  test('should register correctrly', () => {
    wrapper.find('input[name="rPassword1"]').simulate('change', {
      target: { name: 'rPassword1', value: '123456' }
    })

    wrapper.find('input[name="rPassword2"]').simulate('change', {
      target: { name: 'rPassword2', value: '123456' }
    })

    wrapper
      .find('form')
      .at(1)
      .simulate('submit', {
        preventDefault: () => {}
      })

    expect(Swal.fire).not.toHaveBeenCalled()
    expect(startRegister).toHaveBeenCalledWith(
      'felipe2@gmail.com',
      'Felipe',
      '123456'
    )
  })
})
