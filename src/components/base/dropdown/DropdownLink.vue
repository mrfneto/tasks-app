<script setup>
import Icon from '../Icon.vue'
defineProps({
  to: [String, Object],
  label: String,
  icon: String
})
</script>

<template>
  <component
    :is="to ? 'RouterLink' : 'button'"
    :to="to"
    class="block w-full px-4 py-2 text-sm leading-5 text-gray-700 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition cursor-pointer dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-800"
  >
    <Icon v-if="icon" name="Icon" class="size-4 mr-2" />
    <span v-if="label">{{ label }}</span>
    <slot v-else />
  </component>
</template>
