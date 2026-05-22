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
    baseURL:
      'https://stoplight-equal-violator.ngrok-free.dev',

    credentials: 'include',

    ...options,

    headers
  })
}