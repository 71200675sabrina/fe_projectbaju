<template>
  <section class="container products">

    <div class="section-title">
        <p>
          Produk Terbaru
        </p>

        <NuxtLink to="/product"><Span>Lihat Semua</Span></NuxtLink>
    </div>


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
      await productService.getAllProducts(null, 'desc', 4, 1)

    products.value =
      response.data.map(product => ({
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