<template>
  <header class="navbar">
    <div class="container nav-content">
      <div class="logo">New Brand</div>

      <nav :class="['nav-links', { active: menuOpen }]">
        <div class="mega-parent">
          <a href="#">Kategori</a>
          <div class="mega-menu">

            <div
                v-for="category in categories"
                :key="category.id"
                class="mega-item"
            >
                {{ category.categoryName }}
            </div>

           </div>
        </div>

        <a
        href="https://wa.me/6281234567890"
        target="_blank"
        rel="noopener"
        >
        Kontak Kami
        </a>

        <a
        href="https://wa.me/6281234567890?text=Halo%20Admin,%20saya%20ingin%20bertanya%20cara%20pembelian."
        target="_blank"
        rel="noopener"
        >
        Cara Beli
        </a>
      </nav>

      <div class="nav-right">
        <button class="hamburger" @click="menuOpen = !menuOpen">☰</button>

        <!--
        <NuxtLink
        v-if="!isAdmin && route.path.startsWith('/admin')"
        </NuxtLink>
        -->

        <NuxtLink
        v-if="!isAdmin"
        to="/admin/login"
        class="admin-login"
        >
        Admin Login
        </NuxtLink>
        

        <button
            v-else
            @click="handleLogout"
            class="logout-nav"
            >
            Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'
import { ref, onMounted } from 'vue'
import { categoryService } from '~/services/categoryService'

const categories = ref([])

const route = useRoute()

const {
    isAdmin,
    logout
    } = useAuth()

const handleLogout = () => {

    logout()

    navigateTo('/')

}

const getCategories = async () => {

  try {

    categories.value =
      await categoryService.getAllCategory()

  } catch (error) {

    console.error(error)
  }
}

onMounted(() => {
  getCategories()
})
</script>

<style scoped>
.navbar {
  background: #fff;
  border-bottom: 1px solid #ececec;
  position: sticky;
  top: 0;
  z-index: 999;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 78px;
}

.logo {
  font-size: 28px;
  font-weight: 700;
  color: #b58763;
}



.nav-links {
  display: flex;
  align-items: center;
  gap: 32px;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: .25s;
}

.nav-links a:hover {
  color: #b58763;
}



.mega-parent {
  position: relative;
}

.mega-parent > a {
  cursor: pointer;
}

.mega-menu {
  position: absolute;
  top: calc(100% + 15px);
  left: 0;

  width: 280px;

  background: white;

  border-radius: 18px;

  padding: 14px;

  display: none;
  flex-direction: column;
  gap: 10px;

  box-shadow:
    0 10px 30px rgba(0,0,0,.08);

  z-index: 9999; /* FIX AGAR TIDAK TERTIMPA BANNER */
}

.mega-parent:hover .mega-menu {
  display: flex;
}

.mega-item {
  padding: 12px 14px;
  border-radius: 12px;

  cursor: pointer;

  transition: .25s;
}

.mega-item:hover {
  background: #f8f5f2;
  color: #b58763;
}



.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}


.admin-login {
  height: 42px;

  padding: 0 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  border: 1px solid #b58763;

  text-decoration: none;

  color: #b58763;

  font-weight: 600;

  transition: .25s;
}

.admin-login:hover {
  background: #b58763;
  color: white;
}



.logout-nav {
  height: 42px;

  padding: 0 18px;

  border: none;

  border-radius: 12px;

  background: #b58763;
  color: white;

  font-weight: 600;

  cursor: pointer;

  transition: .25s;
}

.logout-nav:hover {
  transform: translateY(-2px);

  box-shadow:
    0 8px 20px rgba(181,135,99,.25);
}


.hamburger {
  display: none;

  background: transparent;
  border: none;

  font-size: 26px;
  cursor: pointer;
}



@media (max-width: 768px) {

  .hamburger {
    display: block;
  }

  .nav-content {
    min-height: 70px;
  }

  .nav-links {
    display: none;

    position: absolute;

    top: 100%;
    left: 0;

    width: 100%;

    background: white;

    flex-direction: column;
    align-items: flex-start;

    padding: 20px;

    gap: 18px;

    border-top: 1px solid #eee;

    box-shadow:
      0 10px 20px rgba(0,0,0,.05);

    z-index: 999;
  }

  .nav-links.active {
    display: flex;
  }

  .mega-menu {
    position: static;

    width: 100%;

    display: flex;

    margin-top: 10px;

    box-shadow: none;

    border: 1px solid #eee;
  }

  .admin-login,
  .logout-nav {
    height: 40px;
    padding: 0 14px;
    font-size: 14px;
  }
}
</style>
