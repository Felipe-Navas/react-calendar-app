import '@testing-library/jest-dom'
import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { act } from '@testing-library/react'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { CalendarScreen } from '../../../components/calendar/CalendarScreen'
import { messages } from '../../../helpers/calendar-messages'
import { types } from '../../../types/types'
import { eventSetActive } from '../../../actions/events'

jest.mock('../../../actions/events', () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn()
}))

Storage.prototype.setItem = jest.fn()

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initState = {
  calendar: {
    events: []
  },
  auth: {
    uid: '123',
    name: 'test'
  },
  ui: {
    modalOpen: false
  }
}
const store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
)

describe('Testing the CalendarScreen component', () => {
  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('should works correctly', () => {
    const calendar = wrapper.find('Calendar')

    const calendarMessages = calendar.prop('messages')
    expect(calendarMessages).toEqual(messages)

    calendar.prop('onDoubleClickEvent')()
    expect(store.dispatch).toHaveBeenCalledWith({
      type: types.uiOpenModal
    })

    act(() => {
      calendar.prop('onSelectEvent')({ start: 'test' })
      expect(eventSetActive).toHaveBeenCalledWith({ start: 'test' })
    })

    act(() => {
      calendar.prop('onView')('week')
      expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week')
    })
  })
})
