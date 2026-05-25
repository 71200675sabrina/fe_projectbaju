<template>
  <div class="container">
    
    <section class="content">
      <div class="breadcrumbs">
        <NuxtLink class="nuxlink" to="/">Beranda</NuxtLink>
        <span>/</span>
        <NuxtLink class="nuxlink" to="/product">Semua Product</NuxtLink>
        <span>/</span>
        <span>{{ product?.productName }}</span>
      </div>

      <div v-if="product" class="detail-wrap">

      <div class="detail-image-wrap">
        <Swiper
          :modules="[Navigation]"
          navigation
          :space-between="10"
          :slides-per-view="1"
          class="detail-swiper"
        >
          <SwiperSlide
            v-for="(img, index) in product.productImage"
            :key="index"
          >
            <img
              :src="`${API_BASE_URL}${img.image}`"
              :alt="product.productName"
              class="detail-image"
              loading="lazy"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div class="detail-info">

        <h1 class="detail-title">{{ product.productName }}</h1>

        <p class="detail-price">
          {{ new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(product.price) }}
        </p>

        <div class="detail-categories">
          <NuxtLink
            v-for="cat in product.productCategories"
            :key="cat.category.id"
            :to="`/product?categories=${cat.category.id}&categoryName=${cat.category.categoryName}`"
            class="category-tag"
          >
            <Tag :size="12" />
            {{ cat.category.categoryName }}
          </NuxtLink>
        </div>
        <a
          :href="`https://wa.me/628xxxxxxxxxx?text=Halo, saya tertarik dengan produk ${product.productName}`"
          target="_blank"
          class="btn-wa"
        >
          Order via WhatsApp
        </a>

      </div>

    </div>

    <!-- Skeleton -->
    <div v-else class="detail-wrap">
      <div class="skeleton-image"></div>
      <div class="detail-info">
        <div class="skeleton-text" style="width: 60%; height: 32px"></div>
        <div class="skeleton-text" style="width: 30%; height: 24px; margin-top: 16px"></div>
        <div class="skeleton-text" style="width: 80%; margin-top: 24px"></div>
      </div>
    </div>

    </section>
    

    

  </div>
</template>


<script setup>
import { productService } from '~/services/productService'
import { API_BASE_URL } from '~/utils/constants'
import { Tag } from '@lucide/vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

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

<style scoped>
.content {
  margin:30px auto;
}

.detail-swiper {
  width: 100%;
  border-radius: 12px;
}

.detail-swiper :deep(.swiper-button-next),
.detail-swiper :deep(.swiper-button-prev) {
  color: #b58763;
}

.detail-wrap {
  display: flex;
  gap: 32px;
  margin: 40px auto;
}

.detail-image-wrap {
  flex: 1;
  overflow: hidden; /* ← tambah ini */
  min-width: 0;     /* ← tambah ini, fix flex overflow */
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


.detail-image {
  width: 100%;
  height: 700px;    /* hapus max-width */
  border-radius: 12px;
  object-fit: cover;
}

.detail-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
}

.detail-title {
  font-size: 28px;
  font-weight: 700;
  color: #333;
}

.detail-price {
  font-size: 22px;
  font-weight: 600;
  color: #b58763;
}

.detail-categories {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.category-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 14px;
  border-radius: 999px;
  background: #f8f5f2;
  color: #b58763;
  font-size: 12px;
  font-weight: 500;
  text-decoration: none;
  border: 1px solid #e8d5c4;
  transition: .25s;
}

.category-tag:hover {
  background: #b58763;
  color: white;
  border-color: #b58763;
}

.btn-wa {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #25D366;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: .25s;
  margin-top: 8px;
  width: fit-content;
}

.btn-wa:hover {
  background: #1ebe5d;
}

.skeleton-image {
  flex: 1;
  border-radius: 12px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  min-height: 400px;
}

.skeleton-text {
  height: 14px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

@media (max-width: 480px)  {
  .detail-wrap {
    flex-direction: column;
    gap: 24px;
  }

  .detail-image {
    height: 300px !important;
  }
}

@media (max-width: 768px) {
  .detail-title {
    font-size: 20px;
  }

  .detail-price {
    font-size: 18px;
  }

  .category-tag {
    font-size: 11px;
    padding: 4px 10px;
  }

  .btn-wa {
    font-size: 13px;
    padding: 10px 20px;
  }
}

@media (max-width: 1024px) {
  .detail-image {
    height: 500px;
  }
}
</style>