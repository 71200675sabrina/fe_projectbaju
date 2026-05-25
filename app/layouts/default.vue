<template>
  <div class="layout">
    
    <!-- Navbar -->
    <Navbar />

    <!-- Content -->
    <main class="content">
      <slot />
    </main>

    <!-- Footer -->
    <Footer />

  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}
</style>