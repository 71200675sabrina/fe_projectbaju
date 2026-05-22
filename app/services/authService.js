import { apiFetch } from './api'

export const authService = {

  async login(payload) {

    return await apiFetch('/v1/auth', {
      method: 'POST',

      body: {
        username: payload.username,
        password: payload.password
      }
    })
  }
}