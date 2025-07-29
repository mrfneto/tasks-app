<script setup>
import { ListTodo } from 'lucide-vue-next'
</script>

<template>
  <RouterLink to="/" class="heading-lg mb-0 flex items-center">
    <ListTodo class="w-6 h-6 mr-2" />
    <span class="text-lg font-bold">Tasks App</span>
  </RouterLink>
</template>
