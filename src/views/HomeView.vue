<script setup>
import { computed, ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/task'

import { CheckSquare, Edit, PlusCircle, Square } from 'lucide-vue-next'
import AdminLayout from '@/components/layouts/AdminLayout.vue'

const taskStore = useTaskStore() // Assuming you have a task store to handle tasks

const filter = ref('all')

onMounted(async () => {
  await taskStore.fetch() // Fetch tasks when the component is mounted
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
  <AdminLayout>
    <div
      class="bg-primary-100 p-6 rounded-md flex flex-col-reverse lg:flex-row gap-2"
    >
      <div class="">
        <h1 class="heading-xl mb-0">Minha Tarefas</h1>
        <p class="text-secondary-500">
          Aqui estão as tarefas que você precisa completar.
        </p>
      </div>

      <div class="flex-1 flex lg:justify-end items-start">
        <RouterLink
          :to="{ name: 'form-create' }"
          class="btn btn-primary mt-4 text-sm"
        >
          <PlusCircle class="w-4 h-4 mr-2" />
          <span>Criar Tarefa</span>
        </RouterLink>
      </div>
    </div>

    <div
      class="flex items-center space-x-1 p-0.5 border border-gray-200 mt-6 lg:w-1/2"
    >
      <button
        @click="filter = 'all'"
        class="btn w-full"
        :class="filter === 'all' ? 'btn-primary' : 'btn-ghost'"
      >
        Todos
      </button>
      <button
        @click="filter = 'pending'"
        class="btn w-full"
        :class="filter === 'pending' ? 'btn-primary' : 'btn-ghost'"
      >
        Pendentes
      </button>
      <button
        @click="filter = 'completed'"
        class="btn w-full"
        :class="filter === 'completed' ? 'btn-primary' : 'btn-ghost'"
      >
        Concluídos
      </button>
    </div>

    <div class="mt-6">
      <div class="flex flex-col space-y-4">
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
          <RouterLink
            :to="{ name: 'form-update', params: { id: task.id } }"
            class="btn btn-ghost btn-icon"
          >
            <Edit class="w-5 h-5 text-gray-500" />
          </RouterLink>
        </div>

        <div v-if="filterTasks.length === 0" class="text-center text-gray-500">
          Nenhuma tarefa encontrada.
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped></style>
