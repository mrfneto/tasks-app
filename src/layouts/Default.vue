<script setup>
// imports
import { ref } from 'vue'
import { Navbar, Sidebar, Main } from '@/components/layout'

import Icon from '@/components/base/Icon.vue'
import Button from '@/components/base/Button.vue'
//props e emits

// states
const sidebarShow = ref(false)
// Computed properties

// Métodos / funções
</script>
<template>
  <div
    class="flex-1 flex flex-col lg:flex-row bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
  >
    <!-- SIDEBAR -->
    <Sidebar permanent :show="sidebarShow" @close="sidebarShow = false">
      <template #header>
        <h1 class="text-2xl font-bold">Vue App</h1>
      </template>
      <template #content>
        <div class="space-y-2">
          <Button
            icon="LayoutDashboard"
            label="Dashboard"
            class="w-full mb-1"
          />
          <Button icon="User" label="Profile" class="w-full mb-1" />
          <Button icon="Settings" label="Settings" class="w-full mb-1" />
        </div>
      </template>
      <template #footer>
        <Button
          variant="secondary"
          icon="LogOut"
          label="Logout"
          class="w-full"
        />
      </template>
    </Sidebar>
    <!-- Navbar -->
    <Navbar class="lg:hidden">
      <template #start>
        <h3 class="text-lg font-bold">Vue App</h3>
      </template>
      <template #end>
        <button class="btn btn-icon">
          <Icon name="Menu" class="size-5" @click="sidebarShow = true" />
        </button>
      </template>
    </Navbar>
    <!-- Main -->
    <div class="ml-0 lg:ml-80 flex-1 pt-8 px-6">
      <Main />
    </div>
  </div>
</template>

<style scoped>
/* Apenas estilos específicos do componente */
</style>
