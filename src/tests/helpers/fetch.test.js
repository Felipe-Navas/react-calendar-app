import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch'

describe('Testing the fetch herlper', () => {
  let token = ''

  test('should retrun a Response calling fetchWithoutToken', async () => {
    const response = await fetchWithoutToken(
      'auth',
      { email: 'felipe@gmail.com', password: '123456' },
      'POST'
    )

    expect(response instanceof Response).toBe(true)

    const body = await response.json()

    expect(body.ok).toBe(true)

    token = body.token
  })

  test('should fail calling fetchWithToken', async () => {
    const response = await fetchWithToken('events', {}, 'POST')
    const body = await response.json()
    expect(body.msg).toBe('No token provided')
  })

  test('should retrun a Response calling fetchWithToken', async () => {
    localStorage.setItem('token', token)

    const response = await fetchWithToken('events', {}, 'POST')
    const body = await response.json()
    expect(body.msg).toBe('Validation failed')
  })
})
