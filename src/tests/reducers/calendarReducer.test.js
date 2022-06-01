import { calendarReducer } from '../../reducers/calendarReducer'
import { types } from '../../types/types'

const initState = {
  events: [],
  activeEvent: null,
}

describe('Testing the calendarReducer', () => {
  test('should return the default state', () => {
    const state = calendarReducer(initState, {})
    expect(state).toEqual(initState)
  })

  test('should active event', () => {
    const action = {
      type: types.eventSetActive,
      payload: {
        id: 1,
        title: 'test',
      },
    }
    const state = calendarReducer(initState, action)
    expect(state).toEqual({
      ...initState,
      activeEvent: {
        id: 1,
        title: 'test',
      },
    })
  })

  test('should add new event', () => {
    const action = {
      type: types.eventAddNew,
      payload: {
        id: 1,
        title: 'test',
      },
    }
    const state = calendarReducer(initState, action)
    expect(state).toEqual({
      ...initState,
      activeEvent: null,
      events: [
        {
          id: 1,
          title: 'test',
        },
      ],
    })
  })

  test('should clear the active event', () => {
    const action = {
      type: types.eventClearActiveEvent,
    }
    const state = calendarReducer(initState, action)
    expect(state).toEqual({
      ...initState,
      activeEvent: null,
    })
  })

  test('should update the event', () => {
    const initState1 = {
      ...initState,
      events: [
        {
          id: 1,
          title: 'test-old',
        },
      ],
    }
    const action = {
      type: types.eventUpdated,
      payload: {
        id: 1,
        title: 'test-new',
      },
    }
    const state = calendarReducer(initState1, action)
    expect(state).toEqual({
      ...initState,
      events: [
        {
          id: 1,
          title: 'test-new',
        },
      ],
    })
  })

  test('should load the events', () => {
    const action = {
      type: types.eventLoaded,
      payload: [
        {
          id: 1,
          title: 'test',
        },
      ],
    }
    const state = calendarReducer(initState, action)
    expect(state).toEqual({
      ...initState,
      events: [
        {
          id: 1,
          title: 'test',
        },
      ],
    })
  })

  test('should delete the event', () => {
    const initState1 = {
      ...initState,
      events: [
        {
          id: 1,
          title: 'test',
        },
      ],
      activeEvent: {
        id: 1,
        title: 'test',
      },
    }
    const action = {
      type: types.eventDeleted,
    }
    const state = calendarReducer(initState1, action)
    expect(state).toEqual({
      ...initState,
      events: [],
    })
  })

  test('should logout', () => {
    const action = {
      type: types.eventLogout,
    }
    const state = calendarReducer(initState, action)
    expect(state).toEqual(initState)
  })
})
