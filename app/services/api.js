export const apiFetch = async (
  url,
  options = {}
) => {

  const headers = {
    'ngrok-skip-browser-warning': 'true',
    ...(options.headers || {})
  }

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] =
      'application/json'
  }

  return await $fetch(url, {
    baseURL: API_BASE_URL,

    credentials: 'include',

    ...options,

    headers
  })
}