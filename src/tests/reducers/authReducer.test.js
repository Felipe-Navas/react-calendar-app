import { authReducer } from '../../reducers/authReducer'
import { types } from '../../types/types'

const initState = {
  checking: true
}

describe('Testing the uiReducer', () => {
  test('should return the default state', () => {
    const state = authReducer(initState, {})
    expect(state).toEqual(initState)
  })

  test('should login correctly', () => {
    const action = {
      type: types.authLogin,
      payload: { uid: 'some-uid', name: 'test-name' }
    }

    const state = authReducer(initState, action)

    expect(state).toEqual({
      uid: 'some-uid',
      name: 'test-name',
      checking: false
    })
  })
})
