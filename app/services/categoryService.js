import { apiFetch } from './api'

export const categoryService = {

  async getAllCategory() {

    const response = await apiFetch(
      '/v1/category/',
      {
        method: 'GET'
      }
    )

    return response.data
  },

   async createCategory(payload) {

    const response = await apiFetch(
      '/v1/category',
      {
        method: 'POST',

        body: payload
      }
    )

    return response.data
  },

  async updateCategory(id, payload) {

    const response = await apiFetch(
      `/v1/category/${id}`,
      {
        method: 'PATCH',
        body: payload
      }
    )

    return response.data
  },

  async deleteCategory(id) {

    const response = await apiFetch(
      `/v1/category/${id}`,
      {
        method: 'DELETE'
      }
    )

    return response.data
  }
}