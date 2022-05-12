import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Navbar } from '../ui/Navbar'

import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

const myEventsList = [
  {
    title: 'All Day Event very long title',
    allDay: true,
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#FFCE56',
  },
]

export const CalendarScreen = () => {
  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  )
}
