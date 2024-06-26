import Swal from 'sweetalert2'
import { fetchWithToken } from '../helpers/fetch'
import { prepareEvents } from '../helpers/prepareEvents'
import { types } from '../types/types'

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth

    try {
      const response = await fetchWithToken('events', event, 'POST')
      const body = await response.json()

      if (body.ok) {
        event.id = body.event.id
        event.user = {
          _id: uid,
          name
        }
        console.log(event)
        dispatch(eventAddNew(event))
        Swal.fire('Created', 'Event created', 'success')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event
})

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event
})

export const eventClearActiveEvent = () => ({
  type: types.eventClearActiveEvent
})

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const response = await fetchWithToken(`events/${event.id}`, event, 'PUT')
      const body = await response.json()

      if (body.ok) {
        dispatch(eventUpdated(event))
        Swal.fire('Updated', 'Event updated', 'success')
      } else {
        Swal.fire('Error', body.msg, 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const eventUpdated = (event) => ({
  type: types.eventUpdated,
  payload: event
})

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent
    try {
      const response = await fetchWithToken(`events/${id}`, {}, 'DELETE')
      const body = await response.json()

      if (body.ok) {
        dispatch(eventDeleted())
        Swal.fire('Deleted', 'Event deleted', 'success')
      } else {
        Swal.fire('Error', body.msg, 'error')
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const eventDeleted = () => ({
  type: types.eventDeleted
})

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const response = await fetchWithToken('events')
      const body = await response.json()
      const events = prepareEvents(body.events)

      dispatch(eventLoaded(events))
    } catch (error) {
      console.log(error)
    }
  }
}

const eventLoaded = (events) => ({
  type: types.eventLoaded,
  payload: events
})
