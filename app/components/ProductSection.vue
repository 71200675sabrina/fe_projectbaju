<template>
  <section class="container products">

    <div class="section-title">
        <p>
          Produk Terbaru
        </p>

        <NuxtLink to="/product"><Span>Lihat Semua</Span></NuxtLink>
    </div>


    <div class="product-grid">

      <template v-if="isLoading">

        <SkeletonCard
          v-for="n in 4"
          :key="n"
        />

      </template>

      <!-- REAL DATA -->
      <template v-else>

        <ProductCard
          v-for="product in products"
          :key="product.id"
          :id="product.id"
          :image="
            product.images?.length > 1
              ? product.images[
                  currentImageIndexes[
                    product.id
                  ] || 0
                ]
              : product.images?.[0]
          "
          :title="product.title"
          :price="product.price"
        />

      </template>

    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from './ProductCard.vue'
import { productService } from '~/services/productService'
import { API_BASE_URL } from '~/utils/constants'
import SkeletonCard from './Skeleton/SkeletonCard.vue'

const products = ref([])
const isLoading = ref(true)
const currentImageIndexes = ref({})

const getProducts = async () => {

  try {

    isLoading.value = true

    const response =
      await productService.getAllProducts(
        null,
        'desc',
        4,
        1
      )

    products.value =
      response.data.data.map(product => ({

        id: product.id,

        title: product.productName,

        images:
          product.productImage?.length
            ? product.productImage.map(
                item =>
                  `${API_BASE_URL}${item.image}`
              )
            : ['/no-image.png'],

        price: product.price

      }))

  } catch (error) {

  console.error(error)

  } finally {

    isLoading.value = false

  }

}

const startImageSlider = () => {

  setInterval(() => {

    products.value.forEach(product => {

      if (
        product.images &&
        product.images.length > 1
      ) {

        if (
          currentImageIndexes.value[
            product.id
          ] === undefined
        ) {

          currentImageIndexes.value[
            product.id
          ] = 0

        }

        currentImageIndexes.value[
          product.id
        ] =
          (
            currentImageIndexes.value[
              product.id
            ] + 1
          ) % product.images.length

      }

    })

  }, 2500)

}

onMounted(async () => {

  await getProducts()

  startImageSlider()

})
</script>

<style scoped>

.section-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 20px;
}

.section-title a {
  text-decoration: underline;
}

.products {
  margin: 60px auto;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}


@media (max-width: 992px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 576px) {
  .products {
    margin: 40px auto;
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  .section-title {
    font-size: 14px;
  }
}
</style>