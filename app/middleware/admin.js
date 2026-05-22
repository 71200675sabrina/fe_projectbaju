export default defineNuxtRouteMiddleware(() => {

  if (process.client) {

    const isAdmin =
      localStorage.getItem(
        'isAdmin'
      ) === 'true'

    if (!isAdmin) {

      return navigateTo(
        '/admin/login'
      )

    }

  }

})