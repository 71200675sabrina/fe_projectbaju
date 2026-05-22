<template>
  <div class="login-container">
    
    <!-- LEFT -->
    <div class="login-left">
      <img
        src="/images/admin-login.jpg"
        alt="Admin Login"
        class="login-image"
      />

      <div class="overlay"></div>

      <div class="left-content">
        <h1>New Brand</h1>
        <p>Fashion for Every Moment</p>

        <div class="secure-box">
          <h3>Secure Admin Access</h3>
          <p>
            Kelola produk, banner, dan pesanan
            dengan aman dan mudah.
          </p>
        </div>
      </div>
    </div>

    <!-- RIGHT -->
    <div class="login-right">

      <div class="icon-box">
        🔒
      </div>

      <h2>Admin Login</h2>

      <p class="subtitle">
        Masuk untuk mengelola produk,
        banner, kategori, dan pesanan toko Anda.
      </p>

      <form @submit.prevent="handleLogin">

        <div class="form-group">
          <label>Username Admin</label>

          <input
            v-model="username"
            type="text"
            placeholder="Masukkan username"
            required
           />
        </div>

        <div class="form-group">
          <label>Password</label>

          <input
            v-model="password"
            type="password"
            placeholder="Masukkan password"
            required
          />
          <p v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </p>
        </div>

        <button
            type="submit"
            class="login-btn"
            :disabled="loading"
            >
            {{ loading ? 'Loading...' : 'Login' }}
        </button>

      </form>

      <NuxtLink to="/" class="back-link">
        ← Kembali ke Website
      </NuxtLink>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const { login, loading } = useAuth()

const handleLogin = async () => {

  errorMessage.value = ''

  const result = await login({
    username: username.value,
    password: password.value
  })

  if (result.success) {

    navigateTo('/admin/adminpage')

  } else {

    errorMessage.value = result.message
  }
}
</script>

<style scoped>
.login-container {
  width: 100%;
  max-width: 1200px;
  min-height: 720px;
  background: white;
  border-radius: 24px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.login-left {
  position: relative;
}

.login-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.45);
}

.left-content {
  position: absolute;
  bottom: 50px;
  left: 50px;
  color: white;
  z-index: 2;
}

.left-content h1 {
  font-size: 56px;
  margin-bottom: 12px;
}

.left-content p {
  font-size: 20px;
}

.secure-box {
  margin-top: 32px;
  background: rgba(181, 135, 99, 0.35);
  padding: 20px;
  border-radius: 16px;
  backdrop-filter: blur(10px);
  width: 320px;
}

.login-right {
  padding: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.icon-box {
  width: 90px;
  height: 90px;
  background: #f4ebe3;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  margin-bottom: 32px;
}

.login-right h2 {
  font-size: 48px;
  margin-bottom: 12px;
}

.subtitle {
  color: #777;
  line-height: 1.7;
  margin-bottom: 40px;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  height: 56px;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 0 18px;
  font-size: 16px;
}

.form-group input:focus {
  outline: none;
  border-color: #b58763;
}

.login-btn {
  width: 100%;
  height: 56px;
  border: none;
  border-radius: 12px;
  background: #b58763;
  color: white;
  font-size: 18px;
  cursor: pointer;
  margin-top: 12px;
  transition: 0.3s;
}

.login-btn:hover {
  opacity: 0.9;
}

.back-link {
  margin-top: 28px;
  text-align: center;
  color: #888;
  text-decoration: none;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@media (max-width: 968px) {

  .login-container {
    grid-template-columns: 1fr;
  }

  .login-left {
    display: none;
  }

  .login-right {
    padding: 40px;
  }
}
</style>