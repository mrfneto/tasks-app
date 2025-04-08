<script setup>
import Modal from './Modal.vue'

const emit = defineEmits(['close'])

defineProps({
  show: {
    type: Boolean,
    default: false
  },
  maxWidth: {
    type: String,
    default: '2xl'
  },
  closeable: {
    type: Boolean,
    default: true
  }
})

const close = () => {
  emit('close')
}
</script>

<template>
  <Modal
    :show="show"
    :max-width="maxWidth"
    :closeable="closeable"
    @close="close"
  >
    <div class="px-6 py-4">
      <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100">
        <slot name="title" />
      </h3>

      <div class="mt-4 text-gray-700 dark:text-gray-200">
        <slot name="content" />
      </div>
    </div>

    <div
      v-if="$slots.footer"
      class="flex flex-row justify-end px-6 py-4 bg-gray-100 text-right dark:bg-gray-800"
    >
      <slot name="footer" />
    </div>
  </Modal>
</template>
