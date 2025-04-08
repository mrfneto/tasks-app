<script setup>
import { ref } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  label: String,
  description: String
})

const emit = defineEmits(['update:modelValue'])

const isChecked = ref(props.modelValue)

const toggleCheckbox = () => {
  isChecked.value = !isChecked.value
  emit('update:modelValue', isChecked.value)
}
</script>

<template>
  <div class="flex" :class="$attrs.class">
    <div class="flex items-center h-5">
      <input
        type="checkbox"
        :id="`${id}-input`"
        :checked="isChecked"
        @change="toggleCheckbox"
        :aria-describedby="`${id}-${description}`"
        v-bind="{ ...$attrs, class: null }"
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
      />
    </div>
    <div class="ms-2 text-sm">
      <label
        :for="`${id}-input`"
        class="font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
        >{{ label }}</label
      >
      <p
        v-if="description"
        class="text-xs font-normal text-gray-500 dark:text-gray-300"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>

<!-- how to use:

<FormCheckbox
      id="example-checkbox"
      v-model="isChecked"
      label="Aceitar termos e condições"
      description="Você deve aceitar os termos e condições para continuar."
    /> -->
