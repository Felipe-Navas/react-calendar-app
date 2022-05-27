import { uiCloseModal, uiOpenModal } from '../../actions/ui'
import { uiReducer } from '../../reducers/uiReducer'

const initState = {
  modalOpen: false,
}

describe('Testing the uiReducer', () => {
  test('should return the default state', () => {
    const state = uiReducer(initState, {})
    expect(state).toEqual(initState)
  })

  test('should open and close the modal', () => {
    const modalOpen = uiOpenModal()
    const state = uiReducer(initState, modalOpen)
    expect(state).toEqual({ modalOpen: true })

    const modalClose = uiCloseModal()
    const state2 = uiReducer(state, modalClose)

    expect(state2).toEqual({ modalOpen: false })
  })
})
