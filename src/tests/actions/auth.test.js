import '@testing-library/jest-dom'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import Swal from 'sweetalert2'
import { startChecking, startLogin, startRegister } from '../../actions/auth'
import { types } from '../../types/types'
import * as fetchModule from '../../helpers/fetch'

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {}
let store = mockStore(initState)

Storage.prototype.setItem = jest.fn()

describe('Testing auth actions', () => {
  beforeEach(() => {
    store = mockStore(initState)
    jest.clearAllMocks()
  })

  test('should login correctly calling startLogin', async () => {
    await store.dispatch(startLogin('felipe@gmail.com', '123456'))
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: expect.any(String), name: expect.any(String) },
    })

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token',
      expect.any(String)
    )

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    )

    // This is for get the data called from the mock in jest
    // const token = localStorage.setItem.mock.calls[0][1]
  })

  test('should fail calling startLogin', async () => {
    await store.dispatch(startLogin('felipe@gmail.com', 'invalid-password'))
    let actions = store.getActions()
    expect(actions).toEqual([])
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'Invalid password', 'error')

    await store.dispatch(startLogin('felipe-invalid-email@gmail.com', '123456'))
    actions = store.getActions()
    expect(actions).toEqual([])
    expect(Swal.fire).toHaveBeenCalledWith('Error', 'User not found', 'error')
  })

  test('should register a user correctly calling startRegister', async () => {
    fetchModule.fetchWithoutToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: 'some-uid',
          name: 'test-name',
          token: 'some-token',
        }
      },
    }))

    await store.dispatch(startRegister('test@test.com', 'test', '123456'))
    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: 'some-uid', name: 'test-name' },
    })

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'some-token')

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'token-init-date',
      expect.any(Number)
    )
  })

  test('should checking correctly calling startChecking', async () => {
    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: 'some-uid',
          name: 'test-name',
          token: 'some-token1',
        }
      },
    }))

    await store.dispatch(startChecking())

    const actions = store.getActions()

    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: { uid: 'some-uid', name: 'test-name' },
    })

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'some-token1')
  })
})
