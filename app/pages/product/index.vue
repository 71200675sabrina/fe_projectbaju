<template>
    <div class="container">
        <section class="content">
            <div class="breadcrumbs">
                <NuxtLink class="nuxlink"to="/">Beranda</NuxtLink>
                <span>/</span>
                <span>{{ categoryName }}</span>
            </div>

            <div class="section-header">
                <h1 class="section-title">{{ categoryName }}</h1>
                <p class="section-subtitle">Temukan produk terbaik pilihan kami</p>
            </div>

            <section class="product">
                <div class="product-grid">
                    <!-- Skeleton -->
                    <template v-if="isLoading">
                        <SkeletonCard v-for="n in meta.limit" :key="n" />
                    </template>

                    <!-- Product -->
                    <template v-else>
                        <ProductCard
                        v-for="product in products"
                        :key="product.id"
                        :id="product.id"
                        :title="product.title"
                        :image="product.image"
                        :price="product.price"
                        />
                    </template>
                </div>

                <!-- fallback error -->
                <p v-if="errorFallbackMessage">Mohon maaf produk tidak ditemukan.</p>

                <template v-if="!isLoading && !errorFallbackMessage">
                    <div class="pagination">
                        <button
                            class="page-btn"
                            :disabled="meta.page === 1"
                            @click="changePage(meta.page - 1)"
                        >
                            &laquo;
                        </button>

                        <button
                            v-for="p in meta.totalPages"
                            :key="p"
                            class="page-btn"
                            :class="{ active: p === meta.page }"
                            @click="changePage(p)"
                        >
                            {{ p }}
                        </button>

                        <button
                            class="page-btn"
                            :disabled="meta.page === meta.totalPages"
                            @click="changePage(meta.page + 1)"
                        >
                            &raquo;
                        </button>
                    </div>
                </template>
            </section>
        </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductCard from '~/components/ProductCard.vue'
import SkeletonCard from '~/components/SkeletonCard.vue'
import { productService } from '~/services/productService'
import { API_BASE_URL } from '~/utils/constants'

const route = useRoute()
const categoryName = computed(() => route.query.categoryName || 'Semua Product')
const products = ref([])
const errorFallbackMessage = ref(false)
const isLoading = ref(true)
const meta = ref({
  limit: 20,
  page: 1,
  total: 0,
  totalPages: 1
})


const getProducts = async () => {
    isLoading.value = true
    products.value = []
    errorFallbackMessage.value = false
    try {
        const categories = route.query.categories || null
        const response = await productService.getAllProducts(categories, 'desc', meta.value.limit, meta.value.page)

        products.value = response.data.map(product => ({
        id: product.id,
        title: product.productName,
        image: product.productImage?.[0]?.image
            ? `${API_BASE_URL}${product.productImage[0].image}`
            : '/no-image.png',
        price: product.price
        }))

        meta.value = response.meta 

    } catch (error) {
        console.error(error)
        errorFallbackMessage.value = true
    } finally {
        isLoading.value = false
    }
}

const changePage = (page) => {
  meta.value.page = page
  getProducts()
}

watch(() => route.query.categories, () => {
  meta.value.page = 1
  getProducts()
})

onMounted(() => {
  getProducts()
})

</script>

<style scoped>
.content{
    margin:30px auto;
}

.section-header {
  margin-bottom: 24px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  position: relative;
  display: inline-block;
  padding-bottom: 10px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 48px;
  height: 3px;
  background: #b58763;
  border-radius: 999px;
}

.section-subtitle {
  font-size: 14px;
  color: #888;
  margin: 8px 8px;
}


.breadcrumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #888;
}

.nuxlink{
  color: #b58763;
  cursor: pointer;
  transition: .25s;
}

.nuxlink:hover {
  text-decoration: underline;
}

.breadcrumbs span:last-child {
  color: #333;
  font-weight: 500;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
}

.page-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #ececec;
  background: white;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: .25s;
}

.page-btn:hover:not(:disabled) {
  border-color: #b58763;
  color: #b58763;
}

.page-btn.active {
  background: #b58763;
  border-color: #b58763;
  color:white;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.skeleton-card {
  overflow: hidden;
  background: white;
  padding: 15px;
}

.skeleton-image {
  width: 100%;
  aspect-ratio: 3/4;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-text {
  height: 14px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  margin-top: 12px;
}

.skeleton-text.short {
  width: 50%;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>