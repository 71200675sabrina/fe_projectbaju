<template>
  <div class="product-skeleton">

    <div class="image"></div>

    <div class="content">
      <div class="text title"></div>
      <div class="text price"></div>
    </div>

  </div>
</template>

<style scoped>
.product-skeleton {
  border-radius: 20px;
  overflow: hidden;
  background: white;
}

.image {
  width: 100%;
  aspect-ratio: 4/5;

  background:
    linear-gradient(
      90deg,
      #f0f0f0 25%,
      #e0e0e0 50%,
      #f0f0f0 75%
    );

  background-size: 200% 100%;

  animation: shimmer 1.5s infinite;
}

.content {
  padding: 20px;
}

.text {
  height: 14px;
  border-radius: 8px;
  margin-bottom: 12px;

  background:
    linear-gradient(
      90deg,
      #f0f0f0 25%,
      #e0e0e0 50%,
      #f0f0f0 75%
    );

  background-size: 200% 100%;

  animation: shimmer 1.5s infinite;
}

.title {
  width: 80%;
}

.price {
  width: 40%;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
}
</style>