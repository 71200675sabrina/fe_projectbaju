import { bannerService } from '~/services/bannerService'
import { API_BASE_URL } from '~/utils/constants'

export const useBanners = () => {

  const banners = useState(
    'banners',
    () => []
  )

  const getBanners = async (
    includeToken = false
  ) => {

    try {

      const response =
        await bannerService.getAllBanner(
          includeToken
        )

      const bannerList =
        response?.data || []

      banners.value =
        bannerList.map(
          banner => ({

            id: banner.id,

            title:
              banner.bannerName,

            subtitle:
              banner.bannerDescription,

            activate:
              banner.activate ?? true,

            image:
              banner.imagePath
                ? `${API_BASE_URL}${banner.imagePath}`
                : ''

          })
        )

      console.log(
        'BANNERS:',
        banners.value
      )

    } catch (error) {

      console.error(
        'GET BANNER ERROR',
        error
      )

      banners.value = []

    }

  }

  return {
    banners,
    getBanners
  }
}