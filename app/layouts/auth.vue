<template>
  <div class="auth-layout">
    <slot />
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  background: #1e1e1e;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}
</style>