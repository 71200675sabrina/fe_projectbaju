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

        <template v-if="isLoadingBanners">

          <BannerSkeleton
            v-for="n in 3"
            :key="n"
          />

        </template>

        <template v-else>

          <div
            v-for="banner in banners"
            :key="banner.id"
            class="banner-item"
          >

          <img
            :src="banner.image || defaultBanner"
            loading="lazy"
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
            </template>

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

        <!-- SKELETON -->
        <template v-if="isLoadingProducts">

          <ProductSkeleton
            v-for="n in 4"
            :key="n"
          />

        </template>

        <!-- DATA -->
        <template v-else>

          <div
            v-for="product in products"
            :key="product.id"
            class="product-card"
          >

            <img
              :src="
                product.images?.length > 1
                  ? product.images[
                      currentImageIndexes[
                        product.id
                      ] || 0
                    ]
                  : product.images?.[0] ||
                    '/no-image.png'
              "
              loading="lazy"
            />

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

        </template>

      </div>

    </section>

    <ProductModal
      :show="showProductModal"
      :product-name="productName"
      :selected-categories="selectedCategories"
      :categories="categories"
      :preview-images="previewImages"
      :editing-product-id="editingProductId"
      :is-submitting="isSubmittingProduct"
      @close="closeProductModal"
      @submit="handleSubmitProduct"
      @image-change="handleImageChange"
      @update:productName="productName = $event"
      @update:selectedCategories="selectedCategories = $event"
    />

    <BannerModal
      :show="showBannerModal"
      :banner-name="bannerName"
      :banner-description="bannerDescription"
      :banner-active="bannerActive"
      :banner-preview="bannerPreview"
      :is-submitting="isSubmittingBanner"
      :editing-banner-id="editingBannerId"
      @close="closeBannerModal"
      @submit="
        editingBannerId
          ? updateBanner()
          : createBanner()
      "
      @image-change="handleBannerImageChange"
      @update:bannerName="bannerName = $event"
      @update:bannerDescription="
        bannerDescription = $event
      "
      @update:bannerActive="
        bannerActive = $event
      "
    />


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
import ProductModal from '~/components/ProductModal.vue'
import BannerModal from '~/components/BannerModal.vue'
import ProductSkeleton from '~/components/Skeleton/ProductSkeleton.vue'
import BannerSkeleton from '~/components/Skeleton/BannerSkeleton.vue'

useAuth()

definePageMeta({
  middleware: 'admin'
})

const products = ref([])

const defaultBanner = '/no-image.png'

const {
    banners,
    getBanners
} = useBanners()

const isLoadingProducts = ref(true)
const isLoadingCategories = ref(true)
const isLoadingBanners = ref(true)

const showProductModal = ref(false)

const productName = ref('')

const currentImageIndexes = ref({})

const selectedCategories = ref([])

const previewImages = ref([])

const selectedImages = ref([])

const editingProductId = ref(null)

const isSubmittingProduct = ref(false)

const isSubmittingBanner = ref(false)

const handleImageChange = (event) => {

  selectedImages.value =
    Array.from(event.target.files)

  previewImages.value =
    selectedImages.value.map(
      file => URL.createObjectURL(file)
    )

}

const startImageSlider = () => {

  setInterval(() => {

    products.value.forEach(product => {

      if (
        product.images &&
        product.images.length > 1
      ) {

        if (
          currentImageIndexes.value[
            product.id
          ] === undefined
        ) {

          currentImageIndexes.value[
            product.id
          ] = 0

        }

        currentImageIndexes.value[
          product.id
        ] =
          (
            currentImageIndexes.value[
              product.id
            ] + 1
          ) % product.images.length

      }

    })

  }, 2500)

}

const handleSubmitProduct = async () => {

  if (editingProductId.value) {
    await updateProduct()
  } else {
    await createProduct()
  }

}

const createProduct = async () => {

  try {

    isSubmittingProduct.value = true

    const formData = new FormData()

    formData.append(
      'productName',
      productName.value
    )

    selectedCategories.value.forEach(
      categoryId => {

        formData.append(
          'categories[]',
          categoryId
        )

      }
    )

    selectedImages.value.forEach(
      image => {

        formData.append(
          'images',
          image
        )

      }
    )

    await productService.createProduct(
      formData
    )

    await getProducts()

    closeProductModal()

  } catch (error) {

  console.error(error)

  } finally {
    isSubmittingProduct.value = false
  }

}

const updateProduct = async () => {

  try {

    isSubmittingProduct.value = true

    const formData = new FormData()

    formData.append(
      'productName',
      productName.value
    )

    selectedCategories.value.forEach(
      categoryId => {

        formData.append(
          'categories[]',
          categoryId
        )

      }
    )

    selectedImages.value.forEach(
      image => {

        formData.append(
          'images',
          image
        )

      }
    )

    await productService.updateProduct(
      editingProductId.value,
      formData
    )

    await getProducts()

    closeProductModal()

  } catch (error) {

  console.error(error)

  } finally {

    isSubmittingProduct.value = false

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

const closeProductModal = () => {

  editingProductId.value = null

  productName.value = ''

  selectedCategories.value = []

  selectedImages.value = []

  previewImages.value.forEach(image => {

    if (image.startsWith('blob:')) {

      URL.revokeObjectURL(image)

    }

  })

  showProductModal.value = false

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



const getProducts = async () => {

  try {

    isLoadingProducts.value = true

    const response =
      await productService.getAllProducts()

    products.value =
      response.data.map(
        product => ({

          id: product.id,

          title: product.productName,

          images:
            product.productImage?.length
              ? product.productImage.map(
                  item =>
                    `${API_BASE_URL}${item.image}`
                )
              : ['/no-image.png'],

          price: product.price,

          categories:
            product.productCategories

        })
      )

  } catch (error) {

  console.error(error)

  } finally {

    isLoadingProducts.value = false

  }

}

const showBannerModal = ref(false)

const getBannerData = async () => {

  try {

    isLoadingBanners.value = true

    await getBanners(true)

  } finally {

    isLoadingBanners.value = false

  }

}



const categories = ref([])

const getCategories = async () => {

  try {

    isLoadingCategories.value = true

    categories.value =
      await categoryService.getAllCategory()

  } catch (error) {

  console.error(error)

  } finally {

    isLoadingCategories.value = false

  }

}

onMounted(async () => {

  await Promise.all([
    getCategories(),
    getProducts(),
    getBannerData()
  ])

  startImageSlider()

})

const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID').format(price)
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

  if (
    bannerPreview.value &&
    bannerPreview.value.startsWith('blob:')
  ) {
    URL.revokeObjectURL(
      bannerPreview.value
    )
  }

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

  if (
    bannerPreview.value &&
    bannerPreview.value.startsWith('blob:')
  ) {
    URL.revokeObjectURL(
      bannerPreview.value
    )
  }

  bannerImage.value = file

  bannerPreview.value =
    URL.createObjectURL(file)

}

const createBanner = async () => {

  try {

    isSubmittingBanner.value = true

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

  } finally {

    isSubmittingBanner.value = false

  }

}

const updateBanner = async () => {

  try {

    isSubmittingBanner.value = true

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

  } finally {

    isSubmittingBanner.value = false

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


}
</style>