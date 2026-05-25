<template>
  <div
    v-if="show"
    class="modal-overlay"
    @click="handleClose"
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
          type="button"
          class="close-btn"
          @click="handleClose"
        >
          ✕
        </button>

      </div>

      <form
        class="product-form"
        @submit.prevent="handleSubmit"
      >

        <!-- Nama Product -->
        <div class="form-group">

          <label>Nama Produk</label>

          <input
            :value="productName"
            @input="
              emit(
                'update:productName',
                $event.target.value
              )
            "
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
              class="checkbox-chip"
            >

              <input
                type="checkbox"
                :value="Number(category.id)"
                :checked="
                  selectedCategories.includes(
                    Number(category.id)
                  )
                "
                @change="
                  toggleCategory(
                    Number(category.id)
                  )
                "
              />

              <span>
                {{ category.categoryName }}
              </span>

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
            v-if="previewImages?.length"
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
          :disabled="isSubmitting"
        >

          {{
            isSubmitting
              ? 'Menyimpan...'
              : editingProductId
                ? 'Update Product'
                : 'Simpan Product'
          }}

        </button>

      </form>

    </div>

  </div>
</template>

<script setup>

const props = defineProps({
  show: Boolean,
  productName: String,
  selectedCategories: Array,
  categories: Array,
  previewImages: Array,
  isSubmitting: Boolean,
  editingProductId: [Number, null]
})

const emit = defineEmits([
  'close',
  'submit',
  'update:productName',
  'update:selectedCategories',
  'image-change'
])

const handleClose = () => {
  emit('close')
}

const handleSubmit = () => {
  emit('submit')
}

const handleImageChange = (event) => {
  emit('image-change', event)
}

const toggleCategory = (id) => {

  const updated =
    props.selectedCategories.includes(id)
      ? props.selectedCategories.filter(
          item => item !== id
        )
      : [
          ...props.selectedCategories,
          id
        ]

  emit(
    'update:selectedCategories',
    updated
  )

}

</script>

<style scoped src="~/assets/css/modal.css"></style>