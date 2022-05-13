import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages.es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'

moment.locale('es')
const localizer = momentLocalizer(moment)

const myEventsList = [
  {
    title: 'All Day Event',
    allDay: true,
    start: moment().toDate(),
    end: moment().add(6, 'hours').toDate(),
    bgcolor: '#958AE9',
    notes: 'Hacer algo',
    user: {
      _id: 'asd123',
      name: 'Felipe',
    },
  },
]

export const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  )

  const onDoubleClick = (e) => {}

  const onSelectEvent = (e) => {}

  const onViewChange = (e) => {
    setLastView(e)
    localStorage.setItem('lastView', e)
  }

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.bgcolor,
      color: 'white',
      borderRadius: '0px',
      border: '0px',
      display: 'block',
      opacity: 0.8,
    }
    return {
      style: style,
    }
  }

  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />
      <CalendarModal />
    </div>
  )
}
