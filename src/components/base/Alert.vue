<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'
// imports

//props e emits
const props = defineProps({
  type: { type: String, default: 'default' },
  title: { type: String, required: false },
  message: { type: String, required: true }
})
// states

// Computed properties
const classes = computed(() => {
  return {
    success:
      'text-green-800 border-green-300 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800',
    error:
      'text-red-800 border-red-300 bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800',
    warning:
      'text-yellow-800 border-yellow-300 bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400 dark:border-yellow-800',
    info: 'text-blue-800 border-blue-300 bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800',
    default:
      'text-gray-800 border-gray-300 bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600'
  }[props.type]
})
// Métodos / funções
</script>
<template>
  <div
    class="p-4 mb-4 border rounded-lg flex"
    role="alert"
    :class="[classes, title ? 'flex-col' : 'flex-row items-center']"
  >
    <div class="flex items-center">
      <Icon name="Info" class="shrink-0 w-4 h-4 me-2" />
      <span class="sr-only">Info</span>
      <h3 v-if="title" class="text-lg font-medium capitalize mb-1">
        {{ title }}
      </h3>
    </div>
    <div class="text-sm">
      <span v-if="message"> {{ message }}</span>
      <slot v-else />
    </div>
  </div>
</template>
