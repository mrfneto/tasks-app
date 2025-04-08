<script setup>
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, watch } from 'vue'

defineProps({ show: Boolean, permanent: Boolean, user: Object })

const emit = defineEmits(['close'])

const route = useRoute()

watch(
  () => route.path,
  () => {
    emit('close')
  }
)

const close = () => {
  emit('close')
}

const closeOnEscape = e => {
  if (e.key === 'Escape') {
    close()
  }
}

onMounted(() => document.addEventListener('keydown', closeOnEscape))

onUnmounted(() => {
  document.removeEventListener('keydown', closeOnEscape)
  document.body.style.overflow = null
})

const getFirstLetterToName = name => {
  const arr = name.split(' ')
  return arr[0].substring(0, 1) + arr[1].substring(0, 1)
}
</script>
<template>
  <div>
    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
    >
      <div
        @keydown.esc="$emit('close')"
        v-show="show"
        class="z-10 fixed inset-0 transition-opacity"
      >
        <div
          @click="$emit('close')"
          class="absolute inset-0 bg-black opacity-50 lg:hidden cursor-pointer"
          tabindex="0"
        ></div>
      </div>
    </transition>

    <aside
      :class="[
        show
          ? 'translate-x-0 opacity-100 '
          : permanent
          ? 'opacity-0 -translate-x-full lg:translate-x-0 lg:opacity-100'
          : 'opacity-0 -translate-x-full'
      ]"
      class="fixed inset-0 z-50 flex flex-col w-80 h-screen px-4 pt-8 pb-4 overflow-y-auto bg-white border-r border-gray-200 transition-all duration-300 ease-in-out dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="border-b border-gray-200 dark:border-gray-700 pb-4">
        <slot name="header" />
      </div>
      <div class="flex flex-col justify-between flex-1 my-6">
        <div class="flex flex-col flex-1 space-y-2">
          <slot name="content" />
        </div>
      </div>
      <div
        class="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2"
        v-if="$slots.footer"
      >
        <slot name="footer" />
      </div>
    </aside>
  </div>
</template>
