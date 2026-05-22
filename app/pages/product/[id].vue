<script setup>
import { productService } from '~/services/productService'
import { API_BASE_URL } from '~/utils/constants'

const route = useRoute()

const product = ref(null)

const getDetail = async () => {

  try {

    product.value =
      await productService.getProductById(
        route.params.id
      )

  } catch (error) {

    console.error(error)

  }

}

onMounted(() => {
  getDetail()
})
</script>

<template>

  <div v-if="product">

    <h1>
      {{ product.productName }}
    </h1>

    <img
        v-if="product.productImage?.length"
        :src="`${API_BASE_URL}${product.productImage[0].image}`"
        width="300"
    />

    <p>
      {{ product.price }}
    </p>

  </div>

</template>