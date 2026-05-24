<template>
  <NuxtLink
    :to="`/product/${id}`"
    class="card"
  >
    <span
      v-if="sale"
      class="badge"
    >
      SALE
    </span>

    <img
      :src="image"
      alt="product"
    >

    <h3>{{ title }}</h3>

    <p>
      Rp {{ new Intl.NumberFormat('id-ID').format(price) }}
    </p>
  </NuxtLink>
</template>

<script setup>
defineProps({
  id: String,
  image: String,
  title: String,
  price: [String, Number],
  sale: Boolean
})
</script>

<style scoped>
.card {
  background: white;
  padding: 15px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: 0.3s;
  text-decoration: none;
  color: inherit;
}

.card h3 {
  margin-top: 12px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  overflow: hidden;
}

.card p {
  margin-top: 8px;
  font-weight: 700;
  color: #111;
}

.card:hover {
  transform: translateY(-8px);
}

.card img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: 0.4s;
}

.card:hover img {
  transform: scale(1.08);
}

.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: var(--primary);
  color: white;
  padding: 5px 10px;
  font-size: 12px;
}

/* Tablet */
@media (max-width: 992px) {

  .card img {
    height: 240px;
  }

}

/* Mobile */
@media (max-width: 576px) {

  .card {
    padding: 10px;
  }

  .card img {
    height: 180px;
  }

  .card h3 {
    font-size: 14px;
  }

  .card p {
    font-size: 14px;
  }

  .badge {
    font-size: 10px;
    padding: 4px 8px;
  }

}
</style>