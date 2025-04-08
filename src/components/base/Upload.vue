<script setup>
import { ref } from 'vue'

// Define as propriedades do componente
const props = defineProps({
  id: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
})

// Referência para o input de arquivo
const fileInput = ref(null)

// Função para acionar o clique no input de arquivo
const triggerFileInput = () => {
  fileInput.value.click()
}

const handleFileUpload = event => {
  this.file = event.target.files[0]
}
</script>

<template>
  <div :class="$attrs.class">
    <!-- Label opcional -->
    <label
      v-if="label"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      :for="id"
      >{{ label }}:</label
    >

    <!-- Input de arquivo escondido -->
    <input
      :id="id"
      ref="fileInput"
      type="file"
      style="display: none"
      v-bind="{ ...$attrs, class: null }"
      @change="handleFileUpload"
    />

    <!-- Botão personalizado para selecionar arquivo -->
    <button
      type="button"
      @click="triggerFileInput"
      class="text-left bg-gray-50 text-gray-800 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white focus:outline-none border-2 border-dashed border-gray-400 dark:border-gray-600 cursor-pointer"
      :class="
        error
          ? 'border-red-300 focus:ring-red-500 focus:border-red-500 dark:border-red-500 dark:focus:ring-red-500 '
          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500'
      "
    >
      Selecionar Arquivo
    </button>
    <!-- Exibir mensagem de erro se houver -->
    <div v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-500">
      {{ error }}
    </div>
    <!-- Descrição opcional -->
    <p
      v-if="description"
      class="text-xs font-normal text-gray-500 dark:text-gray-300"
    >
      {{ description }}
    </p>
  </div>
</template>
