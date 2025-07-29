<script setup>
import { onMounted, ref } from 'vue'

const model = defineModel()

const input = ref(null)

onMounted(() => {
  if (input.value.hasAttribute('autofocus')) {
    input.value.focus()
  }
})

defineExpose({ focus: () => input.value.focus() })
</script>

<template>
  <textarea ref="input" class="input" v-model="model" />
</template>
