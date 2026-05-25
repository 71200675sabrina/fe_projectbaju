import { apiFetch } from './api'

export const productService = {

  // GET ALL PRODUCT
  async getAllProducts(categories, sort, limit, page) {
    const params = new URLSearchParams()

    if (categories) params.append('categories', categories)
    if (sort) params.append('sort', sort)
    if (limit) params.append('limit', limit)
    if (page) params.append('page', page)

    const response = await apiFetch(
      `/v1/products?${params.toString()}`,
      {
        method: 'GET'
      }
    )

    return response.data
  },

  // GET PRODUCT BY ID
  async getProductById(id) {

    const response = await apiFetch(
      `/v1/products/${id}`,
      {
        method: 'GET'
      }
    )

    return response.data
  },

  // CREATE PRODUCT
  async createProduct(formData) {

    const response = await apiFetch(
      '/v1/products',
      {
        method: 'POST',
        body: formData
      }
    )

    return response.data
  },

  // UPDATE PRODUCT
  async updateProduct(id, formData) {

    const response = await apiFetch(
      `/v1/products/${id}`,
      {
        method: 'PATCH',
        body: formData
      }
    )

    return response.data
  },

  // DELETE PRODUCT
  async deleteProduct(id) {

    const response = await apiFetch(
      `/v1/products/${id}`,
      {
        method: 'DELETE'
      }
    )

    return response.data
  }

}