<script setup>
import { onMounted } from 'vue'
import { useTaskStore } from '@/stores/task'
import { storeToRefs } from 'pinia'

import AppLayout from '@/components/layouts/AppLayout.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import AppLoader from '@/components/ui/AppLoader.vue'

import { CheckSquare, Edit, Plus, Square } from 'lucide-vue-next'

const taskStore = useTaskStore()
const { loadMore } = taskStore
const { tasks, filterCompleted, loading } = storeToRefs(taskStore)

onMounted(() => {
  taskStore.getAll()
})

const filteredTasks = type => {
  filterCompleted.value = type
  taskStore.getAll()
}

const toggleCompletion = async task => {
  const updated = { ...task, completed: !task.completed }
  await taskStore.update(task.id, updated)
}
</script>

<template>
  <AppLayout
    title="Minhas Tarefas"
    description="Gerencie as tarefas cadastradas ou cadastre uma nova."
  >
    <template #actions>
      <BaseButton :to="{ name: 'form-create' }">
        <Plus class="size-4 mr-2" />
        Nova Tarefa
      </BaseButton>
    </template>

    <div
      class="flex items-center space-x-2 rounded-md p-0.5 border border-gray-200 mt-6 lg:w-1/2"
    >
      <BaseButton
        v-for="type in ['all', 'pending', 'completed']"
        :key="type"
        @click="filteredTasks(type)"
        :variant="filterCompleted === type ? 'primary' : 'secondary'"
        full-width
      >
        {{
          type === 'all'
            ? 'Todos'
            : type === 'pending'
            ? 'Pendentes'
            : 'Concluídos'
        }}
      </BaseButton>
    </div>

    <div class="mt-6">
      <div class="flex flex-col space-y-4">
        <AppLoader v-if="loading" />
        <div v-else-if="tasks.length === 0" class="text-center text-gray-500">
          Nenhuma tarefa encontrada.
        </div>

        <div
          v-for="task in tasks"
          :key="task.id"
          class="bg-white px-4 py-2 rounded-md shadow-sm flex items-center space-x-3"
        >
          <button
            class="p-2 rounded-md hover:bg-gray-200 cursor-pointer focus:outline-none"
            @click="toggleCompletion(task)"
          >
            <CheckSquare v-if="task.completed" class="w-6 h-6 text-green-500" />
            <Square v-else class="w-6 h-6 text-gray-400" />
          </button>

          <div class="flex-1">
            <h3 class="heading-lg mb-0">{{ task.title }}</h3>
            <p class="text-gray-500 text-sm">{{ task.description }}</p>
          </div>

          <BaseButton
            icon
            size="sm"
            :to="{ name: 'form-update', params: { id: task.id } }"
            variant="secondary"
          >
            <Edit class="w-4 h-4 text-gray-500" />
          </BaseButton>
        </div>

        <div v-if="!loading && taskStore.hasMore" class="mt-4 text-center">
          <BaseButton variant="secondary" @click="loadMore">
            Carregar mais
          </BaseButton>
        </div>
        <div
          v-else-if="!loading && !taskStore.hasMore"
          class="text-center text-gray-400"
        >
          Nenhuma tarefa adicional.
        </div>
      </div>
    </div>
  </AppLayout>
</template>
