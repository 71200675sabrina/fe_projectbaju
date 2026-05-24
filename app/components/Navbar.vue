<template>
  <header class="navbar">
    <div class="container nav-content">
      <div class="logo">New Brand</div>
      <div class="flex">

        <div class="menu-bar-wrap">
              <Menu :size="20" color="#b58763" @click="menuOpen = !menuOpen" style="cursor:pointer" />
              <span class="divider"></span>

              <Transition name="dropdown">
                <div v-show="menuOpen" class="mobile-menu">
                  <p class="mobile-menu-title">Kategori Terbaru</p>
                  
                  <span
                    v-for="category in categories.slice(0, 3)"
                    :key="category.id"
                    class="mobile-menu-item"
                  >
                    {{ category.categoryName }}
                  </span>
                  
                  <div class="mobile-all-category">
                    <div class="flex" style="cursor:pointer; align-items:center; gap:4px" @click="allCategoryOpen = !allCategoryOpen">
                      <p class="mobile-menu-title">Semua Kategori</p>
                      <ChevronDown :size="14" color="#b58763" :style="{ transform: allCategoryOpen ? 'rotate(180deg)' : 'rotate(0)', transition: '.25s' }" />
                    </div>

                    <Transition name="dropdown">
                      <div v-show="allCategoryOpen" class="all-category-list">
                        <span
                          v-for="category in categories"
                          :key="category.id"
                          class="mobile-menu-item"
                        >
                          {{ category.categoryName }}
                        </span>
                      </div>
                    </Transition>
                  </div>
                  
                </div>
              </Transition>
        </div>

        <div class="search-wrap">
          <Search :size="20" color="#b58763" @click="searchOpen = !searchOpen" style="cursor:pointer" />
          <Transition name="dropdown">
            <div v-show="searchOpen" class="dropdown-search">
              <input class="search-input" placeholder="Cari produk..." autofocus />
            </div>
          </Transition>
        </div>

      </div>
    </div>

    <div class="container category-bar-wrap">
      <hr class="separator" />

      <div class="category-information-container">
          <div class="category-bar">
            <span
              v-for="category in categories.slice(0, 3)"
              :key="category.id"
              class="category-item"
            >
              {{ category.categoryName }}
            </span>
            
            <div class="dropdown-parent">

              <div class="flex" style="align-items:center; gap:4px; cursor:pointer">
                <span class="category-label">Semua Kategori</span>
                <ChevronDown :size="14" />
              </div>

              <div class="dropdown-menu">
                <span
                  v-for="category in categories"
                  :key="category.id"
                  class="dropdown-item"
                >
                  {{ category.categoryName }}
                </span>
              </div>

            </div>
          </div>

          <div class="information">
            <a href="">Cara Beli</a>
            <span class="divider"></span>
            <a href="">Contact-us</a>
          </div>
      </div>

    </div>
    
  </header>
      <Transition name="fade">
      <div v-show="menuOpen || searchOpen" class="overlay" @click="menuOpen = false; searchOpen = false" />
    </Transition>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth'
import { ref, onMounted } from 'vue'
import { categoryService } from '~/services/categoryService'
import { ChevronDown, Menu, Search, SeparatorVertical } from '@lucide/vue'

const categories = ref([])
const searchOpen = ref(false)
const menuOpen = ref(false)
const allCategoryOpen = ref(false)

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
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 998;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.navbar {
  background: #fff;
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

.menu-bar-wrap {
  display: none;
  align-items: center;
}

.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: 0 10px 20px rgba(0,0,0,.05);
  z-index: 99999;
}

.mobile-menu-item {
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: .25s;
}

.mobile-menu-item:hover {
  background: #f8f5f2;
}

.mobile-menu-title {
  font-size: 11px;
  font-weight: 600;
  color: #b58763;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0 12px;
  margin-bottom: 4px;
}

.mobile-all-category {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.all-category-list {
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow-y: auto;
}

.all-category-list::-webkit-scrollbar {
  width: 4px;
}

.all-category-list::-webkit-scrollbar-track {
  background: #f8f5f2;
  border-radius: 4px;
}

.all-category-list::-webkit-scrollbar-thumb {
  background: #b58763;
  border-radius: 4px;
}

.category-bar {
  display: flex;
  gap: 24px;
  padding: 10px 0;
}

.category-item {
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: .25s;
  padding-bottom: 4px;
  position: relative;
}

.information {
  display: flex;
  align-items: center; 
  font-size: 14px;
}

.category-information-container {
  display:flex;
  justify-content: space-between; /* ← tambah ini */
  align-items: center;   
}

.category-label {
  font-size: 14px;
  color: #333;
}

.category-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #b58763;
  transform: scaleX(0);
  transform-origin: center;
  transition: transform .3s ease;
}

.category-item:hover::after {
  transform: scaleX(1);
}

.category-item:hover {
  color: #b58763;
}

.dropdown-parent {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: auto;
  min-width: 200px;
  background: white;
  border-radius: 12px;
  padding: 8px;
  padding-top: 18px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 180px);
  max-width: 600px;
  gap: 4px;
  box-shadow: 0 10px 30px rgba(0,0,0,.08);
  z-index: 99999;

  opacity: 0;
  visibility: hidden;
  transform: translateY(-6px);
  transition: opacity .25s ease, transform .25s ease, visibility .25s;
}

.dropdown-parent:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  transition: .25s;
}

.dropdown-item:hover {
  color: #b58763;
}

.search-wrap {
  position: relative;
}

.dropdown-search {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  width: 260px;
  background: white;
  border-radius: 12px;
  padding: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,.08);
  z-index: 99999;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity .25s ease, transform .25s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.search-input {
  width: 100%;
  border: 1px solid #ececec;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  outline: none;
  transition: .25s;
}

.search-input:focus {
  border-color: #b58763;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  color: #b58763;
}

.divider {
  display: inline-block;
  width: 1px;
  height: 20px;
  background: #b58763;
  margin: 0 10px;
}

.separator {
  border: none;
  border-top: 1px solid #ececec;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .category-bar-wrap {
    display: none;
  }

  .menu-bar-wrap {
    display: flex;
  }
}

</style>
