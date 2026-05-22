import { apiFetch } from './api'

export const bannerService = {

  async getAllBanner(includeToken = false) {

    return apiFetch(
        '/v1/banners',
        {
        method: 'GET',
        credentials:
            includeToken
            ? 'include'
            : undefined
        }
    )
    },

  async getBannerById(id) {

    const response = await apiFetch(
      `/v1/banners/${id}`,
      {
        method: 'GET'
      }
    )

    return response.data
  },

  async createBanner(formData) {

    const response = await apiFetch(
      '/v1/banners',
      {
        method: 'POST',
        body: formData
      }
    )

    return response.data
  },

  async updateBanner(id, formData) {

    const response = await apiFetch(
      `/v1/banners/${id}`,
      {
        method: 'PATCH',
        body: formData
      }
    )

    return response.data
  },

  async deleteBanner(id) {

    const response = await apiFetch(
      `/v1/banners/${id}`,
      {
        method: 'DELETE'
      }
    )

    return response.data
  }
}