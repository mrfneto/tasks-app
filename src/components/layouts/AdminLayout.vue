<script setup>
import { LogOut } from 'lucide-vue-next'

import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import AppLogo from '../ui/AppLogo.vue'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await authStore.logout()
  router.push({ name: 'login' })
}
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <header class="border-b border-gray-200 px-4 py-2">
      <nav class="container-md flex items-center justify-between">
        <AppLogo />

        <div class="flex items-center space-x-2">
          <button @click="handleLogout" class="btn btn-ghost">
            Mrfneto
            <LogOut class="w-4 h-4 ml-2" />
          </button>
        </div>
      </nav>
    </header>
    <main class="flex-1 p-6">
      <div class="container-md py-8">
        <slot />
      </div>
    </main>
    <footer class="text-gray-600 p-4 text-center">
      &copy; {{ new Date().getFullYear() }} Tasks App. All rights reserved.
    </footer>
  </div>
</template>
