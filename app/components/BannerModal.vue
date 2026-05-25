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
            editingBannerId
              ? 'Edit Banner'
              : 'Tambah Banner'
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

        <div class="form-group">

          <label>Nama Banner</label>

          <input
            :value="bannerName"
            type="text"
            @input="
              emit(
                'update:bannerName',
                $event.target.value
              )
            "
          />

        </div>

        <div class="form-group">

          <label>Deskripsi</label>

          <input
            :value="bannerDescription"
            type="text"
            @input="
              emit(
                'update:bannerDescription',
                $event.target.value
              )
            "
          />

        </div>

        <div class="form-group">

          <label>Status Banner</label>

          <div class="switch-wrapper">

            <span>
              {{
                bannerActive
                  ? 'Banner Aktif'
                  : 'Banner Nonaktif'
              }}
            </span>

            <label class="switch">

              <input
                type="checkbox"
                :checked="bannerActive"
                @change="
                  emit(
                    'update:bannerActive',
                    $event.target.checked
                  )
                "
              />

              <span class="slider"></span>

            </label>

          </div>

        </div>

        <div class="form-group">

          <label>Gambar Banner</label>

          <input
            type="file"
            accept="image/*"
            @change="handleImageChange"
          />

        </div>

        <img
          v-if="bannerPreview"
          :src="bannerPreview"
          loading="lazy"
          class="preview-banner"
        />

        <button
          type="submit"
          class="submit-btn"
          :disabled="isSubmitting"
        >

          {{
              isSubmitting
                ? 'Menyimpan...'
                : editingBannerId
                  ? 'Update Banner'
                  : 'Tambah Banner'
            }}

        </button>

      </form>

    </div>

  </div>

</template>

<script setup>

const props = defineProps({
  show: Boolean,
  bannerName: String,
  bannerDescription: String,
  bannerActive: Boolean,
  bannerPreview: String,
  isSubmitting: Boolean,
  editingBannerId: [Number, null]
})

const emit = defineEmits([
  'close',
  'submit',
  'image-change',
  'update:bannerName',
  'update:bannerDescription',
  'update:bannerActive'
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

</script>

<style scoped src="~/assets/css/modal.css"></style>

<style scoped>
.preview-banner {
  width: 100%;
  border-radius: 12px;
}
</style>