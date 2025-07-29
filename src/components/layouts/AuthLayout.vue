<script setup>
import AppLogo from '../ui/AppLogo.vue'
</script>
<template>
  <div class="min-h-screen w-full lg:grid lg:grid-cols-2">
    <div class="flex items-center justify-center py-12">
      <div class="mx-auto grid w-full max-w-md gap-6">
        <slot />
      </div>
    </div>
    <div
      class="hidden lg:flex-1 bg-gray-200 bg-muted lg:flex lg:items-center lg:justify-center"
    >
      <AppLogo />
    </div>
  </div>
</template>
