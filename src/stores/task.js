// stores/taskStore.js
import { defineStore } from 'pinia'
import { useFirestore } from '@/composables/useFirestore'
import { ref } from 'vue'

export const useTaskStore = defineStore('task', () => {
  const filterCompleted = ref('all')
  const limit = ref(5)

  const {
    items: tasks,
    loading,
    hasMore,
    getAll: _getAll,
    loadMore: _loadMore,
    getById,
    create,
    update,
    remove
  } = useFirestore('tasks')

  const buildOptions = () => {
    const filters = []

    if (filterCompleted.value === 'completed') {
      filters.push(['completed', '==', true])
    } else if (filterCompleted.value === 'pending') {
      filters.push(['completed', '==', false])
    }

    return {
      filters,
      order: [['title']],
      limit: limit.value
    }
  }

  const getAll = async () => {
    await _getAll(buildOptions(), true)
  }

  const loadMore = async () => {
    await _loadMore(buildOptions())
  }

  return {
    tasks,
    loading,
    hasMore,
    filterCompleted,
    getAll,
    loadMore,
    getById,
    create,
    update,
    remove
  }
})
