import '@testing-library/jest-dom'
import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import moment from 'moment'
import { act } from '@testing-library/react'

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { CalendarModal } from '../../../components/calendar/CalendarModal'
import {
  eventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdate,
} from '../../../actions/events'
import Swal from 'sweetalert2'

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
}))

jest.mock('../../../actions/events', () => ({
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  eventStartAddNew: jest.fn(),
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const now = moment().minutes(0).seconds(0).add(1, 'hours')
const nowPlus1 = now.clone().add(1, 'hours')

const initState = {
  calendar: {
    events: [],
    activeEvent: {
      title: 'test',
      notes: 'test-notes',
      start: now.toDate(),
      end: nowPlus1.toDate(),
    },
  },
  auth: {
    uid: '123',
    name: 'test',
  },
  ui: {
    modalOpen: true,
  },
}
const store = mockStore(initState)
store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
)

describe('Testing the CalendarModal component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should render correctly', () => {
    expect(wrapper.find('Modal').prop('isOpen')).toBe(true)
  })

  test('should call the update action and close modal', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    })

    expect(eventStartUpdate).toHaveBeenCalledWith(
      initState.calendar.activeEvent
    )
    expect(eventClearActiveEvent).toHaveBeenCalled()
  })

  test('should show the error when the title is missed', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    })

    expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(
      true
    )
  })

  test('should create a new event', () => {
    const initState = {
      calendar: {
        events: [],
        activeEvent: null,
      },
      auth: {
        uid: '123',
        name: 'test',
      },
      ui: {
        modalOpen: true,
      },
    }
    const store = mockStore(initState)
    store.dispatch = jest.fn()

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    )

    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'test title',
      },
    })

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    })

    expect(eventStartAddNew).toHaveBeenCalledWith({
      end: expect.any(Date),
      start: expect.any(Date),
      title: 'test title',
      notes: '',
    })

    expect(eventClearActiveEvent).toHaveBeenCalled()
  })

  test('should validate the dates', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'test title',
      },
    })

    const today = new Date()

    act(() => {
      wrapper.find('DateTimePicker').at(1).prop('onChange')(today)
    })

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    })

    expect(Swal.fire).toHaveBeenCalledWith(
      'Error',
      'La fecha fin debe ser mayor a la fecha de inicio',
      'error'
    )
  })
})
