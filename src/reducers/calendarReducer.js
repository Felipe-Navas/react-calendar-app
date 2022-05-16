import moment from 'moment'
import { types } from '../types/types'

const initialState = {
  events: [
    {
      id: new Date().getTime(),
      title: 'All Day Event',
      start: moment().toDate(),
      end: moment().add(2, 'hours').toDate(),
      bgcolor: '#958AE9',
      notes: 'Hacer algo',
      user: {
        _id: 'asd123',
        name: 'Felipe',
      },
    },
  ],
  activeEvent: null,
}

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      }

    case types.eventAddNew:
      return {
        ...state,
        events: [...state.events, action.payload],
      }

    case types.eventClearActiveEvent:
      return {
        ...state,
        activeEvent: null,
      }

    case types.eventUpdated:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      }

    default:
      return state
  }
}
