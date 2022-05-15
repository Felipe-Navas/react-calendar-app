import moment from 'moment'

const initialState = {
  events: [
    {
      title: 'All Day Event',
      allDay: true,
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
    default:
      return state
  }
}
