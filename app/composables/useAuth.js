import { authService } from '~/services/authService'

export const useAuth = () => {

  const isAdmin =
    useState(
      'isAdmin',
      () => false
    )

  if (process.client) {

    isAdmin.value =
      localStorage.getItem(
        'isAdmin'
      ) === 'true'

  }

  const loading = useState(
    'authLoading',
    () => false
  )

  const login = async (payload) => {

    try {

      loading.value = true

      const response =
        await authService.login(payload)

      isAdmin.value = true

      localStorage.setItem(
        'isAdmin',
        'true'
      )

      return {
        success: true,
        data: response
      }

    } catch (error) {

      return {
        success: false,
        message:
          error?.data?.message ||
          'Login gagal'
      }

    } finally {

      loading.value = false

    }

  }

  const logout = () => {

    isAdmin.value = false

    localStorage.removeItem(
      'isAdmin'
    )

  }

  return {
    isAdmin,
    loading,
    login,
    logout
  }

}