<script setup></script>
<template>
  <header class="relative">
    <nav class="min-h-[4rem] flex items-center w-full relative px-4 shadow-lg">
      <div class="justify-start w-1/2">
        <slot name="start" />
      </div>
      <div class="shrink-0">
        <slot name="center" />
      </div>
      <div class="justify-end w-1/2">
        <slot name="end" />
      </div>
    </nav>
  </header>
</template>
<style scoped>
:where(nav > *:not(script, style)) {
  @apply inline-flex items-center;
}
</style>
