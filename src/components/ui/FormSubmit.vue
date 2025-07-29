<script setup>
import { LoaderCircle } from 'lucide-vue-next'

defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button type="submit" class="btn" :disabled="loading">
    <LoaderCircle class="w-4 h-4 mr-2 animate-spin" v-if="loading" />
    <slot />
  </button>
</template>
