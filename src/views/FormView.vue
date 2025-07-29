<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTaskStore } from '@/stores/task'

import AdminLayout from '@/components/layouts/AdminLayout.vue'
import FormLabel from '@/components/ui/FormLabel.vue'
import FormInput from '@/components/ui/FormInput.vue'
import FormSubmit from '@/components/ui/FormSubmit.vue'
import FormTextarea from '@/components/ui/FormTextarea.vue'
import FormError from '@/components/ui/FormError.vue'
import { MoveLeft } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const taskStore = useTaskStore()

const loading = ref(false)
const error = ref(null)

const form = ref({
  title: '',
  description: '',
  completed: false
})
const isDelenting = ref(false)

const id = computed(() => route.params.id || null)
const handleSubmit = async () => {
  error.value = null

  if (!form.value.title.trim()) {
    error.value = 'O título é obrigatório.'
    return
  }

  loading.value = true

  try {
    await taskStore.save(form.value, id.value)
    router.push({ name: 'home' })
  } catch (err) {
    error.value = err.message || 'Erro ao salvar a tarefa'
  } finally {
    loading.value = false
  }
}

const handleDelete = async () => {
  if (!id.value) return

  if (!isDelenting.value) {
    isDelenting.value = true
    setTimeout(() => {
      isDelenting.value = false
    }, 3000)
  } else {
    loading.value = true
    try {
      await taskStore.remove(id.value)
      router.push({ name: 'home' })
      isDelenting.value = false
    } catch (err) {
      error.value = err.message || 'Erro ao excluir a tarefa'
    } finally {
      loading.value = false
    }
  }
}

onMounted(async () => {
  if (id.value) {
    try {
      const task = await taskStore.fetchById(id.value)
      if (task) {
        form.value = {
          title: task.title,
          description: task.description || '',
          completed: task.completed || false
        }
      } else {
        error.value = 'Tarefa não encontrada.'
      }
    } catch (err) {
      error.value = 'Erro ao carregar tarefa.'
    }
  }
})
</script>

<template>
  <AdminLayout>
    <div class="w-full max-w-md mx-auto">
      <div class="flex items-center space-x-2 mb-8">
        <RouterLink :to="{ name: 'home' }" class="btn btn-ghost btn-icon">
          <MoveLeft class="w-5 h-5" />
          <span class="sr-only">Voltar</span>
        </RouterLink>

        <h1 class="heading-xl mb-0">
          {{ id ? 'Editar Tarefa' : 'Nova Tarefa' }}
        </h1>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <FormLabel for="title">Título</FormLabel>
          <FormInput
            id="title"
            type="text"
            placeholder="Digite o título da tarefa"
            v-model="form.title"
            :disabled="loading"
          />
        </div>

        <div class="mb-6">
          <FormLabel for="description">Descrição</FormLabel>
          <FormTextarea
            id="description"
            placeholder="Digite a descrição da tarefa"
            v-model="form.description"
            :disabled="loading"
          />
        </div>

        <FormSubmit class="w-full btn-primary" :loading="loading">
          {{ id ? 'Alterar' : 'Cadastrar' }} Tarefa
        </FormSubmit>
      </form>

      <button
        tabindex="-1"
        @click="handleDelete"
        v-if="id"
        class="btn btn-ghost w-full mt-2"
      >
        <span v-if="isDelenting" class="text-green-500">Confimar exclusão</span>
        <span v-else class="text-red-500">Excluir Tarefa</span>
      </button>

      <div class="mt-4 text-center">
        <FormError v-if="error" :message="error" />
      </div>
    </div>
  </AdminLayout>
</template>
