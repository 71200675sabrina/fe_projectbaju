<template>
  <section class="container products">

    <h2 class="section-title">
      Produk Terbaru
    </h2>

    <div class="product-grid">

      <ProductCard
        v-for="product in products"
        :key="product.id"
        :id="product.id"
        :image="product.image"
        :title="product.title"
        :price="product.price"
      />

    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from './ProductCard.vue'
import { productService } from '~/services/productService'
import { API_BASE_URL } from '~/utils/constants'

const products = ref([])

const getProducts = async () => {

  try {

    const response =
      await productService.getAllProducts()

    products.value =
      response.map(product => ({
        id: product.id,
        title: product.productName,
        image:
          product.productImage?.[0]?.image
            ? `${API_BASE_URL}${product.productImage[0].image}`
            : '/no-image.png',
        price: product.price
      }))

  } catch (error) {

    console.error(error)

  }

}

onMounted(() => {
  getProducts()
})
</script>

<style scoped>
.products {
  margin: 60px auto;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
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
}
</style>