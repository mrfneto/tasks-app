<script setup>
import { computed, ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/task'

import { CheckSquare, Edit, Plus, Square } from 'lucide-vue-next'
import AppLayout from '@/components/layouts/AppLayout.vue'
import BaseButton from '../components/ui/BaseButton.vue'
import AppLoader from '../components/ui/AppLoader.vue'

const taskStore = useTaskStore() // Assuming you have a task store to handle tasks

const filter = ref('all')
const loading = ref(true)

onMounted(async () => {
  await taskStore.fetch() // Fetch tasks when the component is mounted
  loading.value = false
})

const filterTasks = computed(() => {
  if (filter.value === 'all') {
    return taskStore.tasks
  } else if (filter.value === 'pending') {
    return taskStore.tasks.filter(task => !task.completed)
  } else if (filter.value === 'completed') {
    return taskStore.tasks.filter(task => task.completed)
  }
})

const toggleCompletion = async (task, id) => {
  task.completed = !task.completed
  const data = {
    title: task.title,
    description: task.description,
    completed: task.completed
  }
  await taskStore.save(data, id)
}
</script>
<template>
  <AppLayout
    title="Minha Tarefas"
    description="Gerencie as tarefas cadastradas ou cadastre uma nova."
  >
    <template #actions>
      <BaseButton :to="{ name: 'form-create' }">
        <Plus class="size-4 mr-2" />
        Nova Tarefa
      </BaseButton>
    </template>

    <div
      class="flex items-center space-x-1 p-0.5 border border-gray-200 mt-6 lg:w-1/2"
    >
      <BaseButton
        @click="filter = 'all'"
        :variant="filter === 'all' ? 'primary' : 'secondary'"
        full-width
      >
        Todos
      </BaseButton>
      <BaseButton
        @click="filter = 'pending'"
        :variant="filter === 'pending' ? 'primary' : 'secondary'"
        full-width
      >
        Pendentes
      </BaseButton>
      <BaseButton
        @click="filter = 'completed'"
        :variant="filter === 'completed' ? 'primary' : 'secondary'"
        full-width
      >
        Concluídos
      </BaseButton>
    </div>

    <div class="mt-6">
      <div class="flex flex-col space-y-4">
        <AppLoader v-if="loading" />
        <div
          v-else-if="filterTasks.length === 0"
          class="text-center text-gray-500"
        >
          Nenhuma tarefa encontrada.
        </div>
        <div
          v-for="task in filterTasks"
          :key="task.id"
          class="bg-white px-4 py-2 rounded-md shadow-sm flex items-center space-x-3"
        >
          <button
            class="p-2 rounded-md hover:bg-gray-200 cursor-pointer focus:outline-none"
            @click="toggleCompletion(task, task.id)"
          >
            <CheckSquare v-if="task.completed" class="w-6 h-6 text-green-500" />
            <Square v-else class="w-6 h-6 text-gray-400" />
          </button>
          <div class="flex-1">
            <h3 class="heading-lg mb-0">{{ task.title }}</h3>
            <p class="text-secondary-500 text-sm">{{ task.description }}</p>
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
      </div>
    </div>
  </AppLayout>
</template>

<style scoped></style>
