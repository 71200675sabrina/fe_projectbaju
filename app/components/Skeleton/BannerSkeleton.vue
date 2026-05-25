<template>
  <div class="banner-skeleton">
    <div class="image"></div>

    <div class="overlay">
      <div class="text long"></div>
      <div class="text short"></div>
    </div>
  </div>
</template>

<style scoped>
.banner-skeleton {
  position: relative;
  height: 340px;
  border-radius: 24px;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;

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

.overlay {
  position: absolute;
  bottom: 24px;
  left: 24px;
  width: 60%;
}

.text {
  height: 16px;
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

.long {
  width: 80%;
  height: 24px;
}

.short {
  width: 50%;
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