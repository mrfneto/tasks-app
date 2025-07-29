<script setup>
defineProps({
  label: String,
  hint: String
})
</script>

<template>
  <label class="font-medium text-sm text-gray-700 flex flex-col mb-1.5">
    <span v-if="label">{{ label }}</span>
    <slot v-else />
    <span class="text-sm text-gray-500 mt-1" v-if="hint">{{ hint }}</span>
  </label>
</template>
