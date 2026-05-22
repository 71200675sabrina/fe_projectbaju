<template>

  <div class="admin-page">

    <!-- HEADER -->
    <header class="admin-header">

      <div>
        <h1>Dashboard Admin</h1>
        <p>Kelola banner dan produk website</p>
      </div>

    </header>

    <!-- BANNER -->
    <section class="admin-card">

      <div class="section-header">

        <div>
            <h2>Hero Banner</h2>
            <p>Banner yang tampil di homepage</p>
        </div>

        <button
            class="add-btn"
            @click="openCreateBannerModal"
            >
            + Tambah Banner
        </button>

        </div>

      <div class="banner-grid">

        <div
          v-for="banner in banners"
          :key="banner.id"
          class="banner-item"
        >

          <img
            :src="banner.image || defaultBanner"
             />

          <div class="banner-overlay">

            <div class="banner-info">
                <h3>{{ banner.title }}</h3>
                <p>{{ banner.subtitle }}</p>
            </div>

            <div class="banner-actions">

                <button
                class="edit-btn"
                @click="editBanner(banner)"
                >
                Edit
                </button>

                <button
                class="delete-btn"
                @click="deleteBanner(banner.id)"
                >
                Hapus
                </button>

            </div>

            </div>
            </div>

      </div>

    </section>

    <!-- CATEGORY -->
    <section class="admin-card">

    <div class="section-header">

        <div>
        <h2>Category Management</h2>
        <p>Kelola kategori product website</p>
        </div>

    </div>

    <!-- ADD CATEGORY -->
    <form
        class="category-form"
        @submit.prevent="addCategory"
    >

        <input
        v-model="newCategory"
        type="text"
        placeholder="Masukkan nama kategori"
        />

        <button
            type="submit"
            class="add-btn"
            :disabled="isAddingCategory"
            >
            {{
                isAddingCategory
                ? 'Menyimpan...'
                : '+ Tambah Category'
            }}
        </button>

    </form>

    <!-- CATEGORY LIST -->
    <div class="category-list">

        <div
        v-for="category in categories"
        :key="category.id"
        class="category-card"
        >

        <!-- EDIT MODE -->
        <template v-if="editingCategoryId === category.id">

            <input
            v-model="editCategoryName"
            class="category-edit-input"
            />

            <div class="category-actions">

            <button
                class="save-btn"
                @click="updateCategory(category.id)"
            >
                Simpan
            </button>

            <button
                class="cancel-btn"
                @click="cancelEdit"
            >
                Batal
            </button>

            </div>

        </template>

        <!-- NORMAL MODE -->
        <template v-else>

            <span>
            {{ category.categoryName }}
            </span>

            <div class="category-actions">

            <button
                class="edit-btn"
                @click="startEdit(category)"
            >
                Edit
            </button>

            <button
                class="delete-btn"
                @click="deleteCategory(category.id)"
            >
                Hapus
            </button>

            </div>

        </template>

        </div>

    </div>

    </section>

    <!-- PRODUCT -->
    <section class="admin-card">

      <div class="section-header">

        <div>
          <h2>Product Management</h2>
          <p>Kelola product card homepage</p>
        </div>

        <button
            class="add-btn"
            @click="openCreateModal"
        >
            + Tambah Product
        </button>

      </div>

      <div class="product-grid">

        <div
          v-for="product in products"
          :key="product.id"
          class="product-card"
        >

          <img :src="product.image" />

          <div class="product-content">

            <h3>{{ product.title }}</h3>

            <p>
              Rp {{ formatPrice(product.price) }}
            </p>

            <div class="actions">

              <button
                class="edit-btn"
                @click="editProduct(product)"
              >
                Edit
              </button>

              <button
                class="delete-btn"
                @click="deleteProduct(product.id)"
              >
                Hapus
              </button>

            </div>

          </div>

        </div>

      </div>

    </section>

  </div>

  <div
    v-if="showProductModal"
    class="modal-overlay"
    @click="closeProductModal"
    >

    <div
        class="modal-card"
        @click.stop
    >

        <div class="modal-header">
        <h2>
            {{
                editingProductId
                ? 'Edit Product'
                : 'Tambah Product'
            }}
        </h2>

        <button
            class="close-btn"
            @click="closeProductModal"
        >
            ✕
        </button>
        </div>

        <form
            class="product-form"
            @submit.prevent="
                editingProductId
                ? updateProduct()
                : createProduct()
            "
        >

        <!-- Nama Product -->
        <div class="form-group">
            <label>Nama Produk</label>

            <input
            v-model="productName"
            type="text"
            placeholder="Masukkan nama produk"
            />
        </div>

        <!-- Category -->
        <div class="form-group">

            <label>Kategori</label>

            <div class="checkbox-group">

            <label
                v-for="category in categories"
                :key="category.id"
                class="checkbox-item"
            >

                <input
                    type="checkbox"
                    :value="Number(category.id)"
                    v-model="selectedCategories"
                />

                {{ category.categoryName }}

            </label>

            </div>

        </div>

        <!-- Upload -->
        <div class="form-group">

            <label>Upload Image</label>

            <input
                type="file"
                multiple
                accept="image/png,image/jpeg"
                @change="handleImageChange"
            />

            <div
                v-if="previewImages.length"
                class="preview-container"
                >
                <img
                    v-for="(image,index) in previewImages"
                    :key="index"
                    :src="image"
                    class="preview-image"
                />
            </div>

            <small>
            Gunakan gambar portrait ukuran 4:5
            </small>

        </div>

        <button
            type="submit"
            class="submit-btn"
            >
            {{
                editingProductId
                ? 'Update Product'
                : 'Simpan Product'
            }}
        </button>

        </form>

    </div>

    </div>

    <div
        v-if="showBannerModal"
        class="modal-overlay"
        @click="closeBannerModal"
        >
        <div
            class="modal-card"
            @click.stop
        >

            <div class="modal-header">

            <h2>
                {{
                editingBannerId
                    ? 'Edit Banner'
                    : 'Tambah Banner'
                }}
            </h2>

            <button
            type="button"
            class="close-btn"
            @click="closeBannerModal"
            >
                ✕
            </button>

            </div>

            <form
            class="product-form"
            @submit.prevent="
                editingBannerId
                ? updateBanner()
                : createBanner()
            "
            >

            <div class="form-group">

                <label>Nama Banner</label>

                <input
                v-model="bannerName"
                type="text"
                />

            </div>

            <div class="form-group">

                <label>Deskripsi</label>

                <input
                v-model="bannerDescription"
                type="text"
                />

            </div>

            <div class="form-group">

                <label>Status Aktif</label>

                <input
                type="checkbox"
                v-model="bannerActive"
                />

            </div>

            <div class="form-group">

                <label>Gambar Banner</label>

                <input
                type="file"
                accept="image/*"
                @change="
                    handleBannerImageChange
                "
                />

            </div>

            <img
                v-if="bannerPreview"
                :src="bannerPreview"
                style="
                width:100%;
                border-radius:12px;
                "
            />

            <button
            type="submit"
            class="submit-btn"
            >
                {{
                editingBannerId
                    ? 'Update Banner'
                    : 'Simpan Banner'
                }}
            </button>

            </form>

        </div>
        </div>

</template>

<script setup>
import { useAuth } from '~/composables/useAuth'
import { useBanners } from '~/composables/useBanners'
import { ref, onMounted } from 'vue'
import { categoryService } from '~/services/categoryService'
import { productService } from '~/services/productService'
import { API_BASE_URL } from '~/utils/constants'
import { bannerService } from '~/services/bannerService'

useAuth()

definePageMeta({
  middleware: 'admin'
})

const products = ref([])

const {
    banners,
    getBanners
} = useBanners()

const selectedImages = ref([])

const handleImageChange = (event) => {

  selectedImages.value =
    Array.from(event.target.files)

  previewImages.value =
    selectedImages.value.map(
      file => URL.createObjectURL(file)
    )

}

const getProducts = async () => {

  try {

    const response =
      await productService.getAllProducts()

    products.value = response.map(
      product => ({
        id: product.id,
        title: product.productName,
        image:
        product.productImage?.[0]?.image
            ? `${API_BASE_URL}${product.productImage[0].image}`
            : '/no-image.png',
        price: product.price,
        categories:
          product.productCategories
      })
    )

  } catch (error) {

    console.error(error)

  }

}

const createProduct = async () => {

    if (!productName.value.trim()) {
        alert('Nama produk wajib diisi')
        return
    }

    if (!selectedCategories.value.length) {
        alert('Pilih minimal 1 kategori')
        return
    }

  try {

    const formData =
      new FormData()

    formData.append(
      'productName',
      productName.value
    )

    formData.append(
        'category',
        JSON.stringify(
            selectedCategories.value.map(Number)
        )
    )

    selectedImages.value.forEach(image => {

      formData.append(
        'images',
        image
      )

    })

    console.log(
    'CATEGORY:',
    selectedCategories.value
    )

    console.log(
    'CATEGORY JSON:',
    JSON.stringify(
        selectedCategories.value.map(Number)
    )
    )

    for (const pair of formData.entries()) {
        console.log(pair[0], pair[1])
    }

    await productService.createProduct(
    formData
    )

    await getProducts()

    showProductModal.value = false
    productName.value = ''
    selectedCategories.value = []
    selectedImages.value = []
    previewImages.value = []

    } catch (error) {

    console.log('ERROR FULL:', error)

    console.log('ERROR DATA:', error.data)

    alert(
        JSON.stringify(
        error.data,
        null,
        2
        )
    )

    }

}

const openCreateModal = () => {

  editingProductId.value = null

  productName.value = ''

  selectedCategories.value = []

  selectedImages.value = []
  previewImages.value = []

  showProductModal.value = true

}

const previewImages = ref([])

const showProductModal = ref(false)
const showBannerModal = ref(false)

const productName = ref('')

const selectedCategories = ref([])

const categories = ref([])

const getCategories = async () => {

  try {

    categories.value =
      await categoryService.getAllCategory()

  } catch (error) {

    console.error(error)

  }

}

onMounted(async () => {

  await getCategories()

  await getProducts()

  await getBanners(true)
})

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
}

const updateProduct = async () => {

    if (!productName.value.trim()) {
        alert('Nama produk wajib diisi')
        return
    }

    if (!selectedCategories.value.length) {
        alert('Pilih minimal 1 kategori')
        return
    }

  try {

    const formData =
      new FormData()

    formData.append(
      'productName',
      productName.value
    )

    formData.append(
        'category',
        JSON.stringify(
            selectedCategories.value.map(Number)
        )
    )

    selectedImages.value.forEach(image => {

      formData.append(
        'images',
        image
      )

    })

    console.log(
    'CATEGORY:',
    selectedCategories.value
    )

    console.log(
    'CATEGORY JSON:',
    JSON.stringify(
        selectedCategories.value.map(Number)
    )
    )

    await productService.updateProduct(
    editingProductId.value,
    formData
    )

    await getProducts()

    showProductModal.value = false

    editingProductId.value = null

    productName.value = ''
    selectedCategories.value = []
    selectedImages.value = []
    previewImages.value = []

  } catch (error) {

    console.error(error)

  }

}

const editProduct = (product) => {

  editingProductId.value = product.id

  productName.value = product.title

  selectedCategories.value =
  product.categories?.map(
    item => item.category.id
  ) || []

    previewImages.value =
    product.image &&
    product.image !== '/no-image.png'
        ? [product.image]
        : []

  showProductModal.value = true
}

const deleteProduct = async (id) => {

  const confirmDelete = confirm(
    'Yakin hapus product ?'
  )

  if (!confirmDelete) return

  try {

    await productService.deleteProduct(id)

    await getProducts()

  } catch (error) {

    console.error(error)

  }

}

const editingProductId = ref(null)

const newCategory = ref('')

const isAddingCategory = ref(false)

const editingCategoryId = ref(null)

const editCategoryName = ref('')

const addCategory = async () => {

  if (!newCategory.value) return

  try {

    isAddingCategory.value = true

    await categoryService.createCategory({
      categoryName: newCategory.value
    })

    newCategory.value = ''

    await getCategories()

  } catch (error) {

    console.error(error)

  } finally {

    isAddingCategory.value = false
  }
}

const startEdit = (category) => {

  editingCategoryId.value = category.id

  editCategoryName.value =
    category.categoryName
}

const cancelEdit = () => {

  editingCategoryId.value = null

  editCategoryName.value = ''
}

const updateCategory = async (id) => {

  if (!editCategoryName.value.trim()) return

  try {

    await categoryService.updateCategory(
      id,
      {
        categoryName: editCategoryName.value
      }
    )

    editingCategoryId.value = null
    editCategoryName.value = ''

    await getCategories()

  } catch (error) {

    console.error(error)
  }
}

const deleteCategory = async (id) => {

  const confirmDelete = confirm(
    'Apakah yakin ingin menghapus kategori ini?'
  )

  if (!confirmDelete) return

  try {

    await categoryService.deleteCategory(id)

    await getCategories()

  } catch (error) {

    console.error(error)
  }
}

const resetProductForm = () => {

  editingProductId.value = null

  productName.value = ''

  selectedCategories.value = []

  selectedImages.value = []

  previewImages.value = []

}

const closeProductModal = () => {

  resetProductForm()

  showProductModal.value = false

}

const bannerName = ref('')
const bannerDescription = ref('')
const bannerActive = ref(true)

const bannerImage = ref(null)
const bannerPreview = ref('')

const editingBannerId = ref(null)

const resetBannerForm = () => {

  editingBannerId.value = null

  bannerName.value = ''
  bannerDescription.value = ''

  bannerActive.value = true

  bannerImage.value = null

  bannerPreview.value = ''

}

const closeBannerModal = () => {

  resetBannerForm()

  showBannerModal.value = false

}

const openCreateBannerModal = () => {

  resetBannerForm()

  showBannerModal.value = true

}

const handleBannerImageChange = (
  event
) => {

  const file =
    event.target.files[0]

  if (!file) return

  bannerImage.value = file

  bannerPreview.value =
    URL.createObjectURL(file)


}

const createBanner = async () => {

  try {

    const formData = new FormData()

    formData.append(
      'bannerName',
      bannerName.value
    )

    formData.append(
      'bannerDescription',
      bannerDescription.value
    )

    formData.append(
      'activate',
      bannerActive.value
    )

    if (bannerImage.value) {

      formData.append(
        'image',
        bannerImage.value
      )

    }

    await bannerService.createBanner(
      formData
    )

    await getBanners(true)

    closeBannerModal()

  } catch (error) {

    console.error(error)

  }

}

const updateBanner = async () => {

  try {

    const formData = new FormData()

    formData.append(
      'bannerName',
      bannerName.value
    )

    formData.append(
      'bannerDescription',
      bannerDescription.value
    )

    formData.append(
      'activate',
      bannerActive.value
    )

    if (bannerImage.value) {

      formData.append(
        'image',
        bannerImage.value
      )

    }

    await bannerService.updateBanner(
      editingBannerId.value,
      formData
    )

    await getBanners(true)

    closeBannerModal()

  } catch (error) {

    console.error(error)

  }

}

const editBanner = (banner) => {

  resetBannerForm()

  editingBannerId.value =
    banner.id

  bannerName.value =
    banner.title

  bannerDescription.value =
    banner.subtitle

  bannerActive.value =
    banner.activate

  bannerPreview.value =
    banner.image

  showBannerModal.value = true

}

const deleteBanner = async (
  id
) => {

  const confirmDelete =
    confirm(
      'Yakin hapus banner?'
    )

  if (!confirmDelete) return

  try {

    await bannerService.deleteBanner(
      id
    )

    await getBanners()

  } catch (error) {

    console.error(error)

  }

}
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: #f8f5f2;
  padding: 40px;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.admin-header h1 {
  font-size: 36px;
  color: #b58763;
}

.admin-header p {
  color: #777;
  margin-top: 6px;
}

.logout-btn {
  background: #111;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 12px;
  cursor: pointer;
}

.admin-card {
  background: white;
  border-radius: 24px;
  padding: 28px;
  margin-bottom: 30px;
  box-shadow:
    0 6px 20px rgba(0,0,0,0.03);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.section-header h2 {
  margin-bottom: 6px;
}

.section-header p {
  color: #777;
}

.banner-grid {
  display: grid;
  gap: 20px;
}


.banner-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-grid {
  display: grid;
  gap: 24px;
}

.banner-item {
  position: relative;
  height: 340px; /* lebih tinggi */
  overflow: hidden;
  border-radius: 24px;

  box-shadow:
    0 8px 24px rgba(0,0,0,.08);

  transition: .3s;
}

.banner-item:hover {
  transform: translateY(-4px);
}

.banner-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  inset: 0;

  background:
    linear-gradient(
      to top,
      rgba(0,0,0,.75),
      rgba(0,0,0,.15),
      transparent
    );

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  padding: 28px;
}

.banner-info {
  max-width: 70%;
}

.banner-info h3 {
  color: white;
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 8px;
}

.banner-info p {
  color: rgba(255,255,255,.9);
  line-height: 1.6;
}

.banner-actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.banner-overlay button:hover {
  opacity: 0.9;
}

.banner-actions {
  display: flex;
  gap: 10px;
}

.banner-actions .edit-btn {
  background: #b58763;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 12px;
  cursor: pointer;
}

.banner-actions .delete-btn {
  background: #ffebeb;
  color: #e53935;
  border: none;
  padding: 12px 18px;
  border-radius: 12px;
  cursor: pointer;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.45);

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999;
}

.modal-card {
  width: 100%;
  max-width: 520px;

  background: white;
  border-radius: 28px;

  padding: 32px;

  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-bottom: 28px;
}

.modal-header h2 {
  color: #b58763;
}

.close-btn {
  width: 40px;
  height: 40px;

  border: none;
  border-radius: 12px;

  background: #f8f5f2;
  color: #b58763;

  font-size: 18px;
  font-weight: 600;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.3s;
}

.close-btn:hover {
  background: #f1e5da;
  transform: rotate(90deg);
}

.product-form {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
}

.form-group input[type="text"],
.form-group input[type="file"] {
  background: #f8f5f2;
  cursor: pointer;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.checkbox-item {
  background: #f8f5f2;
  border-radius: 12px;
  padding: 10px 14px;

  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.3s;


  font-size: 14px;
}

.checkbox-item:hover {
  background: #f1e5da;
}

.submit-btn {
  height: 54px;
  border: none;
  border-radius: 14px;

  background: #b58763;
  color: white;

  font-size: 16px;
  cursor: pointer;
}

.submit-btn:hover {
  opacity: 0.9;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;

  border: 1px solid #eee;

  transition: 0.3s;

  box-shadow:
    0 4px 14px rgba(0,0,0,0.04);
}

.product-card:hover {
  transform: translateY(-4px);

  box-shadow:
    0 10px 24px rgba(0,0,0,0.08);
}

.product-card img {
  width: 100%;
  height: 280px;
  object-fit: cover;
}

.product-content {
  padding: 20px;
}

.product-content h3 {
  margin-bottom: 10px;
}

.product-content p {
  color: #b58763;
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

.edit-btn,
.delete-btn,
.add-btn {
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  cursor: pointer;
}

.edit-btn {
  background: #f4ebe3;
  color: #b58763;
}

.delete-btn {
  background: #ffe8e8;
  color: red;
}

.add-btn {
  background: #b58763;
  color: white;

  height: 46px;
  padding: 0 20px;

  border: none;
  border-radius: 14px;

  font-weight: 600;

  transition: 0.3s;
}

.add-btn:hover {
  transform: translateY(-2px);
  opacity: 0.95;
}

.add-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.category-form {
  display: flex;
  gap: 14px;
  margin-bottom: 28px;
}

.category-form input {
  flex: 1;

  height: 50px;

  border: 1px solid #eee;
  border-radius: 14px;

  padding: 0 18px;

  background: #f8f5f2;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.category-card {
  background: #f8f5f2;

  border-radius: 18px;

  padding: 18px 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  transition: 0.3s;
}

.category-card:hover {
  background: #f1e5da;
}

.category-card span {
  font-weight: 600;
  color: #333;
}

.category-actions {
  display: flex;
  gap: 10px;
}

.category-edit-input {
  height: 44px;

  border: 1px solid #ddd;
  border-radius: 12px;

  padding: 0 14px;

  width: 220px;

  background: white;
}

.save-btn {
  background: #b58763;
  color: white;

  border: none;

  border-radius: 10px;

  padding: 10px 16px;

  cursor: pointer;
}

.cancel-btn {
  background: #ececec;
  color: #444;

  border: none;

  border-radius: 10px;

  padding: 10px 16px;

  cursor: pointer;
}

@media (max-width: 768px) {

  .category-form {
    flex-direction: column;
  }

  .category-card {
    flex-direction: column;
    align-items: start;
    gap: 16px;
  }

}

@media (max-width: 992px) {

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }

}

@media (max-width: 768px) {

  .admin-page {
    padding: 20px;
  }

  .product-grid {
    grid-template-columns: 1fr;
  }

  .section-header,
  .admin-header {
    flex-direction: column;
    align-items: start;
    gap: 16px;
  }

  .modal-card {
  max-height: 90vh;
  overflow-y: auto;
}


}
</style>