<script setup>
import Icon from '../Icon.vue'
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
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800">
      <div class="sm:flex sm:items-start">
        <div
          class="mx-auto shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-gray-700 sm:mx-0 sm:h-10 sm:w-10"
        >
          <Icon name="TriangleAlert" class="h-6 w-6 text-red-600" />
        </div>

        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100">
            <slot name="title" />
          </h3>

          <div class="py-4 text-gray-700 dark:text-gray-200">
            <slot name="content" />
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="$slots.footer"
      class="flex flex-row justify-end px-6 py-4 text-right border-t boorder-gray-200 dark:border-gray-700"
    >
      <slot name="footer" />
    </div>
  </Modal>
</template>
