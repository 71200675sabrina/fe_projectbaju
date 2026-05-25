<template>
  <section class="hero container">
    <Swiper
      :modules="[SwiperAutoplay]"
      :slides-per-view="1"
      :loop="true"
      :autoplay="{ delay: 3000 }"
      class="hero-slider"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div class="slide">
          <img :src="slide.image" />
          <div class="hero-text">
            <h1>{{ slide.title }}</h1>
            <p>{{ slide.subtitle }}</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>

  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay as SwiperAutoplay } from 'swiper/modules'
import 'swiper/css'

import { useBanners } from '~/composables/useBanners'

const {
  banners: slides,
  getBanners
} = useBanners()

onMounted(() => {
  getBanners(false)
})
</script>

<style scoped>
/* HERO SECTION UTAMA */
.hero {
  height: 40vh;             
  margin: 30px auto;        
  overflow: hidden;
}

/* SLIDER */
.hero-slider {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 12px;
}

/* SWIPER */
.swiper {
  width: 100%;
  height: 100%;
}

/* SETIAP SLIDE */
.swiper-slide {
  width: 100% !important;
  height: 100% !important;
}

/* WRAPPER */
.slide {
  position: relative;
  width: 100%;
  height: 100%;
}

/* IMAGE FIX */
.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;      /* Semua gambar full cover */
  object-position: center; /* Fokus tengah */
  display: block;
}

/* Overlay */
.slide::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.15);

  transition: background 0.3s ease;
}

.slide:hover::after {
  background: rgba(0, 0, 0, 0.4);
}


/* TEXT */
.hero-text {
  position: absolute;
  bottom: 8%;
  left: 5%;
  color: white;
  z-index: 2;
  max-width: 40%;

  opacity: 0;
  transform: translateY(20px);

  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}

/* Muncul saat hover */
.slide:hover .hero-text {
  opacity: 1;
  transform: translateY(0);
}

.hero-text h1 {
  font-size: clamp(24px, 4vw, 52px);
  margin-bottom: 10px;
}

.hero-text p {
  font-size: clamp(14px, 2vw, 20px);
  margin-bottom: 15px;
}

.hero-text button {
  padding: 12px 24px;
  border-radius: 4px;
}

/* TABLET */
@media (max-width: 992px) {
  .hero {
    width: 90vw;
    height: 40vh;
  }

  .hero-text {
    max-width: 60%;
  }
}

/* MOBILE */
@media (max-width: 768px) {
  .hero {
    width: 95vw;
    height: 30vh;
  }

  .hero-text {
    max-width: 80%;
    left: 20px;
    bottom: 20px;
  }
}
</style>