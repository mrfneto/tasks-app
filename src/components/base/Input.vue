<script setup>
import { computed, onMounted, ref } from 'vue'
const model = defineModel()

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  error: String,
  label: String
})

const input = ref(null)

const classes = computed(() => {
  return `bg-gray-50 border text-gray-800 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white focus:outline-none ${
    props.error
      ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-500 dark:focus:ring-red-500 '
      : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
  }`
})

onMounted(() => {
  if (input.value.hasAttribute('autofocus')) {
    input.value.focus()
  }
})

defineExpose({ focus: () => input.value.focus() })
</script>
<template>
  <div :class="$attrs.class">
    <label
      v-if="label"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      :for="id"
      >{{ label }}:</label
    >

    <textarea
      v-if="type === 'textarea'"
      :id="id"
      ref="input"
      v-bind="{ ...$attrs, class: null }"
      :class="[classes, 'h-auto']"
      :type="type"
      v-model="model"
    />

    <select
      v-else-if="type === 'select'"
      :id="id"
      ref="input"
      v-bind="{ ...$attrs, class: null }"
      :class="[classes, 'pr-10']"
      v-model="model"
    >
      <slot />
    </select>

    <input
      v-else
      :id="id"
      ref="input"
      v-bind="{ ...$attrs, class: null }"
      :class="[classes, { error: error }]"
      :type="type"
      v-model="model"
    />

    <div v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-500">
      {{ error }}
    </div>
  </div>
</template>
