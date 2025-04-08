<script setup>
import { computed } from 'vue'
import Icon from './Icon.vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validate(props, values) {
      return ['default', 'primary', 'outline', 'secondary', 'danger'].includes(
        values
      )
    }
  },
  size: {
    type: String,
    default: 'md',
    validate(props, values) {
      return ['sm', 'md', 'lg'].includes(values)
    }
  },
  square: Boolean,
  left: Boolean,
  loading: Boolean,
  icon: String,
  label: String
})

const variantClasses = computed(() => {
  return {
    default:
      'text-gray-700 hover:bg-gray-200 focus:ring-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-600 dark:hover:bg-gray-700',
    primary:
      'text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
    danger:
      'text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800',
    outline:
      'text-blue-700 border border-blue-700 hover:bg-gray-200 focus:ring-blue-300 dark:border-blue-500 dark:text-blue-500 dark:hover:bg-gray-700 dark:focus:ring-blue-800 dark:hover:bg-gray-700',
    secondary:
      'text-gray-700 border border-gray-500 hover:bg-gray-200 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-600 dark:hover:bg-gray-700'
  }[props.variant]
})

const sizeClasses = computed(() => {
  return {
    sm: props.square ? 'p-2' : 'px-4 py-2 text-sm',
    md: props.square ? 'p-2.5' : 'px-5 py-2.5 text-sm',
    lg: props.square ? 'p-3' : 'px-6 py-3 text-base'
  }[props.size]
})
</script>
<template>
  <button
    class="inline-flex items-center focus:ring-4 focus:outline-none font-medium rounded-lg me-2 capitalize transition-colors duration-150 transform cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
    :class="[variantClasses, sizeClasses, left ? 'text-left' : 'text-center']"
  >
    <Icon name="Loader2" class="size-5 mr-2 animate-spin" v-if="loading" />
    <Icon :name="icon" class="size-5 mr-2" v-if="icon && !loading" />
    <span v-if="label">{{ label }}</span>
    <slot v-else />
  </button>
</template>
