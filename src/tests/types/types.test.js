import { types } from '../../types/types'

const expectedTypes = {
  uiOpenModal: '[ui] Open modal',
  uiCloseModal: '[ui] Close modal',

  eventLogout: '[auth] Logout event',
  eventStartAddNew: '[event] Start add new',
  eventAddNew: '[event] Add new',
  eventSetActive: '[event] Set active',
  eventClearActiveEvent: '[event] Clear active',
  eventUpdated: '[event] Event updated',
  eventDeleted: '[event] Event deleted',
  eventLoaded: '[event] Event loaded',

  authCheckingFinish: '[auth] Finish checking login state',
  authStartLogin: '[auth] Start login',
  authLogin: '[auth] Login',
  authStartRegister: '[auth] Start register',
  authStartTokenRenew: '[auth] Start token renew',
  authLogout: '[auth] Logout',
}

describe('Tests for types', () => {
  test('should be equals', () => {
    expect(types).toEqual(expectedTypes)
  })
})
