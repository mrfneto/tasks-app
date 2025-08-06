import { ref } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/firebase'
import {
  collection,
  query,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
  addDoc,
  getDocs,
  getDoc
} from 'firebase/firestore'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([])

  const fetch = async () => {
    const q = query(collection(db, 'tasks'))
    const querySnapshot = await getDocs(q)
    tasks.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  }

  const fetchById = async id => {
    const result = await getDoc(doc(db, 'tasks', id))
    return result.exists() ? { ...result.data() } : null
  }

  const save = async (task, id = null) =>
    id
      ? await updateDoc(doc(db, 'tasks', id), task)
      : await addDoc(collection(db, 'tasks'), task)

  const remove = async id => await deleteDoc(doc(db, 'tasks', id))

  return {
    tasks,
    fetch,
    fetchById,
    save,
    remove
  }
})

// stores/taskStore.js
// import { defineStore } from 'pinia'
// import { useFirestore } from '@/composables/useFirestore'
// import { ref } from 'vue'

// export const useTaskStore = defineStore('task', () => {
//   const filterCompleted = ref(null)
//   const {
//     items: tasks,
//     loading,
//     hasMore,
//     getAll: _getAll,
//     loadMore: _loadMore,
//     getById,
//     create,
//     update,
//     remove
//   } = useFirestore('tasks')

//   const buildOptions = () => {
//     const filters = []
//     if (filterCompleted.value !== null) {
//       filters.push(['completed', '==', filterCompleted.value])
//     }

//     return {
//       filters,
//       order: [['createdAt', 'desc']],
//       limit: 5
//     }
//   }

//   const getAll = async () => {
//     await _getAll(buildOptions(), true) // realtime = true
//   }

//   const loadMore = async () => {
//     await _loadMore(buildOptions())
//   }

//   return {
//     tasks,
//     loading,
//     hasMore,
//     filterCompleted,
//     getAll,
//     loadMore,
//     getById,
//     create,
//     update,
//     remove
//   }
// })

{
  /* <template>
  <div class="p-4 max-w-2xl mx-auto">
    <div class="flex items-center gap-2 mb-4">
      <label class="font-semibold">Filtrar por:</label>
      <select v-model="store.filterCompleted" @change="store.getAll" class="border p-2 rounded">
        <option :value="null">Todas</option>
        <option :value="false">Pendentes</option>
        <option :value="true">Concluídas</option>
      </select>
    </div>

    <ul class="space-y-2">
      <li v-for="task in store.tasks" :key="task.id" class="p-3 border rounded shadow flex justify-between">
        <span :class="{ 'line-through text-gray-500': task.completed }">
          {{ task.title }}
        </span>
        <span class="text-sm text-gray-400">
          {{ task.completed ? '✅' : '⏳' }}
        </span>
      </li>
    </ul>

    <div v-if="store.hasMore && !store.loading" class="mt-4 text-center">
      <button @click="store.loadMore" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Carregar mais
      </button>
    </div>

    <div v-else-if="!store.hasMore" class="mt-4 text-center text-gray-400">
      Nenhuma tarefa adicional.
    </div>

    <div v-else class="mt-4 text-center text-gray-500">Carregando...</div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'

const store = useTaskStore()

onMounted(() => {
  store.getAll()
})
</script> */
}
